import mapList from "./mapList";
import MapImage from "./MapImage";

import tile0 from "../../assets/image/tiles/1.png";
import tile1 from "../../assets/image/tiles/2.png";
import point0 from "../../assets/image/pitchPoint/point_0.png";
import point1 from "../../assets/image/pitchPoint/point_1.png";
import pad0 from "../../assets/image/pads/1.png";

class GameMap {
  constructor(tileSize, canvasWidth, canvasHeight, currentMap) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;

    this.tiles = [new MapImage(tile0), new MapImage(tile1)];

    this.pitchPoints = [point0, point1];
    this.pads = [pad0];

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

  fillInteractionPointsHelper(type, pointIndex, x, y, width, height, range, padIndex) {
    this.gameMap.interactionPoints.push({
      type,
      pointer: {
        src: this.pitchPoints[pointIndex],
        range: this.tileWidth,
      },
      posX: x * this.tileWidth,
      posY: y * this.tileHeight,
      width: width * this.tileWidth,
      height: height * this.tileHeight,
      pad: {
        src: this.pads[padIndex],
        range: this.tileWidth * range,
      },
    });
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
        img: this.tiles[index],
        posX,
        posY,
        width: myWidth,
        height: this.tileHeight,
      });
    }
  }
}

export default GameMap;
