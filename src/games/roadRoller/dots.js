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

  fillRoadDots(ctx, staticDots, roadDots) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;

    for (const eachDots of roadDots) {
      const {
        posX,
        dots
      } = eachDots;

      for (let i = 1; i < dots.length; i++) {
        if (staticDots[posX + i]) {
          staticDots[posX + i].push(dots[i]);
          staticDots[posX + i].sort();
        } else {
          staticDots[posX + i] = [dots[i]];
        }

        ctx.beginPath();

        ctx.moveTo(posX + i - 1, dots[i - 1]);
        ctx.lineTo(posX + i, dots[i]);
        ctx.stroke();
      }
    }

    ctx.closePath();
  }
}

export default DotsController;
