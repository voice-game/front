class PitchPoint {
  constructor(point) {
    this.img = new Image();
    this.img.src = point.pointer.src;

    this.posX = point.posX;
    this.posY = point.posY;
    this.range = point.pointer.range;
  }

  draw(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY
    );
    ctx.restore();
  }

  checkCharacterReached(characterX, characterY) {
    return (
      (this.posY + this.range) === characterY &&
      this.posX <= characterX &&
      characterX <= (this.posX + this.range)
    );
  }
}

export default PitchPoint;
