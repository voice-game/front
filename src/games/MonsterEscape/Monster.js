function Monster(images, size, speed, life) {
  this.type = 0;
  this.images = images;
  this.size = size;
  this.speed = speed;
  this.distance = 0;
  this.life = life;
  this.maxLife = 5;
  this.shieldTime = 0;
}

Monster.prototype.setPosition = function (
  canvasWidth,
  canvasHeight,
  spriteTotal,
) {
  const image = this.images[this.type];
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.height = this.size * canvasHeight;

  this.width = (image.width / (spriteTotal * image.height)) * this.height;
  this.posX = (canvasWidth - this.width) / 2;
  this.posY = (canvasHeight - this.height) / 2;
};

Monster.prototype.getIsCollision = function (obstacles, shieldTime) {
  this.shieldTime = Math.max(this.shieldTime - 1, 0);

  if (this.shieldTime !== 0) {
    return false;
  }

  for (let i = 0; i < obstacles.length; i++) {
    const points = obstacles[i].gameMap;

    const nearObstacles = points.filter((layout) => {
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
      this.shieldTime = shieldTime;
      return true;
    }
  }

  return false;
};

Monster.prototype.animate = function (ctx, volume, isCollision, frame) {
  const blinkPeriod = 10;
  const blinkTime = this.shieldTime % (2 * blinkPeriod);

  if (volume > 3) {
    this.posY -= this.speed * this.canvasHeight;
  } else {
    this.posY += this.speed * this.canvasHeight;
  }

  if (this.posY >= this.canvasHeight - this.height) {
    this.posY = this.canvasHeight - this.height;
  }

  if (this.posY <= 0) {
    this.posY = 0;
  }

  if (isCollision) {
    this.life = Math.max(0, this.life - 1);
  }

  if (this.life === 0) {
  } else {
    this.distance += this.speed * this.canvasWidth;
  }

  // if (0 < blinkTime && blinkPeriod >= blinkTime) {
  //   return;
  // }

  ctx.drawImage(
    this.images[this.type],
    600 * frame,
    0,
    600,
    380,
    this.posX,
    this.posY,
    this.width,
    this.height,
  );
};

export default Monster;
