function Box(images) {
  this.images = images;
}

Box.prototype.animate = function (
  ctx,
  canvasWidth,
  canvasHeight,
  isPlay,
  speed,
) {
  const ctrlBox = this.images[0];
  const settingBox = this.images[1];
  const playBtn = this.images[2];
  const replayBtn = this.images[3];
  const minusBtn = this.images[4];
  const plusBtn = this.images[5];
  const downBtn = this.images[6];
  const upBtn = this.images[7];
  const volumeIcon = this.images[8];

  const ctrlBoxAspectRatio = ctrlBox.width / ctrlBox.height;
  const ctrlBoxHeight = 0.2 * canvasHeight;
  const ctrlBoxWidth = ctrlBoxAspectRatio * ctrlBoxHeight;
  const ctrlBoxPosX = 0.005 * canvasWidth;
  const ctrlBoxPosY = 0.8 * canvasHeight;

  const playBtnAspectRatio = playBtn.width / playBtn.height;
  const playBtnHeight = ctrlBoxHeight / 3;
  const playBtnWidth = playBtnAspectRatio * playBtnHeight;
  const playBtnPosX = ctrlBoxPosX + 0.1 * ctrlBoxWidth;
  const playBtnPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * playBtnHeight;

  this.playBtnHeight = playBtnHeight;
  this.playBtnWidth = playBtnWidth;
  this.playBtnPosX = playBtnPosX;
  this.playBtnPosY = playBtnPosY;

  const upBtnAspectRatio = upBtn.width / upBtn.height;
  const upBtnHeight = ctrlBoxHeight * 0.2;
  const upBtnWidth = upBtnAspectRatio * upBtnHeight;
  const upBtnPosX = ctrlBoxPosX + 0.8 * ctrlBoxWidth;
  const upBtnPosY = ctrlBoxPosY + 0.15 * ctrlBoxHeight;

  const downBtnAspectRatio = downBtn.width / downBtn.height;
  const downBtnHeight = ctrlBoxHeight * 0.2;
  const downBtnWidth = downBtnAspectRatio * downBtnHeight;
  const downBtnPosX = ctrlBoxPosX + 0.8 * ctrlBoxWidth;
  const downBtnPosY =
    ctrlBoxPosY + ctrlBoxHeight - downBtnHeight - 0.15 * ctrlBoxHeight;

  const speedFontSize = 0.2 * ctrlBoxHeight;
  const speedPosY =
    upBtnPosY +
    upBtnHeight +
    0.5 * (downBtnPosY - upBtnPosY) -
    0.2 * speedFontSize;
  const speedPosX = upBtnPosX + 0.05 * ctrlBoxWidth;

  this.upBtnHeight = upBtnHeight;
  this.upBtnWidth = upBtnWidth;
  this.upBtnPosX = upBtnPosX;
  this.upBtnPosY = upBtnPosY;

  this.downBtnHeight = downBtnHeight;
  this.downBtnWidth = downBtnWidth;
  this.downBtnPosX = downBtnPosX;
  this.downBtnPosY = downBtnPosY;

  ctx.drawImage(ctrlBox, ctrlBoxPosX, ctrlBoxPosY, ctrlBoxWidth, ctrlBoxHeight);

  ctx.drawImage(upBtn, upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight);

  ctx.font = `${speedFontSize}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(speed, speedPosX, speedPosY);

  ctx.drawImage(downBtn, downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight);

  if (isPlay) {
    ctx.drawImage(
      replayBtn,
      playBtnPosX,
      playBtnPosY,
      playBtnWidth,
      playBtnHeight,
    );
  } else {
    ctx.drawImage(
      playBtn,
      playBtnPosX,
      playBtnPosY,
      playBtnWidth,
      playBtnHeight,
    );
  }
};

export default Box;
