function Road (canvasWidth, canvasHeight, pitchDetectorRef) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.pitchDetectorRef = pitchDetectorRef;

  this.isDrawingRoad = false;
  this.roadDots = [];

  this.roadPoint = {
    radius: 8,
    initialX: 200,
    initialY: this.canvasHeight - 200,
    x: 200,
    y: this.canvasHeight - 200,
    maxX: this.canvasWidth - 200,
    maxY: 50,
    speed: 1,
  };
}

Road.prototype.draw = function (ctx, detectorReady) {
  if (!detectorReady) {
    this.roadPoint.x = this.roadPoint.initialX;
    this.roadPoint.y = this.roadPoint.initialY;
    this.isDrawingRoad = false;
    this.roadDots = [];
  }

  this.drawRoadPoint(ctx);
  this.drawRoad();

  return this.roadDots;
};

Road.prototype.drawRoadPoint = function (ctx) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(
    this.roadPoint.x,
    this.roadPoint.y,
    this.roadPoint.radius,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

Road.prototype.drawRoad = async function () {
  const pitch = await this.pitchDetectorRef.current.getPitch();

  if (pitch) {
    this.isDrawingRoad = true;
  }

  if (this.isDrawingRoad && this.roadPoint.x <= this.roadPoint.maxX) {
    this.roadPoint.x += this.roadPoint.speed;
    this.roadPoint.y = this.canvasHeight - pitch - this.roadPoint.maxY;

    for (let i = 0; i < this.roadPoint.speed; i++) {
      this.roadDots.push(this.roadPoint.y);
    }
  }
}

export default Road;
