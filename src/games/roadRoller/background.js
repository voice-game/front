function Background(dots, x, y) {
  this.dots = dots;
  this.x = x;
  this.y = y;
}

Background.prototype.draw = function (ctx) {
  this.ctx = ctx;

  ctx.fillStyle = "black";
  this.drawGround(0, this.y - 200, 200, 200);
  this.drawGround(this.x - 200, this.y - 200, 200, 200);
};

Background.prototype.drawGround = function (x, y, width, height) {
  this.ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Background;
