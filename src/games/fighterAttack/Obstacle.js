// import tree1 from "../../images/fighterAttack/tree1.png";

function Obstacle(type, minHeight, maxHeight, minPosY, maxPosY) {
  this.type = type;
  this.minHeight = minHeight;
  this.maxHeight = maxHeight;
  this.minPosY = minPosY;
  this.maxPosY = maxPosY;
}

Obstacle.prototype.loadImage = function (ctx, images) {
  this.images = [];

  images.forEach((image) => {
    const img = new Image();
    img.src = image;
    this.images.push(img);
  });
  // img.onload = () => {
  //   this.img = img;
  // };
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

    this.layouts[i] = {
      x: i * this.gap + 0.5 * Math.random() * this.gap,
      y: posY,
      height: height,
      image: this.getObstacleImage(),
    };
  }
};

Obstacle.prototype.animate = function (ctx, canvasWidth, canvasHeight, speed) {
  this.layouts.forEach((layout) => (layout.x -= speed));

  const startX = this.layouts[this.layouts.length - 1].x;
  const endX = this.layouts[0].x;

  if (startX <= canvasWidth) {
    const { height, posY } = this.getObstacleHeightAndPosY(canvasHeight);
    this.layouts.push({
      x: canvasWidth + this.gap,
      y: posY,
      height: height,
      image: this.getObstacleImage(),
    });
  } else if (endX <= -this.gap) {
    this.layouts.shift();
  }

  for (let i = 0; i < this.layouts.length; i++) {
    const posX = this.layouts[i].x;
    const posY = this.layouts[i].y;
    const height = this.layouts[i].height;
    const image = this.layouts[i].image;

    ctx.drawImage(image, posX, posY, 50, height);
  }
};

export default Obstacle;
