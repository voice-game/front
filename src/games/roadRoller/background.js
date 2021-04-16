function Background(x, y) {
  this.x = x;
  this.y = y;
}

Background.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, this.y - 200, 200, 200);
  ctx.fillRect(this.x - 200, this.y - 200, 200, 200);
};

export default Background;
