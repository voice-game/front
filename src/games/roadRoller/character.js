import { imageController } from "./imageController";

class Character {
  constructor() {
    this.img = new Image();

    this.imgList = imageController();
    this.currentImg = this.imgList.idle;

    this.width = this.currentImg.width / 4;
    this.height = this.currentImg.height / 4;
    this.widthHalf = this.width / 2;

    this.currentFrame = 0;
    this.fpsTime = 1000 / this.currentImg.totalFrame;

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
