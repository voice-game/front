function Monster(images, size, speed, life) {
  this.type = 0;
  this.images = images;
  this.size = size;
  this.speed = speed;
  this.distance = 0;
  this.life = life;
  this.maxLife = life;
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

Monster.prototype.getIsCollision = function (obstacles, shieldTime, level) {
  let levelFactor;

  switch (level) {
    case "easy":
      levelFactor = 0.5;
      break;
    case "normal":
      levelFactor = 0.7;
      break;
    case "hard":
      levelFactor = 1;
      break;
    default:
      levelFactor = 20000;
  }

  this.shieldTime = Math.max(this.shieldTime - 1, 0);

  if (this.shieldTime) {
    return false;
  }

  for (let i = 0; i < obstacles.length; i++) {
    const points = obstacles[i].gameMap;

    const nearObstacles = points.filter((layout) => {
      const { posX, posY, width, height } = layout;

      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const calibratedW = this.width * levelFactor;
      const calibratedH = this.height * levelFactor;
      const calibratedX = this.posX + centerX - calibratedW / 2;
      const calibratedY = this.posY + centerY - calibratedH / 2;

      const isXCollision =
        (calibratedX <= posX && calibratedX + calibratedW >= posX) ||
        (calibratedX <= posX + width &&
          calibratedX + calibratedW >= posX + width);

      const isYCollision =
        (calibratedY <= posY && calibratedY + calibratedH >= posY) ||
        (calibratedY <= posY + height &&
          calibratedY + calibratedH >= posY + height);

      return isXCollision && isYCollision;
    });

    if (nearObstacles.length) {
      this.shieldTime = shieldTime;
      console.log("collision");
      this.isCollision = true;
      return true;
    }
  }

  this.isCollision = false;
  return false;
};

Monster.prototype.animate = function (ctx, volume, isCollision, fps, frame) {
  if (volume > 4) {
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

  let image = this.images[0];

  if (this.shieldTime) {
    image = this.images[1];
  }

  if (!this.life) {
    image = this.images[2];
  }

  const gap = image.width / fps;

  ctx.drawImage(
    image,
    gap * frame,
    0,
    gap,
    image.height,
    this.posX,
    this.posY,
    this.width,
    this.height,
  );
};

export default Monster;
