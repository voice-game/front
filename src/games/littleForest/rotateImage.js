const rotateImage = (
  deg,
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
  ctx.translate(dx + dWidth / 2, dy + dHeight / 2);
  ctx.rotate(deg * Math.PI / 180);

  if (sx) {
    ctx.drawImage(
      img,
      sx * currentFrame,
      sy,
      sWidth,
      sHeight,
      -(dWidth / 2),
      -(dHeight / 2),
      dWidth,
      dHeight
    );

    return;
  }

  ctx.drawImage(
    img,
    dx,
    dy,
    dWidth,
    dHeight
  );
};

export default rotateImage;
