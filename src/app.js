import { updateFps, renderFps } from "./fps";
import ModeSelector from "./mode_selector";
// import memoize from "lodash.memoize";
import input from "./input";
import {
  getWrapX,
  getPieceGridCoords,
  doesCollide,
  spawn,
  getNext,
  removeLines,
} from "./game";
import { getCircleToGrid, getAngle } from "./geometry";
import h from "hyperscript";

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const GRID_WIDTH = 32;
const GRID_HEIGHT = 14;
const VOID_RADIUS = 16;
const CRUST_THICKNESS = 16;
const SCREEN_CENTRE = [(SCREEN_WIDTH - 1) / 2, (SCREEN_HEIGHT - 1) / 2];
const ACTIVE_RADIUS = SCREEN_HEIGHT / 2 - (VOID_RADIUS + CRUST_THICKNESS);

let circleRadius = SCREEN_HEIGHT - 1 * CRUST_THICKNESS;
const circle = {
  x: (SCREEN_WIDTH - circleRadius) / 2,
  y: CRUST_THICKNESS,
  bottom: SCREEN_HEIGHT - CRUST_THICKNESS,
  w: (SCREEN_WIDTH - circleRadius) / 2 + circleRadius,
};
let ctx;
const events = [];

const modeSelector = {};

let clearing = null;

let piece = null;

let mainMenu = true;

const wrapX = getWrapX(GRID_WIDTH);

const grid = new Array(GRID_HEIGHT).fill(null).map(() => {
  return new Array(GRID_WIDTH).fill(0);
});
let grid2;

function clearGrid() {
  grid.forEach(row => {
    row.fill(0);
  });
}

function gridLookup(x, y) {
  return grid[y] && grid[y][x];
}
// let lookup = memoize(gridLookup, (x, y) => `${x},${y}`);

const getGridCoords = getCircleToGrid({
  GRID_WIDTH,
  GRID_HEIGHT,
  VOID_RADIUS,
  ACTIVE_RADIUS,
});

function renderGrid(grid) {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  let pixelHeight = 2;

  let hue = 0;
  if (modeSelector.mode === "colour") {
    hue = (dotX / GRID_WIDTH) * 360;
    ctx.fillStyle = `hsla(${hue}deg, 100%, 80%, 1.0)`;
  } else if (modeSelector.mode === "nuts") {
    hue = (dotX / (GRID_WIDTH / 20)) * 360;
    ctx.fillStyle = `hsla(${hue}deg, 100%, 80%, 1.0)`;
  } else if (modeSelector.mode === "vcr") {
    ctx.fillStyle = `rgb(10,250,100)`;
    pixelHeight = 1;
  } else {
    ctx.fillStyle = `rgb(200,200,200)`;
  }

  const xCentre = SCREEN_CENTRE[0];
  const yCentre = SCREEN_CENTRE[1];

  // for each pixel
  for (let y = circle.y; y < circle.bottom; y += 2) {
    for (let x = circle.x; x < circle.w; x += 2) {
      const dx = x - xCentre;
      const dy = y - yCentre;

      const radius = Math.sqrt(dx ** 2 + dy ** 2);
      const angle = getAngle(dx, dy);

      const [gridX, gridY] = getGridCoords(angle, radius);

      let fuzz = 0;
      if (modeSelector.mode === "fuzzy") {
        fuzz = Math.random() * 3 - 1.5;
      } else if (modeSelector.mode === "nuts") {
        fuzz = Math.random() * 6 - 3;
      }
      if (shock) fuzz = Math.random() * shock - shock / 2;

      // if (gridLookup(gridX, gridY)) {
      // if (lookup(gridX, gridY)) {
      if (grid[gridY] && grid[gridY][gridX]) {
        const activePiece = grid[gridY][gridX] === 2;
        const clearingRow = grid[gridY][gridX] === 3;
        if (modeSelector.mode === "colour" || modeSelector.mode === "nuts") {
          let hue2 = (hue + (angle / (2 * Math.PI)) * 360) % 360;
          ctx.fillStyle = `hsla(${hue2}deg, 100%, 80%, 1.0)`;
        } else {
          if (activePiece) {
            ctx.fillStyle = `rgb(255,100,50)`;
          } else if (clearingRow) {
            fuzz = Math.random() * 3 - 1.5;
            let hue2 = (hue + (angle / (2 * Math.PI)) * 360) % 360;
            ctx.fillStyle = `hsla(${hue2}deg, 100%, 80%, 1.0)`;
          } else {
            ctx.fillStyle = `rgb(200,200,200)`;
          }
        }
        ctx.fillRect(x, y, 2 + fuzz, pixelHeight + fuzz);
      }
    }
  }
  // lookup.cache.clear();
}

