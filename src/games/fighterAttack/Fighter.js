function Fighter(width, height, speed, color) {
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = color; // image로 바꿀것.
}

Fighter.prototype.setPosition = function (canvasWidth, canvasHeight) {
  this.posX = (canvasWidth - this.width) / 2;
  this.posY = (canvasHeight - this.height) / 2;
};

Fighter.prototype.animate = function (ctx, volume) {
  if (volume > 3) {
    this.posY -= 0.5;
  } else {
    this.posY += 0.5;
  }

  ctx.fillStyle = this.color;
  ctx.fillRect(this.posX, this.posY, this.width, this.height);
};

Fighter.prototype.getIsCollision = function (obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    const layouts = obstacles[i].layouts;

    const nearObstacles = layouts.filter((layout) => {
      const { posX, posY, width, height } = layout;

      const isXCollision =
        (this.posX <= posX && this.posX + this.width >= posX) ||
        (this.posX <= posX + width && this.posX + this.width >= posX + width);

      const isYCollision =
        (this.posY <= posY && this.posY + this.height >= posY) ||
        (this.posY <= posY + height &&
          this.posY + this.height >= posY + height);

      return isXCollision && isYCollision;
    });

    if (nearObstacles.length) {
      return true;
    }
  }

  return false;
};

export default Fighter;
