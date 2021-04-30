class Portal {
  constructor(info, image) {
    this.img = image.img;
    this.totalFrame = image.frame;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeight = this.img.height;

    this.dx = info.posX;
    this.dy = info.posY;

    this.dWidth = info.width;
    this.dHeight = info.height;

    this.currentFrame = 0;
    this.frameSpeed = 10;
    this.fpsTime = 1000 / this.frameSpeed;
  }

  draw(ctx, characterController, timeStamp, getNextMap) {
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

    this.checkReachedPortal(characterController, getNextMap);
    this.animate(ctx);
  }

  animate(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.sWidth * this.currentFrame,
      0,
      this.sWidth,
      this.sHeight,
      this.dx,
      this.dy,
      this.dWidth,
      this.dHeight
    );
    ctx.restore();
  }

  checkReachedPortal(characterController, getNextMap) {
    const characterX = characterController.characterCenterX;
    const characterY = characterController.posY - 20;

    const checkX =
      this.posX <= characterX &&
      characterX <= this.posX + this.width;
    const checkY =
      this.posY <= characterY &&
      characterY <= this.posY + this.height;

    if (checkX && checkY) {
      getNextMap();
    }
  }
}

export default Portal;