function getClickHandler() {
  return function handleClick(e) {
    const startedAt = timestamp();
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    var scale = SCREEN_WIDTH / rect.width;

    x = x * scale;
    y = y * scale;

    const dx = x - SCREEN_CENTRE[0];
    const dy = y - SCREEN_CENTRE[1];

    const radius = Math.sqrt(dx ** 2 + dy ** 2);
    const angle = getAngle(dx, dy);

    const [gridX, gridY] = getGridCoords(angle, radius);
    grid[gridY] && (grid[gridY][gridX] = 1);
  };
}

function lockPieceIn() {
  getPieceGridCoords(piece, grid).forEach(([x, y]) => {
    if (grid[y]) grid[y][x] = 1;
  });
  piece = null;
}

let shock = 0;
let shockDecay = 0.1;

function processEvent(event) {
  // console.log(event);
  if (event === "go nuts") {
    shock = 50;
  } else if (event[0] === "input") {
    if (event[1] === "enter") {
      if (mainMenu) {
        clearGrid();
        mainMenu = false;
        const menuEl = document.querySelector('.main-menu');
        menuEl.parentElement.removeChild(menuEl);
        return;
      }
    }
    if (piece && !mainMenu) {
      switch (event[1]) {
        case "left":
          if (doesCollide({ ...piece, x: wrapX(piece.x + 1) }, grid)) {
            // clunk
          } else {
            piece.x = wrapX(piece.x + 1);
          }
          break;
        case "right":
          if (doesCollide({ ...piece, x: wrapX(piece.x - 1) }, grid)) {
            // clonk
          } else {
            piece.x = wrapX(piece.x - 1);
          }
          break;
        case "down":
          if (doesCollide({ ...piece, y: piece.y + 1 }, grid)) {
            lockPieceIn();
          } else {
            piece.y += 1;
          }
          break;
        case "rotateR":
          piece.angle = (piece.angle + 1) % 4;
          break;
        case "rotateL":
          piece.angle = piece.angle - 1;
          if (piece.angle < 0) piece.angle = 3;
          break;
        default:
          break;
      }
    }
  } else if (event[0] === "clear") {
  }
  // console.log(piece);
  // console.log(piece && getPieceGridCoords(piece, grid));
}

let start;
let dotX = 0;
const speed = 2 / 30 / 32;
let fps;

function update(t) {
  while (events.length) {
    let event = events.shift();
    processEvent(event);
  }
  fps = updateFps(t) || fps;
  dotX = wrapX(dotX + speed * t);

  shock = Math.max(0, shock - shockDecay * t);

  grid2 = grid.map((line) => line.slice());
  
  if (piece) {
    const pieceCoords = getPieceGridCoords(piece, grid);
    pieceCoords.forEach(([x, y]) => {
      if (y < 0) return;
      if (grid2[y]) grid2[y][x] = 2;
    });
  } else if (clearing) {
    // animating
    if (timestamp() - clearing.at >= 500) {
      removeLines(clearing.lines, grid);
      grid2 = grid;
      clearing = null;
    }
  } else {
    const completeLines = [];
    grid2.forEach((line, y) => {
      if (line.find((block) => block === 0) === undefined) {
        completeLines.push(y);
        grid[y].fill(3);
      }
    });
    if (completeLines.length) {
      clearing = {
        lines: completeLines,
        at: timestamp(),
      };
    } else if (!mainMenu) {
      piece = spawn();
      if (doesCollide(piece, grid)) {
        // high score?
        piece = null;
        showMainMenu();
      }
    }
  }
}

function showMainMenu() {
  mainMenu = true;
  const menuScreen = h("div.main-menu", [
    h("div", [h("h1", "Orbital"), h("h2", "Radial Matrix")]),
    h("nav", h("div", "Hit Enter/Tap to start")),
  ]);
  document.querySelector("body").appendChild(menuScreen);
}

function render() {
  renderGrid(grid2);
  // renderFps(ctx, fps);
}

function timestamp() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : Date.now();
}

let last = timestamp();

function step() {
  let now = timestamp();
  if (start === undefined) start = now;
  const elapsed = now - start;
  let dt = Math.min(1000, now - last);
  update(dt);
  render();
  last = now;
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function init() {
  view.setAttribute("width", SCREEN_WIDTH);
  view.setAttribute("height", SCREEN_HEIGHT);
  ctx = view.getContext("2d");
  // modeSelector.init();
  input.init(document, events);
  view.addEventListener("click", getClickHandler());
  document.addEventListener("click", () => events.push(["input", "enter"]));

  piece = spawn();
  console.log(getNext());
  showMainMenu();
  window.requestAnimationFrame(step);
}

init();
