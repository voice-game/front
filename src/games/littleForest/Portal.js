class Portal {
  constructor(point, image) {
    this.img = image.img;
    this.totalFrame = image.frame;

    this.posX = point.posX;
    this.posY = point.posY;

    this.sWidth = this.img.width / this.totalFrame;
    this.sHeight = this.img.height;

    this.width = point.width;
    this.height = point.height;

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
    const dx = this.posX;
    const dy = this.posY;
    const dWidth = this.width;
    const dHeight = this.height;

    ctx.save();
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
      // characterController.posX = characterController.initialX;
      // characterController.posY = characterController.initialY;

      getNextMap();
    }
  }
}

export default Portal;
