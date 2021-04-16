function Mountain(ctx, peakNum, color, speed) {
  this.ctx = ctx;
  this.peakNum = peakNum;
  this.color = color;
  this.speed = speed;
}

Mountain.prototype.drawRidge = function () {
  this.points = [];
  for (let i = 0; i < this.peakNum.length; i++) {}

  this.ctx.beginPath();
};

export default Mountain;
