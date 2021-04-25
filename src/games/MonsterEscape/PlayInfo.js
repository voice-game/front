class PlayInfo {
  constructor (canvasWidth, canvasHeight, images, fps){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images;
    this.fps = fps;
  }

  animate (ctx, characterInfo, gameStatus, frame) {
    const { distance, life, maxLife } = characterInfo;
    const { isPlay, isFinished } = gameStatus;

    const heart = this.images.heart;
    const gameOver = this.images.gameOver;

    const lifeBoxWidth = 0.2 * this.canvasWidth;
    const lifeBoxGap = lifeBoxWidth / maxLife;
    const lifeBoxPosX = 0.02 * this.canvasWidth;
    const lifeBoxPosY = 0.1 * this.canvasHeight;
    const lifeWidth = lifeBoxGap - 0.005 * this.canvasWidth;

    for (let i = 0; i < life; i++) {
      ctx.drawImage(
        heart,
        lifeBoxPosX + lifeBoxGap * i,
        lifeBoxPosY,
        lifeWidth,
        lifeWidth * (heart.height / heart.width),
      );
    }

    ctx.font = `bold ${0.05 * this.canvasWidth}px sans-serif`;
    ctx.textAlign = "right";
    ctx.fillStyle = "#7B1FA2";
    ctx.fillText(
      `${Math.round(0.1 * distance)} m`,
      0.2 * this.canvasWidth,
      0.1 * this.canvasHeight,
    );

    let gameSatusImg;

    // if (!isPlay) {
    //   gameStatus = 
    // }

    // if (isFinished) {

    // }

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
