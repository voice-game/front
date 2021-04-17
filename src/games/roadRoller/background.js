function Background(x, y) {
  this.x = x;
  this.y = y;
}

Background.prototype.draw = function (ctx) {
  this.ctx = ctx;
  this.dots = new Array(this.x);

  ctx.fillStyle = "black";
  this.drawGround(0, this.y - 200, 200, 200);
  this.drawGround(this.x - 200, this.y - 200, 200, 200);

  return this.dots;
};

Background.prototype.drawGround = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Background;
