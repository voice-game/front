import Road from "./road";

class InteractionController {
  constructor(
    canvasHeight,
    pitchDetectorRef,
    interactionPoints
  ) {
    this.canvasHeight = canvasHeight;

    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;

    this.interactionPoints = this.setInteractionPoints(interactionPoints);
  }

  setInteractionPoints(interactionPoints) {
    const points = [];

    for (const point of interactionPoints) {
      points.push(
        new Road(
          this.canvasHeight,
          this.pitchDetectorRef,
          point
        )
      );
    }

    return points;
  }

  getRoadDots(ctx, characterX, characterY) {
    const roadDots = [];

    for (const point of this.interactionPoints) {
      roadDots.push(point.draw(ctx, characterX, characterY));
    }

    return roadDots;
  }
}

export default InteractionController;
