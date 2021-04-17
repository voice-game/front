import tree1 from "../../images/fighterAttack/tree1.png";

function Obstacle(canvasWidth, canvasHeight, speed) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.speed = speed;
}

Obstacle.prototype.loadImage = function () {
  const img = new Image();
  img.src = tree1;
  this.img = img;
  // img.onload = () => {
  //   this.img = img;
  // };
};

Obstacle.prototype.getObstacleHeight = function () {
  const minHeight = this.canvasHeight / 10;
  const deviation = (this.canvasWidth - minHeight) / 5;

  return minHeight + Math.random() * deviation;
};

Obstacle.prototype.setObstacleLayouts = function (total) {
  this.gap = this.canvasWidth / (total - 1);
  this.layouts = [];

  for (let i = 0; i < total; i++) {
    const height = this.getObstacleHeight();
    this.layouts[i] = {
      x: i * this.gap, //+ 0.3 * Math.random() * this.gap,
      y: this.canvasHeight - height,
      height: height,
    };
  }
};

Obstacle.prototype.animate = function (ctx) {
  this.layouts.forEach((layout) => (layout.x -= this.speed));

  const startX = this.layouts[this.layouts.length - 1].x;
  const endX = this.layouts[0].x;

  if (startX <= this.canvasWidth) {
    const height = this.getObstacleHeight();
    this.layouts.push({
      x: this.canvasWidth + this.gap,
      y: this.canvasHeight - height,
      height: height,
    });
  } else if (endX <= -this.gap) {
    this.layouts.shift();
  }

  for (let i = 0; i < this.layouts.length; i++) {
    const posX = this.layouts[i].x;
    const posY = this.layouts[i].y;
    const height = this.layouts[i].height;
    ctx.drawImage(this.img, posX, posY, 50, height);
  }
};

export default Obstacle;
