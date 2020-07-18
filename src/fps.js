let fpsUpdateDelay = 0;

export function updateFps(t) {
  fpsUpdateDelay += t;
  if (fpsUpdateDelay > 1000) {
    fpsUpdateDelay = 0;
    return Math.round(1 / (t / 1000));
  }
}


export function renderFps(ctx, fps) {
  // Draw number to the screen
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 160, 60);
  ctx.font = "25px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("FPS: " + fps, 10, 30);
}
