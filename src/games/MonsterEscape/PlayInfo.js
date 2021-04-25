let i = 0

class PlayInfo {
  constructor (canvasWidth, canvasHeight, images, fps){
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images;
    this.fps = fps;
  }

  animate (ctx, characterInfo, gameStatus, frame) {
    const { distance, life, maxLife, isWinner } = characterInfo;
    const { isPlay, isFinished } = gameStatus;
    const { getReady, gameOver, victory, youLose } = this.images;

    const heart = this.images.heart;
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

    if (!isPlay || !life || isFinished) {
      let gameStatusImg;

      if (!isPlay) { gameStatusImg = getReady }
      if (!life) { gameStatusImg = gameOver }

      if (isFinished) {
        if (isWinner) {
          gameStatusImg = victory;
        } else {
          gameStatusImg = youLose;
        }
      }

      const gap = gameStatusImg.width / this.fps;
      const width = 0.5 * this.canvasWidth;
      const height = width * (gameStatusImg.height / gap);
      const x = this.canvasWidth / 2 - width / 2;
      const y = this.canvasHeight / 2 - height / 2;

      ctx.drawImage(
        gameStatusImg,
        gap * frame,
        0,
        gap,
        gameStatusImg.height,
        x,
        y,
        width,
        height,
      );
    }
  };
}

export default PlayInfo;
