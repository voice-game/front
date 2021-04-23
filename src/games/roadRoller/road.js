import PitchPoint from "./pitchPoint";
import RoadBrush from "./roadBrush";

class Road {
  constructor(
    canvasHeight,
    pitchDetectorRef,
    point
  ) {
    this.canvasHeight = canvasHeight;
    this.pitchDetectorRef = pitchDetectorRef;

    this.pitchPoint = new PitchPoint(point);
    this.brush = new RoadBrush(point);

    this.ready = false;
    this.isDrawingRoad = false;
    this.roadDots = [];
  }

  draw (ctx, characterX, characterY) {
    this.pitchPoint.draw(ctx);

    if (this.pitchPoint.checkCharacterReached(characterX ,characterY)) {
      if (!this.ready) {
        this.roadDots = [];
      }

      this.ready  = true;
      this.brush.draw(ctx);
    } else {
      this.ready = false;
      this.brush.resetBrush();
    }

    if (this.ready) {
      this.drawRoad();
    }

    return {
      posX: this.brush.initialX,
      dots: this.roadDots,
    };
  }

  async drawRoad () {
    const pitch = await this.pitchDetectorRef.current.getPitch();

    if (pitch) {
      this.isDrawingRoad = true;
    }

    if (this.isDrawingRoad && this.brush.posX <= this.brush.maxX) {
      this.brush.posX += this.brush.speed;
      this.brush.posY = this.canvasHeight + 100 - Math.floor(pitch);

      if (this.brush.posY < this.brush.minY) {
        this.brush.posY = this.brush.minY;
      }

      for (let i = 0; i < this.brush.speed; i++) {
        this.roadDots.push(this.brush.posY);
      }
    }
  }
}

export default Road;
