function Box(images) {
  this.images = images;
}

Box.prototype.animate = function (ctx, canvasWidth, canvasHeight, isPlay, speed, volThreshold) {
  const ctrlBox = this.images[0];
  const settingBox = this.images[1];
  const playBtn = this.images[2];
  const replayBtn = this.images[3];
  const minusBtn = this.images[4];
  const plusBtn = this.images[5];
  const downBtn = this.images[6];
  const upBtn = this.images[7];
  const volumeIcon = this.images[8];
  const batSpdIcon = this.images[9];

  const ctrlBoxAspectRatio = ctrlBox.width / ctrlBox.height;
  const ctrlBoxHeight = 0.2 * canvasHeight;
  const ctrlBoxWidth = ctrlBoxAspectRatio * ctrlBoxHeight;
  const ctrlBoxPosX = 0.01 * canvasWidth;
  const ctrlBoxPosY = 0.8 * canvasHeight;

  const playBtnAspectRatio = playBtn.width / playBtn.height;
  const playBtnHeight = ctrlBoxHeight / 3;
  const playBtnWidth = playBtnAspectRatio * playBtnHeight;
  const playBtnPosX = ctrlBoxPosX + 0.05 * ctrlBoxWidth;
  const playBtnPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * playBtnHeight;

  this.playBtnHeight = playBtnHeight;
  this.playBtnWidth = playBtnWidth;
  this.playBtnPosX = playBtnPosX;
  this.playBtnPosY = playBtnPosY;

  const batSpeedAspectRatio = batSpdIcon.width / batSpdIcon.height;
  const batSpeedHeight = 0.2 * ctrlBoxHeight;
  const batSpeedWidth = batSpeedAspectRatio * batSpeedHeight;
  const batSpeedPosX = ctrlBoxPosX + 0.3 * ctrlBoxWidth;
  const batSpeedPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * batSpeedHeight;

  const upBtnAspectRatio = upBtn.width / upBtn.height;
  const upBtnHeight = ctrlBoxHeight * 0.15;
  const upBtnWidth = upBtnAspectRatio * upBtnHeight;
  const upBtnPosX = ctrlBoxPosX + batSpeedPosX + 0.1 * ctrlBoxWidth;
  const upBtnPosY = ctrlBoxPosY + 0.2 * ctrlBoxHeight;

  const downBtnAspectRatio = downBtn.width / downBtn.height;
  const downBtnHeight = upBtnHeight;
  const downBtnWidth = downBtnAspectRatio * downBtnHeight;
  const downBtnPosX = upBtnPosX;
  const downBtnPosY = ctrlBoxPosY + ctrlBoxHeight - downBtnHeight - 0.2 * ctrlBoxHeight;

  const spdFontSize = 0.15 * ctrlBoxHeight;
  const speedPosY = upBtnPosY + upBtnHeight + 0.5 * (downBtnPosY - upBtnPosY) - 0.2 * spdFontSize;
  const speedPosX = upBtnPosX + 0.05 * ctrlBoxWidth;

  const volIconAspectRatio = volumeIcon.width / volumeIcon.height;
  const volIconHeight = 0.2 * ctrlBoxHeight;
  const volIconWidth = volIconAspectRatio * volIconHeight;
  const volIconPosX = ctrlBoxPosX + 0.6 * ctrlBoxWidth;
  const volIconPosY = ctrlBoxPosY + 0.5 * ctrlBoxHeight - 0.5 * volIconHeight;

  const plusBtnAspectRatio = plusBtn.width / plusBtn.height;
  const plusBtnHeight = ctrlBoxHeight * 0.15;
  const plusBtnWidth = plusBtnAspectRatio * plusBtnHeight;
  const plusBtnPosX = ctrlBoxPosX + volIconPosX + 0.1 * ctrlBoxWidth;
  const plusBtnPosY = ctrlBoxPosY + 0.2 * ctrlBoxHeight;

  const minusBtnAspectRatio = minusBtn.width / minusBtn.height;
  const minusBtnHeight = plusBtnHeight;
  const minusBtnWidth = minusBtnAspectRatio * minusBtnHeight;
  const minusBtnPosX = plusBtnPosX;
  const minusBtnPosY = ctrlBoxPosY + ctrlBoxHeight - minusBtnHeight - 0.2 * ctrlBoxHeight;

  const volFontSize = 0.15 * ctrlBoxHeight;
  const volPosY =
    plusBtnPosY + plusBtnHeight + 0.5 * (minusBtnPosY - plusBtnPosY) - 0.2 * volFontSize;
  const volPosX = plusBtnPosX + 0.05 * ctrlBoxWidth;

  this.upBtnHeight = upBtnHeight;
  this.upBtnWidth = upBtnWidth;
  this.upBtnPosX = upBtnPosX;
  this.upBtnPosY = upBtnPosY;

  this.downBtnHeight = downBtnHeight;
  this.downBtnWidth = downBtnWidth;
  this.downBtnPosX = downBtnPosX;
  this.downBtnPosY = downBtnPosY;

  this.plusBtnHeight = plusBtnHeight;
  this.plusBtnWidth = plusBtnWidth;
  this.plusBtnPosX = plusBtnPosX;
  this.plusBtnPosY = plusBtnPosY;

  this.minusBtnHeight = minusBtnHeight;
  this.minusBtnWidth = minusBtnWidth;
  this.minusBtnPosX = minusBtnPosX;
  this.minusBtnPosY = minusBtnPosY;

  ctx.drawImage(ctrlBox, ctrlBoxPosX, ctrlBoxPosY, ctrlBoxWidth, ctrlBoxHeight);

  ctx.drawImage(volumeIcon, volIconPosX, volIconPosY, volIconWidth, volIconHeight);
  ctx.drawImage(plusBtn, plusBtnPosX, plusBtnPosY, plusBtnWidth, plusBtnHeight);
  ctx.font = `${spdFontSize}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(speed, speedPosX, speedPosY);
  ctx.drawImage(minusBtn, minusBtnPosX, minusBtnPosY, minusBtnWidth, minusBtnHeight);

  ctx.drawImage(batSpdIcon, batSpeedPosX, batSpeedPosY, batSpeedWidth, batSpeedHeight);
  ctx.drawImage(upBtn, upBtnPosX, upBtnPosY, upBtnWidth, upBtnHeight);
  ctx.font = `${volFontSize}px sans-serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(volThreshold, volPosX, volPosY);
  ctx.drawImage(downBtn, downBtnPosX, downBtnPosY, downBtnWidth, downBtnHeight);

  const volBarPosX = plusBtnPosX + 0.15 * ctrlBoxWidth;
  const volBarPosY = plusBtnPosY;
  const volBarWidth = 0.05 * ctrlBoxWidth;
  const volBarHeight = minusBtnPosY + minusBtnHeight - plusBtnPosY;

  ctx.strokeStyle = "black";
  ctx.strokeRect(volBarPosX, volBarPosY, volBarWidth, volBarHeight);

  if (isPlay) {
    ctx.drawImage(replayBtn, playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight);
  } else {
    ctx.drawImage(playBtn, playBtnPosX, playBtnPosY, playBtnWidth, playBtnHeight);
  }
};

export default Box;
