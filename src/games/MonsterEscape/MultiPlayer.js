class MultiPlayer {
  constructor(canvasWidth, canvasHeight, images, size, fps) {
    this.images = images;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setSize();
  }

  setSize() {
    const image = this.images[0];
    this.height = this.size * this.canvasHeight;
    this.width = this.height * (image.width / this.fps) / image.height;
  };

  animate(ctx, myData, yourData, frame) {
    const myNormDistance = myData.normDistance;
    const { normPosX, normPosY, normDistance, shieldTime, life } = yourData;

    let image = this.images[3];

    const gap = image.width / this.fps;
    const distanceGap = (myNormDistance - normDistance) * this.canvasWidth;
    const posX = normPosX * this.canvasWidth - distanceGap;
    const posY = normPosY * this.canvasHeight;

    if (shieldTime) { image = this.images[4] }

    if (!life) { image = this.images[5] }

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
