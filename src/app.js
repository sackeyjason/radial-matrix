import { updateFps, renderFps } from "./fps";

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

const grid = new Array(GRID_HEIGHT).fill(null).map((r) => {
  return new Array(GRID_WIDTH).fill(0);
});

grid[0] = [1, 1, 1];
grid[1] = [0, 0, 1];

grid[GRID_HEIGHT - 1].fill(1, 1, GRID_WIDTH - 1);
grid[GRID_HEIGHT - 2].fill(1, 2, GRID_WIDTH - 2);

function getGridCoords(angle, radius) {
  const gridX = Math.floor((angle / (2 * Math.PI)) * GRID_WIDTH);
  const gridY = Math.floor(
    ((radius - VOID_RADIUS) / ACTIVE_RADIUS) * GRID_HEIGHT
  );
  return [gridX, gridY];
}

function renderGrid() {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = `rgba(128, 128, 128, 1)`;

  // for each pixel
  for (let y = circle.y; y < circle.bottom; y += 1) {
    for (let x = circle.x; x < circle.w; x += 1) {
      const dx = x - SCREEN_CENTRE[0];
      const dy = y - SCREEN_CENTRE[1];

      const radius = Math.sqrt(dx ** 2 + dy ** 2);
      const angle = getAngle(dx, dy);

      const [gridX, gridY] = getGridCoords(angle, radius);

      if (grid[gridY] && grid[gridY][gridX]) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
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

    // ctx.strokeStyle = "white";
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(...SCREEN_CENTRE);
    // ctx.lineTo(x, y);
    // ctx.closePath();
    // ctx.stroke();

    const [gridX, gridY] = getGridCoords(angle, radius);
    grid[gridY] && (grid[gridY][gridX] = 1);
  };
}

const halfPi = Math.PI / 2
/**
 * Get angle from top, clockwise, positive
 * @param {number} x
 * @param {number} y
 */
function getAngle(x, y) {
  let angle =
    Math.atan(y / x) +
    // Reorient from top
    halfPi;
  if (x < 0) angle += Math.PI;
  return angle;
}

let start;
let dotX = 0;
const speed = 2 / 30 / 32;
let fps;

function update(t) {
  fps = updateFps(t) || fps;
  dotX = (dotX + speed * t) % GRID_WIDTH;
  grid[10].fill(0);
  grid[10][Math.floor(dotX)] = 1;
}

function render() {
  renderGrid();
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
  console.log("init()");
  console.log(grid);
  view.setAttribute("width", SCREEN_WIDTH);
  view.setAttribute("height", SCREEN_HEIGHT);
  ctx = view.getContext("2d");

  renderGrid(ctx);
  view.addEventListener("click", getClickHandler(ctx));
  window.requestAnimationFrame(step);
}

init();
