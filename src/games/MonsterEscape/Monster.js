class Monster {
  constructor(canvasWidth, canvasHeight, images, size, life, fps) {
    this.images = images;
    this.size = size;
    this.life = life;
    this.maxLife = life;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setPosition();
  }

  distance = 0;
  shieldTime = 0;
  posX = 0;
  posY = 0;
  width = 0;
  height = 0

  setPosition() {
    const image = this.images[0];
    this.height = this.size * this.canvasHeight;
    this.width = this.height * (image.width / this.fps) / image.height;
    this.posX = 0.5 * (this.canvasWidth - this.width);
    this.posY = 0.5 * (this.canvasHeight - this.height);
  };

  setIsCollision(obstacles, shieldTime, level) {
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
        levelFactor = 0.7;
    }

    this.shieldTime = Math.max(this.shieldTime - 1, 0);

    if (this.shieldTime) { return }

    for (let i = 0; i < obstacles.length; i++) {
      const points = obstacles[i].gameMap;

      const nearObstacles = points.filter((layout) => {
        const { posX, posY, width, height } = layout;

        const centerX = 0.5 * this.width;
        const centerY = 0.5 * this.height;
        const calibratedW = this.width * levelFactor;
        const calibratedH = this.height * levelFactor;
        const calibratedX = this.posX + centerX - 0.5 * calibratedW;
        const calibratedY = this.posY + centerY - 0.5 * calibratedH;

        const isXCollision =
          (calibratedX <= posX && calibratedX + calibratedW >= posX) ||
          (calibratedX <= posX + width && calibratedX + calibratedW >= posX + width);

        const isYCollision =
          (calibratedY <= posY && calibratedY + calibratedH >= posY) ||
          (calibratedY <= posY + height && calibratedY + calibratedH >= posY + height);

        return isXCollision && isYCollision;
      });

      if (nearObstacles.length) {
        this.shieldTime = shieldTime;
        this.isCollision = true;

        return;
      }
    }

    this.isCollision = false;
  };

  animate(ctx, speed, volThreshold, volume, frame) {
    let image = this.images[0];

    if (volume > 2 * volThreshold) {
      this.posY -= 2 * speed * this.canvasHeight;
    } else if (volume > volThreshold) {
      this.posY -= speed * this.canvasHeight;
    } else {
      this.posY += speed * this.canvasHeight;
    }

    if (this.posY >= this.canvasHeight - this.height) {
      this.posY = this.canvasHeight - this.height;
    }

    if (this.posY <= 0) { this.posY = 0 }

    if (this.isCollision) {
      this.life = Math.max(0, this.life - 1);
      this.isCollision = false;
    }

    if (this.life) { this.distance += speed * this.canvasWidth }

    if (this.shieldTime) { image = this.images[1] }

    if (!this.life) { image = this.images[2] }

    const gap = image.width / this.fps;

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
}

export default Monster;
