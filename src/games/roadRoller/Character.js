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
    this.frame = this.currentImg.frame;

    this.frameWidth = this.img.width / this.frame;
    this.frameHeight = this.img.height;

    this.width = this.frameWidth / this.ratio;
    this.height = this.frameHeight / this.ratio;


    if (!this.pivotTime) {
      this.pivotTime = timeStamp;
    }

    const now = timeStamp - this.pivotTime;

    if (now > this.fpsTime) {
      this.pivotTime = timeStamp;
      this.currentFrame += 1;
    }

    if (this.frame <= this.currentFrame) {
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
      this.frameWidth * this.currentFrame,
      0,
      this.frameWidth,
      this.frameHeight,
      characterX,
      y,
      width,
      this.height + 3
    );

    ctx.restore();
  }
}

export default Character;
