class PitchPoint {
  constructor(point) {
    this.img = point.pointer.img;
    this.posX = point.posX;
    this.posY = point.posY;
    this.range = point.range;
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
