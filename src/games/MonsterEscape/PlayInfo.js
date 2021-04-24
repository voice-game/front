class PlayInfo {
  constructor (canvasWidth, canvasHeight, images, fps){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images;
    this.fps = fps;
  }


  animate (ctx, characterInfo, frame) {
    const {distance, life, maxLife} = characterInfo;

    const heart = this.images[0];
    const gameOver = this.images[1];

    const lifeBoxWidth = 0.2 * this.canvasWidth;
    const lifeBoxGap = lifeBoxWidth / maxLife;
    const lifeBoxRightPosX = 0.98 * this.canvasWidth;
    const lifeBoxPosY = 0.05 * this.canvasHeight;
    const lifeWidth = lifeBoxGap - 0.005 * this.canvasWidth;

    for (let i = 1; i < life + 1; i++) {
      ctx.drawImage(
        heart,
        lifeBoxRightPosX - lifeBoxGap * i,
        lifeBoxPosY,
        lifeWidth,
        lifeWidth * (heart.height / heart.width),
      );
    }

    ctx.font = `${0.05 * this.canvasWidth}px sans-serif`;
    ctx.textAlign = "right";
    ctx.fillStyle = "#7B1FA2";
    ctx.fillText(
      `${Math.round(distance)} m`,
      0.8 * this.canvasWidth,
      0.2 * this.canvasHeight,
    );

    if (life === 0) {
      const gap = gameOver.height / this.fps;
      const width = 0.5 * this.canvasWidth;
      const height = width * (gap / gameOver.width);

      ctx.drawImage(
        gameOver,
        0,
        gap * frame,
        gameOver.width,
        gap,
        this.canvasWidth / 2 - width / 2,
        this.canvasHeight / 2 - height / 2,
        width,
        height,
      );
    }
  };
}

export default PlayInfo;
