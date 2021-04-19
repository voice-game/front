function Fighter(type, width, speed, life) {
  this.type = type;
  this.width = width;
  this.speed = speed;
  this.distance = 0;
  this.life = life;
  this.maxLife = 5;
  this.shieldTime = 0;
}

Fighter.prototype.loadImage = function (images, setPosition) {
  this.images = [];

  images.forEach((image) => {
    const img = new Image();
    img.onload = () => {
      this.height = (img.height / img.width) * this.width;
      this.images.push(img);
      setPosition();
    };
    img.src = image;
  });
};

Fighter.prototype.setPosition = function (canvasWidth, canvasHeight) {
  this.posX = (canvasWidth - this.width) / 2;
  this.posY = (canvasHeight - this.height) / 2;
};

Fighter.prototype.getIsCollision = function (obstacles, shieldTime) {
  this.shieldTime = Math.max(this.shieldTime - 1, 0);

  if (this.shieldTime !== 0) {
    return false;
  }

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
      this.shieldTime = shieldTime;
      return true;
    }
  }

  return false;
};

Fighter.prototype.animate = function (ctx, canvasHeight, volume, isCollision) {
  const blinkPeriod = 30;
  const blinkTime = this.shieldTime % (2 * blinkPeriod);
  console.log(volume);
  if (volume > 3) {
    this.posY -= 1;
  } else {
    this.posY += 0.5;
  }

  if (this.posY >= canvasHeight - this.height) {
    this.posY = canvasHeight - this.height;
  }

  if (this.posY <= 0) {
    this.posY = 0;
  }

  if (isCollision) {
    this.life = Math.max(0, this.life - 1);
  }

  if (this.life === 0) {
  } else {
    this.distance += this.speed;
  }

  if (0 < blinkTime && blinkPeriod >= blinkTime) {
    return;
  }

  ctx.drawImage(
    this.images[this.type],
    this.posX,
    this.posY,
    this.width,
    this.height,
  );
};

export default Fighter;
