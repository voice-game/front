function Fighter(ctx, width, height, speed, color) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = color; // image로 바꿀것.
}

Fighter.prototype.animate = function (canvasWidth, canvasHeight, positionY) {
  const originX = (canvasWidth - this.width) / 2;
  const originY = (canvasHeight - this.height) / 2;

  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(
    originX,
    originY - this.speed * positionY,
    this.width,
    this.height,
  );
};

export default Fighter;
