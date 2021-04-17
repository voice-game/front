function Obstacle(width, height, speed) {
  this.width = width;
  this.height = height;
  this.speed = speed;
  // this.image ?
}

Obstacle.prototype.animate = function (ctx) {
  ctx.fillRect(0, 0, this.width, this.height);
};

export default Obstacle;
