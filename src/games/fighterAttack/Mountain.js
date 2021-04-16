function Mountain(peakNum, width, height, color, speed) {
  this.peakNum = peakNum;
  this.color = color;
  this.speed = speed;
  this.points = [];
  this.width = width;
  this.height = height;
}

Mountain.prototype.setPeakPoint = function () {
  const peakGap = this.width / (this.peakNum - 1);

  for (let i = 0; i < this.peakNum; i++) {
    this.points[i] = { x: i * peakGap, y: this.height - this.getPeakHeight() };
  }
};

Mountain.prototype.animate = function (ctx) {
  let currentX = this.points[0].x;
  let currentY = this.points[0].y;

  ctx.beginPath();

  ctx.moveTo(currentX, currentY);

  for (let i = 1; i < this.points.length; i++) {
    const nextX = this.points[i].x;
    const nextY = this.points[i].y;
    const midX = (currentX + nextX) / 2;
    const midY = (currentY + nextY) / 2;

    ctx.quadraticCurveTo(currentX, currentY, midX, midY);

    currentX = this.points[i].x;
    currentY = this.points[i].y;
  }

  ctx.lineTo(currentX, currentY);
  ctx.lineTo(this.width, this.height);
  ctx.lineTo(this.points[0].x, this.height);

  ctx.fillStyle = this.color;
  ctx.fill();

  ctx.closePath();
};

Mountain.prototype.getPeakHeight = function () {
  const minHeight = this.height / 10;
  const maxHeight = (this.height - minHeight) / 5;

  return minHeight + maxHeight * Math.random();
};

export default Mountain;
