function Box(images) {
  this.images = images;
}

Box.prototype.animate = function (ctx, canvasWidth, canvasHeight, isPlay) {
  const ctrlBox = this.images[0];
  const settingBox = this.images[1];
  const playBtn = this.images[2];
  const replayBtn = this.images[3];

  const ctrlAspectRatio = ctrlBox.width / ctrlBox.height;
  const ctrlBoxHeight = 0.2 * canvasHeight;
  const ctrlBoxWidth = ctrlAspectRatio * ctrlBoxHeight;
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

  ctx.drawImage(ctrlBox, ctrlBoxPosX, ctrlBoxPosY, ctrlBoxWidth, ctrlBoxHeight);

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
