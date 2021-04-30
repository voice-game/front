import Road from "./Road";
import { IMAGE_TYPE } from "../../constants/constants";
import Pad from "./Pad";
import Portal from "./Portal";
import Obstacle from "./Obstacle";

class InteractionController {
  constructor(
    canvasHeight,
    pitchDetectorRef,
    interactions,
    images,
  ) {
    this.canvasHeight = canvasHeight;

    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;

    this.images = images;

    this.interactions = this.setInteractions(interactions);
  }

  setInteractions(interactions) {
    const points = {
      [IMAGE_TYPE.PAD]: [],
      [IMAGE_TYPE.ROAD]: [],
      [IMAGE_TYPE.OBSTACLE]: [],
    };

    for (const point of interactions) {
      switch (point.type) {
        case IMAGE_TYPE.ROAD:
          points[IMAGE_TYPE.ROAD].push(
            new Road(
              this.canvasHeight,
              this.pitchDetectorRef,
              point,
              this.images,
            )
          );

          break;
        case IMAGE_TYPE.PAD:
          points[IMAGE_TYPE.PAD].push(
            new Pad(
              this.pitchDetectorRef,
              point,
              this.images,
            )
          );

          break;
        case IMAGE_TYPE.OBSTACLE:
          points[IMAGE_TYPE.OBSTACLE].push(
            new Obstacle(point)
          );

          break;
        case IMAGE_TYPE.PORTAL:
          points[IMAGE_TYPE.PORTAL] = new Portal(point, this.images.portal);

          break;
        default:
          break;
      }
    }

    return points;
  }

  getRoadDots(ctx, characterX, characterY) {
    const roadDots = [];

    for (const road of this.interactions[IMAGE_TYPE.ROAD]) {
      roadDots.push(road.draw(ctx, characterX, characterY));
    }

    return roadDots;
  }

  getPadDots(ctx, characterController) {
    const padDots = [];

    for (const pad of this.interactions[IMAGE_TYPE.PAD]) {
      padDots.push(pad.draw(ctx, characterController));
    }

    return padDots;
  }

  drawObstacle(ctx, characterController) {
    for (const obstacle of this.interactions[IMAGE_TYPE.OBSTACLE]) {
      obstacle.draw(ctx, characterController);
    }
  }

  drawPortal(ctx, characterController, timeStamp, getNextMap) {
    this.interactions[IMAGE_TYPE.PORTAL].draw(ctx, characterController, timeStamp, getNextMap);
  }
}

export default InteractionController;
