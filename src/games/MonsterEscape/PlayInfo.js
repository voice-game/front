function PlayInfo(images) {
  this.images = images;
}

PlayInfo.prototype.animate = function (
  ctx,
  canvasWidth,
  canvasHeight,
  distance,
  life,
  maxLife,
  fps,
  frame,
) {
  this.distance += this.groundSpeed;

  const heart = this.images[0];
  const gameOver = this.images[1];

  const lifeBoxWidth = 0.2 * canvasWidth;
  const lifeBoxGap = lifeBoxWidth / maxLife;
  const lifeBoxRightPosX = 0.98 * canvasWidth;
  const lifeBoxPosY = 0.05 * canvasHeight;
  const lifeWidth = lifeBoxGap - 0.005 * canvasWidth;

  for (let i = 1; i < life + 1; i++) {
    ctx.drawImage(
      heart,
      lifeBoxRightPosX - lifeBoxGap * i,
      lifeBoxPosY,
      lifeWidth,
      lifeWidth * (heart.height / heart.width),
    );
  }

  ctx.font = `${0.05 * canvasWidth}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.fillText(
    `${Math.round(distance)} m`,
    0.8 * canvasWidth,
    0.2 * canvasHeight,
  );

  if (life === 0) {
    const gap = gameOver.height / fps;
    const width = 0.5 * canvasWidth;
    const height = width * (gap / gameOver.width);

    ctx.drawImage(
      gameOver,
      0,
      gap * frame,
      gameOver.width,
      gap,
      canvasWidth / 2 - width / 2,
      canvasHeight / 2 - height / 2,
      width,
      height,
    );
  }
};

export default PlayInfo;
