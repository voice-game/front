import { IMAGE_TYPE } from "../../constants/constants";
import Road from "./Road";

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
      switch (point.type) {
        case IMAGE_TYPE.ROAD:
          points.push(
            new Road(
              this.canvasHeight,
              this.pitchDetectorRef,
              point
            )
          );
          break;
        case IMAGE_TYPE.PAD:
          break;
        default:
          break;
      }
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
