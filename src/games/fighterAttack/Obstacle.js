function Obstacle(type, speed, minHeight, maxHeight, minPosY, maxPosY) {
  this.type = type;
  this.speed = speed;
  this.minHeight = minHeight;
  this.maxHeight = maxHeight;
  this.minPosY = minPosY;
  this.maxPosY = maxPosY;
}

Obstacle.prototype.loadImages = function (images, setLayout) {
  this.images = [];

  images.forEach((image) => {
    const img = new Image();
    img.onload = () => {
      this.images.push(img);
      setLayout();
    };
    img.src = image;
  });
};

Obstacle.prototype.getObstacleImage = function () {
  const index = Math.round(Math.random() * (this.images.length - 1));

  return this.images[index];
};

Obstacle.prototype.getObstacleHeightAndPosY = function (canvasHeight) {
  const deviationHeight = Math.random() * (this.maxHeight - this.minHeight);
  const height = this.minHeight + deviationHeight;
  let posY;

  if (this.type === "onGround") {
    posY = canvasHeight - height;
  } else if (this.type === "onAir") {
    const deviationPosY = Math.random() * (this.maxPosY - this.minPosY);
    posY = this.minPosY + deviationPosY;
  }

  return { height, posY };
};

Obstacle.prototype.setObstacleLayouts = function (
  canvasWidth,
  canvasHeight,
  total,
) {
  this.gap = canvasWidth / (total - 1);
  this.layouts = [];

  for (let i = 0; i < total; i++) {
    const { height, posY } = this.getObstacleHeightAndPosY(canvasHeight);
    const image = this.getObstacleImage();

    this.layouts[i] = {
      posX: i * this.gap + 0 * Math.random() * this.gap,
      posY: posY,
      width: height * (image.width / image.height),
      height: height,
      image: image,
    };
  }
};

Obstacle.prototype.animate = function (ctx, canvasWidth, canvasHeight) {
  this.layouts.forEach((layout) => (layout.posX -= this.speed));

  const startX = this.layouts[this.layouts.length - 1].posX;
  const endX = this.layouts[0].posX;

  if (startX <= canvasWidth) {
    const { height, posY } = this.getObstacleHeightAndPosY(canvasHeight);
    const image = this.getObstacleImage();

    this.layouts.push({
      posX: canvasWidth + this.gap,
      posY: posY,
      width: height * (image.width / image.height),
      height: height,
      image: image,
    });
  } else if (endX <= -2 * this.gap) {
    this.layouts.shift();
  }

  for (let i = 0; i < this.layouts.length; i++) {
    const { posX, posY, width, height, image } = this.layouts[i];
    ctx.drawImage(image, posX, posY, width, height);
  }
};

export default Obstacle;
