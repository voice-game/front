class RoadBrush {
  constructor(pitchPoint) {
    this.radius = 8;
    this.range = pitchPoint.range;
    this.initialX = pitchPoint.posX + this.range;
    this.initialY = pitchPoint.posY + this.range;
    this.posX = this.initialX;
    this.posY = this.initialY;
    this.maxX = this.initialX + pitchPoint.width;
    this.minY = this.initialY - pitchPoint.height;
    this.speed = 1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  resetBrush() {
    this.posX = this.initialX;
    this.posY = this.initialY;
  }
}

export default RoadBrush;
