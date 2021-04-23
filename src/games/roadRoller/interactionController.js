import Road from "./road";

class InteractionController {
  constructor(
    pitchDetectorRef,
    interactionPoints
  ) {
    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;

    this.interactionPoints = this.setInteractionPoints(interactionPoints);
  }

  setInteractionPoints(interactionPoints) {
    const points = [];

    for (const point of interactionPoints) {
      points.push(
        new Road(
          this.pitchDetectorRef,
          point
        )
      );
    }

    return points;
  }

  getRoadDots(ctx, characterX, characterY) {
    for (const point of this.interactionPoints) {
      return point.draw(ctx, characterX, characterY);
    }
  }

  // handlePitchInteraction(ctx, characterCenterX) {
  //   if (characterCenterX >= 140 && characterCenterX <= 180) {
  //     const roadDots = this.road.draw(ctx, this.detectorReady);
  //     this.detectorReady = true;

  //     return roadDots;
  //   } else {
  //     this.detectorReady = false;

  //     return this.road.roadDots;
  //   }
  // }
}

export default InteractionController;
