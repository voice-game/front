import { imageController } from "./imageController";

class Character {
  constructor() {
    this.img = new Image();

    this.imgList = imageController();
    this.currentImg = this.imgList.idle;

    this.ratio = 4;
    this.width = this.currentImg.width / this.ratio;
    this.height = this.currentImg.height / this.ratio;
    this.widthHalf = this.width / 2;

    this.currentFrame = 0;
    this.frameSpeed = 10;
    this.fpsTime = 1000 / this.frameSpeed;

    this.isFlipped = false;
  }

  draw(ctx, x, y, timeStamp) {
    this.img.src = this.currentImg.src;

    if (!this.pivotTime) {
      this.pivotTime = timeStamp;
    }

    const now = timeStamp - this.pivotTime;

    if (now > this.fpsTime) {
      this.pivotTime = timeStamp;
      this.currentFrame += 1;
    }

    if (this.currentImg.totalFrame <= this.currentFrame) {
      this.currentFrame = 0;
    }

    this.animate(ctx, x, y);
  }

  animate(ctx, x, y) {
    let characterX = x;
    let width = this.width;

    ctx.save();

    if (this.isFlipped) {
      ctx.scale(-1, 1);
      characterX = -characterX;
      width = -width;
    }

    ctx.drawImage(
      this.img,
      this.currentImg.width * this.currentFrame,
      0,
      this.currentImg.width,
      this.currentImg.height,
      characterX,
      y,
      width,
      this.height + 3
    );

    ctx.restore();
  }
}

export default Character;
