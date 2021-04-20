import { imageController } from "./imageController";

class Character {
  constructor() {
    this.img = new Image();

    this.imgList = imageController();
    this.currentImg = this.imgList.idle;

    this.characterWidth = this.currentImg.width / 4;
    this.characterHeight = this.currentImg.height / 4;
    this.characterWidthHalf = this.characterWidth / 2;

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
    let characterWidth = this.characterWidth;

    ctx.save();

    if (this.isFlipped) {
      ctx.scale(-1, 1);
      characterX = -characterX;
      characterWidth = -characterWidth;
    }

    ctx.drawImage(
      this.img,
      this.currentImg.width * this.currentFrame,
      0,
      this.currentImg.width,
      this.currentImg.height,
      characterX,
      y,
      characterWidth,
      this.characterHeight + 3
    );

    ctx.restore();
  }
}

export default Character;
