import PitchPoint from "./PitchPoint";

class Pad {
  constructor(
    pitchDetectorRef,
    point
  ) {
    this.pitchDetectorRef = pitchDetectorRef;

    this.pitchPoint = new PitchPoint(point);

    this.img = new Image();
    this.img.src = point.pad.src;

    this.width = point.width;
    this.height = point.height;
    this.posX = point.posX - point.pad.range;
    this.posY = point.posY;
    this.minX = this.posX;
    this.maxX = this.posX + point.pad.range - this.width;

    this.pitchPivot = 100;
    this.speed = 2;

    this.ready = false;
  }

  draw(ctx, characterX, characterY) {
    this.pitchPoint.draw(ctx);

    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    ctx.restore();

    if (this.pitchPoint.checkCharacterReached(characterX ,characterY)) {
      this.ready = true;
    } else {
      this.ready = false;

      if (this.minX < this.posX) {
        this.posX -= this.speed;
      }
    }

    if (this.ready) {
      this.movePad();
    }

    return {
      posX: this.posX,
      width: this.width,
    };
  }

  async movePad() {
    const pitch = await this.pitchDetectorRef.current.getPitch();

    if (pitch < 100 && this.minX < this.posX) {
      this.posX -= this.speed;
    }

    if (100 <= pitch && this.posX < this.maxX) {
      this.posX += this.speed;
    }
  }
}

export default Pad;
