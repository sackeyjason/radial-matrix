const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const GRID_WIDTH = 32;
const GRID_HEIGHT = 20;
const VOID_RADIUS = 16;
const CRUST_THICKNESS = 16;
const SCREEN_CENTRE = [(SCREEN_WIDTH - 1) / 2, (SCREEN_HEIGHT - 1) / 2];

const ACTIVE_RADIUS = SCREEN_HEIGHT / 2 - (VOID_RADIUS + CRUST_THICKNESS);

const grid = new Array(GRID_HEIGHT).fill(null).map((r) => {
  return new Array(GRID_WIDTH).fill(0);
});

grid[0] = [1, 1, 1];
grid[1] = [0, 0, 1];

grid[GRID_HEIGHT - 2].fill(1, 1, GRID_WIDTH - 1);
grid[GRID_HEIGHT - 3].fill(1, 2, GRID_WIDTH - 2);

function getGridCoords(angle, radius) {
  const gridX = Math.floor((angle / (2 * Math.PI)) * GRID_WIDTH);
  const gridY = Math.floor(
    ((radius - VOID_RADIUS) / ACTIVE_RADIUS) * GRID_HEIGHT
  );
  return [gridX, gridY];
}

function renderGrid(ctx) {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  // fill circle*
  ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.fillStyle = `rgba(128, 128, 128, 1)`;

  // for each pixel
  for (let y = 0; y < SCREEN_HEIGHT; y += 2) {
    for (let x = 0; x < SCREEN_WIDTH; x += 2) {
      const dx = x - SCREEN_CENTRE[0];
      const dy = y - SCREEN_CENTRE[1];

      const radius = Math.sqrt(dx ** 2 + dy ** 2);
      const angle = getAngle(dx, dy);

      const [gridX, gridY] = getGridCoords(angle, radius);

      // b = Math.floor(Math.random() * 128) + 128;
      // g = Math.floor(Math.random() * 128) + 128;
      
      if (isSolid(gridX, gridY)) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
}

function isSolid(x, y) {
  return grid[y] && grid[y][x];
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

/**
 * Get angle from top, clockwise, positive
 * @param {number} x
 * @param {number} y
 */
function getAngle(x, y) {
  return (
    Math.atan(y / x) +
    // Reorient from top
    Math.PI / 2 +
    // Add half-turn for angles on the left-hand side
    Math.PI * (x < 0)
  );
  // return angle;
}

let start;
let dotX = 0;
const speed = (1 / 30) / 32;
let lastElapsed = 0;
let fps;
let fpsUpdateDelay = 0;

function update(t) {
  dotX = (dotX + speed * t) % GRID_WIDTH;

  // secondsPassed = t / 1000;
  fpsUpdateDelay += t;
  if (fpsUpdateDelay > 1000) {
    fpsUpdateDelay = 0;
    fps = Math.round(1 / (t / 1000));
  }

  grid[10].fill(0);
  grid[10][Math.floor(dotX)] = 1;
}

function render() {
  renderGrid(ctx);
  // Draw number to the screen
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 160, 60);
  ctx.font = '25px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText("FPS: " + fps, 10, 30);
}

function timestamp() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : Date.now();
}

let ctx;

let last = timestamp();

function step(now_) {
  now = timestamp();
  if (start === undefined) start = now;
  const elapsed = now - start;
  dt = Math.min(1000, now - last);
  

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
