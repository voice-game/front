import PitchPoint from "./PitchPoint";

class Pad {
  constructor(
    pitchDetectorRef,
    point,
    images
  ) {
    this.pitchDetectorRef = pitchDetectorRef;

    this.pitchPoint = new PitchPoint(point, images.pitchPoints);

    this.img = images.pads[point.pad.index];

    this.width = point.width;
    this.height = point.height;

    this.posX = point.posX - point.pad.range;
    this.posY = point.posY;
    this.minX = this.posX;
    this.maxX = this.posX + point.pad.range - this.width;

    this.pitchPivot = 100;
    this.speed = 1;
    this.correction = 20;

    this.ready = false;
  }

  draw(ctx, characterController) {
    this.chracterX = characterController.characterCenterX;
    this.chracterY = characterController.posY;

    this.pitchPoint.draw(ctx);

    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY - this.correction,
      this.width,
      this.height
    );
    ctx.restore();

    if (this.pitchPoint.checkCharacterReached(this.chracterX, this.chracterY)) {
      this.ready = true;
    } else {
      this.ready = false;

      if (this.minX < this.posX) {
        this.posX -= this.speed;
        this.checkOnBoard(characterController);
      }
    }

    if (this.ready) {
      this.movePad();
    }

    return {
      posX: this.posX,
      posY: this.posY,
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

  checkOnBoard(characterController) {
    if (this.posY !== this.chracterY) {
      return;
    }

    if (this.posY < this.chracterX && this.chracterX < this.posX + this.width) {
      characterController.posX -= this.speed;
    }
  }
}

export default Pad;
