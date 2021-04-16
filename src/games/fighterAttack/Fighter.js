function Fighter(width, height, speed, color) {
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = color; // image로 바꿀것.
}

Fighter.prototype.animate = function (
  ctx,
  canvasWidth,
  canvasHeight,
  positionY,
) {
  const originX = (canvasWidth - this.width) / 2;
  const originY = (canvasHeight - this.height) / 2;

  ctx.fillStyle = this.color;
  ctx.fillRect(
    originX,
    originY - this.speed * positionY,
    this.width,
    this.height,
  );
};

export default Fighter;
