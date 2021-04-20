import idle from "../../assets/image/charactor/hedgehog/idle.png";

function Character() {
  this.img = new Image();
  this.img.src = idle;

  this.imgWidth = 400;
  this.imgHeight = 320;

  this.characterWidth = 50;
  this.characterHeight = 40;
  this.characterWidthHalf = this.characterWidth / 2;

  this.totalFrame = 24;
  this.currentFrame = 0;
  this.fpsTime = 1000 / this.totalFrame;
}

Character.prototype.draw = function (ctx, x, y, timeStamp) {
  if (!this.pivotTime) {
    this.pivotTime = timeStamp;
  }

  const now = timeStamp - this.pivotTime;

  if (now > this.pivotTime) {
    this.pivotTime = timeStamp;
    this.currentFrame += 1;

    if (this.currentFrame === this.totalFrame) {
      this.currentFrame = 0;
    }
  }

  this.animate(ctx, x, y);
}

Character.prototype.animate = function (ctx, x, y) {
  ctx.save();
  ctx.drawImage(
    this.img,
    this.imgWidth * this.currentFrame,
    0,
    this.imgWidth,
    this.imgHeight,
    x,
    y,
    this.characterWidth,
    this.characterHeight
  );
  ctx.restore();
};

export default Character;
