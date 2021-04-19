function Objects(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

Objects.prototype.draw = function (ctx, pitchDots) {
  this.ctx = ctx;
  this.dots = new Array(this.canvasWidth);

  ctx.fillStyle = "black";
  this.drawObject(0, this.canvasHeight - 200, 200, 200);
  this.drawObject(this.canvasWidth - 200, this.canvasHeight - 200, 200, 200);
  this.drawObject(140, this.canvasHeight - 210, 40, 10);

  if (pitchDots) {
    for (let i = 0; i < pitchDots.length; i++) {
      this.dots[200 + i] = pitchDots[i];
    }
  }

  return this.dots;
};

Objects.prototype.drawObject = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Objects;
