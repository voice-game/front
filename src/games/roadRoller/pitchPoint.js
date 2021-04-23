class PitchPoint {
  constructor(point) {
    this.img = point.img;
    this.posX = point.posX;
    this.posY = point.posY;
    this.width = point.width;
    this.height = point.height;
    this.range = point.range;
  }

  draw(ctx) {
    ctx.save();
    ctx.drawImage(
      this.img.img,
      this.posX,
      this.posY
    );
    ctx.restore();
  }

  checkCharacterReached(characterX, characterY) {
    if (
      (this.posY + this.range) === characterY &&
      this.posX <= characterX &&
      characterX <= (this.posX + this.range)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default PitchPoint;
