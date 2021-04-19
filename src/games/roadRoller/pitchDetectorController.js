import Road from "./road";

class pitchDetectorController {
  constructor(canvasWidth, canvasHeight, pitchDetectorRef) {
    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;

    this.stage = 1;

    this.road = new Road(canvasWidth, canvasHeight, pitchDetectorRef);
  }

  handlePitchInteraction(ctx, characterCenterX) {
    switch (this.stage) {
      case 1:
        if (characterCenterX >= 140 && characterCenterX <= 180) {
          const road = this.road.draw(ctx, this.detectorReady);
          this.detectorReady = true;

          return road;
        } else {
          this.detectorReady = false;

          return;
        }
      default:
        return;
    }
  }
}

export default pitchDetectorController;
