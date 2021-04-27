import Road from "./Road";
import { IMAGE_TYPE } from "../../constants/constants";
import Pad from "./Pad";
import Portal from "./Portal";

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
      [IMAGE_TYPE.PAD]: [],
      [IMAGE_TYPE.ROAD]: [],
    };

    for (const point of interactionPoints) {
      switch (point.type) {
        case IMAGE_TYPE.ROAD:
          points[IMAGE_TYPE.ROAD].push(
            new Road(
              this.canvasHeight,
              this.pitchDetectorRef,
              point
            )
          );

          break;
        case IMAGE_TYPE.PAD:
          points[IMAGE_TYPE.PAD].push(
            new Pad(
              this.pitchDetectorRef,
              point
            )
          );

          break;
        case IMAGE_TYPE.PORTAL:
          points[IMAGE_TYPE.PORTAL] = new Portal(point);

          break;
        default:
          break;
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

  drawPortal(ctx, characterController) {
    this.interactionPoints[IMAGE_TYPE.PORTAL].draw(ctx, characterController);
  }
}

export default InteractionController;
