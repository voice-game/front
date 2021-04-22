class DotsController {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  fiilStaticDots(staticDots) {
    const dots = [];

    for (let i = 0; i < staticDots.length; i++) {
      if (staticDots[i]) {
        dots[i] = [...staticDots[i]];
      }
    }

    return dots;
  }

  fillPitchDots(ctx, pitchDots) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    for (let i = 0; i < pitchDots.length; i++) {
      this.dots[200 + i] = pitchDots[i];

      ctx.beginPath();

      ctx.moveTo(200 + i - 1, this.dots[200 + i - 1]);
      ctx.lineTo(200 + i, this.dots[200 + i]);
      ctx.stroke();
    }

    ctx.closePath();
  }
}

export default DotsController;
