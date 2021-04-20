function PlayInfo() {}

PlayInfo.prototype.animate = function (
  ctx,
  canvasWidth,
  canvasHeight,
  distance,
  life,
  maxLife,
) {
  this.distance += this.groundSpeed;

  const lifeBoxWidth = 0.2 * canvasWidth;
  const lifeBoxHeight = 0.05 * canvasHeight;
  const lifeBoxGap = lifeBoxWidth / maxLife;
  const lifeBoxRightPosX = 0.95 * canvasWidth;
  const lifeBoxPosY = 0.05 * canvasHeight;
  const lifeWidth = lifeBoxGap - 0.01 * canvasWidth;

  for (let i = 0; i < life; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      lifeBoxRightPosX - lifeBoxGap * i,
      lifeBoxPosY,
      lifeWidth,
      lifeBoxHeight,
    );
  }

  ctx.font = "30px sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText(`${distance} m`, 0.8 * canvasWidth, 0.2 * canvasHeight);

  if (life === 0) {
    ctx.font = "100px sans-serif";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 0.2 * canvasWidth, 0.5 * canvasHeight);
  }
};

export default PlayInfo;
