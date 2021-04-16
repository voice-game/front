function Background(dots, x, y) {
  this.dots = dots;
  this.x = x;
  this.y = y;
}

Background.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  this.drawGround(ctx, 0, this.y - 200, 200, 200);
  this.drawGround(ctx, this.x - 200, this.y - 200, 200, 200);
};

Background.prototype.drawGround = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
  this.dots.fill(y, x, x + width);
};

export default Background;
