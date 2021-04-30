const drawFlipImage = (
  ctx,
  img,
  dx,
  dy,
  dWidth,
  dHeight,
  sx,
  sy,
  sWidth,
  sHeight,
  currentFrame
) => {
  ctx.scale(-1, 1);

  if (sx) {
    ctx.drawImage(
      img,
      sWidth * currentFrame,
      sy,
      sWidth,
      sHeight,
      -dx,
      dy,
      -dWidth,
      dHeight
    );

    return;
  }

  ctx.drawImage(
    img,
    -dx,
    dy,
    -dWidth,
    dHeight
  );
};

export default drawFlipImage;
