class Objects {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  draw(ctx) {
  }

  drawObject(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height);
    this.dots.fill(y, x, x + width);
  }
}

export default Objects;
