import Road from "./Road";
import { IMAGE_TYPE } from "../../constants/constants";
import Pad from "./Pad";

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
    const points = {
      [IMAGE_TYPE.ROAD]: [],
      [IMAGE_TYPE.PAD]: [],
    };

    for (const point of interactionPoints) {
      if (point.type === IMAGE_TYPE.ROAD) {
        points[IMAGE_TYPE.ROAD].push(
          new Road(
            this.canvasHeight,
            this.pitchDetectorRef,
            point
          )
        );

        continue;
      }

      if (point.type === IMAGE_TYPE.PAD) {
        points[IMAGE_TYPE.PAD].push(
          new Pad(
            this.pitchDetectorRef,
            point
          )
        );
      }
    }

    return points;
  }

  getRoadDots(ctx, characterX, characterY) {
    const roadDots = [];

    for (const point of this.interactionPoints[IMAGE_TYPE.ROAD]) {
      roadDots.push(point.draw(ctx, characterX, characterY));
    }

    return roadDots;
  }

  getPadDots(ctx, characterController) {
    const padDots = [];

    for (const point of this.interactionPoints[IMAGE_TYPE.PAD]) {
      padDots.push(point.draw(ctx, characterController));
    }

    return padDots;
  }
}

export default InteractionController;
