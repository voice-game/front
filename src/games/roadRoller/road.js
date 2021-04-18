function Road (canvas, pitchDetector) {
  this.canvasWidth = canvas.width;
  this.canvasHeight = canvas.height;
  this.isReady = false;
  this.isDrawingRoad = false;
  this.isDrawedRoad = false;
  this.radius = 3;
  this.pitchDetector = pitchDetector;
  this.road = [];

  this.roadPoint = {
    initialX: 200,
    initialY: this.canvasHeight - 200,
    x: 200,
    y: this.canvasHeight - 200,
    maxX: this.canvasWidth - 200,
    minY: 200,
  };
}

Road.prototype.draw = function (ctx, dots) {
  if (this.isReady || this.isDrawingRoad) {
    this.drawRoad(ctx, dots);
    this.drawRoadPoint(ctx);
    ctx.fill();
  }

  return this.road;
};

Road.prototype.drawRoadPoint = function (ctx, dots) {
  ctx.fillStyle = "red";
  ctx.arc(this.roadPoint.x, this.roadPoint.y, this.radius, 0, Math.PI * 2);
};

Road.prototype.drawRoad = async function (ctx, dots) {
  const pitch = await this.pitchDetector.current.getPitch();

  if (pitch) {
    this.isDrawingRoad = true;
  }

  if (this.isDrawingRoad && this.roadPoint.x <= this.roadPoint.maxX) {
    this.roadPoint.x += 1;
    this.roadPoint.y = this.canvasHeight - pitch;
    this.road.push(this.roadPoint.y);
  }
}

export default Road;
