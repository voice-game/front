import PitchPoint from "./pitchPoint";
import RoadBrush from "./roadBrush";

function Road (
  pitchDetectorRef,
  point
) {
  this.pitchDetectorRef = pitchDetectorRef;

  this.pitchPoint = new PitchPoint(point);
  this.brush = new RoadBrush(point);

  this.ready = false;
  this.isDrawingRoad = false;
  this.roadDots = [];
}

Road.prototype.draw = function (ctx, characterX, characterY) {
  this.pitchPoint.draw(ctx);

  if (this.pitchPoint.checkCharacterReached(characterX ,characterY)) {
    this.ready = this.brush.draw(ctx);
  }

  // if (this.ready) {
  //   this.brush.x = this.brush.initialX;
  //   this.brush.y = this.brush.initialY;
  //   this.isDrawingRoad = false;
  //   this.roadDots = [];
  // }

  // this.drawRoad();

  // return this.roadDots;
};

Road.prototype.drawRoad = async function () {
  const pitch = await this.pitchDetectorRef.current.getPitch();

  if (pitch) {
    this.isDrawingRoad = true;
  }

  if (this.isDrawingRoad && this.brush.x <= this.brush.maxX) {
    this.brush.x += this.brush.speed;
    this.brush.y = this.canvasHeight - pitch - this.brush.maxY;

    for (let i = 0; i < this.brush.speed; i++) {
      this.roadDots.push(this.brush.y);
    }
  }
}

export default Road;
