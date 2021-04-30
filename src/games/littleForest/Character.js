class Character {
  constructor(images) {
    this.imgList = images;
    this.currentImg = this.imgList.idle;

    this.ratio = 4;

    this.currentFrame = 0;
    this.frameSpeed = 10;
    this.fpsTime = 1000 / this.frameSpeed;

    this.isFlipped = false;
  }

  draw(ctx, x, y, timeStamp) {
    this.img = this.currentImg.img;
    this.totalFrame = this.currentImg.frame;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeight = this.img.height;

    this.width = this.sWidth / this.ratio;
    this.height = this.sHeight / this.ratio;

    if (!this.pivotTime) {
      this.pivotTime = timeStamp;
    }

    const now = timeStamp - this.pivotTime;

    if (now > this.fpsTime) {
      this.pivotTime = timeStamp;
      this.currentFrame += 1;
    }

    if (this.totalFrame <= this.currentFrame) {
      this.currentFrame = 0;
    }

    this.animate(ctx, x, y);
  }

  animate(ctx, x, y) {
    const dy = y;
    const dHeight = this.height + 3;
    let dx = x;
    let dWidth = this.width;

    ctx.save();

    if (this.isFlipped) {
      ctx.scale(-1, 1);
      dx = -dx;
      dWidth = -dWidth;
    }

    ctx.drawImage(
      this.img,
      this.sWidth * this.currentFrame,
      0,
      this.sWidth,
      this.sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );

    ctx.restore();
  }
}

export default Character;
