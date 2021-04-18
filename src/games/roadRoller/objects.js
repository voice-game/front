function Objects(canvas) {
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
}

Objects.prototype.draw = function (ctx, currentRoad) {
  this.ctx = ctx;
  this.dots = new Array(this.canvasWidth);

  ctx.fillStyle = "black";
  this.drawObject(0, this.canvasHeight - 200, 200, 200);
  this.drawObject(this.canvasWidth - 200, this.canvasHeight - 200, 200, 200);
  this.drawObject(140, this.canvasHeight - 210, 40, 10);

  for (let i = 0; i < currentRoad.length; i++) {
    this.dots[200 + i] = currentRoad[i];
  }

  return this.dots;
};

Objects.prototype.drawObject = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Objects;
