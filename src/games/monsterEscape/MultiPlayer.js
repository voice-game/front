class MultiPlayer {
  constructor(canvasWidth, canvasHeight, images, size, fps) {
    this.images = images.characters.goblin;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setSize();
  }

  setSize() {
    const image = this.images.normal;
    this.width = this.size * this.canvasWidth;
    this.height = this.width * image.height / (image.width / this.fps);
  };

  animate(ctx, myData, yourData, frame) {
    const myNormDistance = myData.normDistance;
    const { normPosX, normPosY, normDistance, shieldTime, life } = yourData;

    let image = this.images.normal;

    const gap = image.width / this.fps;
    const distanceGap = (myNormDistance - normDistance) * this.canvasWidth;
    const posX = normPosX * this.canvasWidth - distanceGap;
    const posY = normPosY * this.canvasHeight;

    if (shieldTime) { image = this.images.collision }

    if (!life) { image = this.images.dead }

    ctx.drawImage(
      image,
      gap * frame,
      0,
      gap,
      image.height,
      posX,
      posY,
      this.width,
      this.height,
    );
  };
}

export default MultiPlayer;
