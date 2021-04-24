class MultiPlayer {
  constructor(canvasWidth, canvasHeight, images, size, fps) {
    this.images = images;
    this.size = size;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fps = fps;
    this.setSize();
  }

  // distance = 0;
  // posX = 0;
  // posY = 0;
  // width = 0;
  // height = 0

  setSize() {
    const image = this.images[0];
    this.height = this.size * this.canvasHeight;
    this.width = this.height * (image.width / this.fps) / image.height;
  };

  animate(ctx, normPosX, normPosY, myNormDistance, yourNormDistance, frame) {
    let image = this.images[0];
    const gap = image.width / this.fps;

    const distanceGap = (yourNormDistance - myNormDistance) * this.canvasWidth;

    const posX = normPosX * this.canvasWidth - distanceGap;
    const posY = normPosY * this.canvasHeight;


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
