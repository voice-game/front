function Objects(canvasWidth, canvasHeight) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
}

Objects.prototype.draw = function (ctx, pitchDots) {
  this.ctx = ctx;
  this.dots = new Array(this.canvasWidth);

  this.ctx.fillStyle = "black";
  this.drawObject(0, this.canvasHeight - 200, 200, 200);
  this.drawObject(this.canvasWidth - 200, this.canvasHeight - 200, 200, 200);
  this.drawObject(140, this.canvasHeight - 210, 40, 10);

  if (pitchDots) {
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 5;

    for (let i = 0; i < pitchDots.length; i++) {
      this.dots[200 + i] = pitchDots[i];

      this.ctx.beginPath();

      this.ctx.moveTo(200 + i - 1, this.dots[200 + i - 1]);
      this.ctx.lineTo(200 + i, this.dots[200 + i]);
      this.ctx.stroke();
    }

    this.ctx.closePath();
  }

  return this.dots;
};

Objects.prototype.drawObject = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Objects;
