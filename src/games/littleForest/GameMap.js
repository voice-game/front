import mapList from "./mapList";

import portal from "../../images/littleForest/portals/0.png";
import { IMAGE_TYPE } from "../../constants/constants";

class GameMap {
  constructor(tileSize, canvasWidth, canvasHeight, currentMap) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;

    this.portal = portal;

    this.gameMap = {
      staticDots: [],
      staticMap: [],
      interactionPoints: [],
    };

    this.currentMap = currentMap;

    this.fillTiles();
    this.fillInteractionPoints();
  }

  fillInteractionPoints() {
    for (const interactionPoint of mapList[this.currentMap].interactionPoints) {
      this.fillInteractionPointsHelper(...interactionPoint);
    }
  }

  fillInteractionPointsHelper(type, x, y, width, height, range, pointIndex, padIndex) {
    const point = {
      type,
      posX: x * this.tileWidth,
      posY: y * this.tileHeight,
      width: width * this.tileWidth,
      height: height * this.tileHeight,
    };

    switch (type) {
      case IMAGE_TYPE.ROAD:
        point.pointer = {
          index: pointIndex,
          range: this.tileWidth * range,
        };

        break;
      case IMAGE_TYPE.PAD:
        point.pointer = {
          index: pointIndex,
          range: this.tileWidth,
        };
        point.pad = {
          index: padIndex,
          range: this.tileWidth * range,
        };

        break;
      case IMAGE_TYPE.PORTAL:
        point.pointer = {
          range: 64,
        };

        break;
      default:
        break;
    }

    this.gameMap.interactionPoints.push(point);
  }

  fillTiles() {
    for (const tile of mapList[this.currentMap].tiles) {
      this.fillTilesHelper(...tile);
    }
  }

  fillTilesHelper(type, index, x, y, width, height, length) {
    const posY = y * height * this.tileHeight;
    const myWidth = width * this.tileWidth;
    const myLength = length
      ? length
      : (this.canvasWidth - x * myWidth) / myWidth;

    if (index === 1) {
      for (let i = 0; i < myLength * myWidth; i++) {
        const posX = x * myWidth + i;

        if (this.gameMap.staticDots[posX]) {
          this.gameMap.staticDots[posX].push(posY);
        } else {
          this.gameMap.staticDots[posX] = [posY];
        }

        this.gameMap.staticDots[posX].sort((a, b) => a - b);
      }
    }

    for (let i = 0; i < myLength; i++) {
      const posX = (x + i) * myWidth;

      this.gameMap.staticMap.push({
        type,
        index,
        posX,
        posY,
        width: myWidth,
        height: this.tileHeight,
      });
    }
  }
}

export default GameMap;
