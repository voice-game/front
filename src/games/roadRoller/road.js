function Road (canvasWidth, canvasHeight, pitchDetectorRef) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.pitchDetectorRef = pitchDetectorRef;

  this.isReady = false;
  this.isDrawingRoad = false;
  this.isRoadDrawed = false;

  this.roadDots = [];

  this.roadPoint = {
    radius: 3,
    initialX: 200,
    initialY: this.canvasHeight - 200,
    x: 200,
    y: this.canvasHeight - 200,
    maxX: this.canvasWidth - 200,
    minY: 200,
  };
}

Road.prototype.draw = function (ctx, detectorReady) {
  if (!detectorReady) {
    this.roadPoint.x = this.roadPoint.initialX;
    this.roadPoint.y = this.roadPoint.initialY;
    this.roadDots = [];
  }

  this.drawRoadPoint(ctx);
  this.drawRoad(ctx);
  ctx.fill();

  return this.roadDots;
};

Road.prototype.drawRoadPoint = function (ctx) {
  ctx.fillStyle = "red";
  ctx.arc(this.roadPoint.x, this.roadPoint.y, this.roadPoint.radius, 0, Math.PI * 2);
};

Road.prototype.drawRoad = async function (ctx) {
  const pitch = await this.pitchDetectorRef.current.getPitch();

  if (pitch) {
    this.isDrawingRoad = true;
  }

  if (this.isDrawingRoad && this.roadPoint.x <= this.roadPoint.maxX) {
    this.roadPoint.x += 1;
    this.roadPoint.y = this.canvasHeight - pitch;
    this.roadDots.push(this.roadPoint.y);
  }

  if (this.roadPoint.x === this.roadPoint.maxX) {
    this.isRoadDrawed = true;
  }

  if (!this.isReady) {
    this.isDrawingRoad = false;
  }
}

export default Road;
