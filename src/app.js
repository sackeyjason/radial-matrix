import { updateFps, renderFps } from "./fps";
import ModeSelector from "./mode_selector";
// import memoize from "lodash.memoize";
import input from "./input";
import { getWrapX, getDoesCollide, pieces, spawn, getNext } from "./game";

const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const GRID_WIDTH = 32;
const GRID_HEIGHT = 20;
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

const modeSelector = new ModeSelector(selectMode, events);

let piece = {
  x: 14,
  y: 0,
  type: "t",
  angle: 0,
};

const wrapX = getWrapX(GRID_WIDTH);
const doesCollide = getDoesCollide(GRID_WIDTH);

const grid = new Array(GRID_HEIGHT).fill(null).map((r) => {
  return new Array(GRID_WIDTH).fill(0);
});
let grid2;

grid[GRID_HEIGHT - 1].fill(1, 1, GRID_WIDTH - 1);
grid[GRID_HEIGHT - 2].fill(1, 2, GRID_WIDTH - 2);

function gridLookup(x, y) {
  return grid[y] && grid[y][x];
}
// let lookup = memoize(gridLookup, (x, y) => `${x},${y}`);

function getGridCoords(angle, radius) {
  const gridX = Math.floor((angle / (2 * Math.PI)) * GRID_WIDTH);
  const gridY = Math.floor(
    ((radius - VOID_RADIUS) / ACTIVE_RADIUS) * GRID_HEIGHT
  );
  return [gridX, gridY];
}

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
        if (modeSelector.mode === "colour" || modeSelector.mode === "nuts") {
          let hue2 = (hue + (angle / (2 * Math.PI)) * 360) % 360;
          ctx.fillStyle = `hsla(${hue2}deg, 100%, 80%, 1.0)`;
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

const halfPi = Math.PI / 2;
/**
 * Get angle from top, clockwise, positive
 * @param {number} x
 * @param {number} y
 */
function getAngle(x, y) {
  // reorient from top
  let angle = Math.atan(y / x) + halfPi;
  // flip around left-oriented angles
  if (x < 0) angle += Math.PI;
  return angle;
}

let shock = 0;
let shockDecay = 0.1;

function processEvent(event) {
  console.log(event);
  if (event === "go nuts") {
    shock = 50;
  } else if (event[0] === "input") {
    switch (event[1]) {
      case "left":
        if (doesCollide({ ...piece, x: wrapX(piece.x + 1) }, grid)) {
          // nope
        } else {
          piece.x = wrapX(piece.x + 1);
        }
        break;
      case "right":
        if (doesCollide({ ...piece, x: wrapX(piece.x - 1) }, grid)) {
          // nope
        } else {
          piece.x = wrapX(piece.x - 1);
        }
        break;
      case "down":
        if (doesCollide({ ...piece, y: piece.y + 1 }, grid)) {
          // lock piece in
        } else {
          piece.y += 1;
        }
        break;
      default:
        break;
    }
  }
  console.log(piece);
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
  grid[10].fill(0);
  grid[10][Math.floor(dotX)] = 1;

  shock = Math.max(0, shock - shockDecay * t);

  grid2 = grid.map((line) => line.slice());
  piece.shape.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell) {
        grid2[y + piece.y][wrapX(x + piece.x)] = 2;
        // console.log('block at:', wrapX(x + piece.x))
      }
    });
  });
}

function render() {
  renderGrid(grid2);
  renderFps(ctx, fps);
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
  modeSelector.init();
  input.init(document, events);
  view.addEventListener("click", getClickHandler());

  piece.type = getNext();
  piece.shape = pieces[piece.type].shape;
  console.log(getNext());
  window.requestAnimationFrame(step);
}

init();
