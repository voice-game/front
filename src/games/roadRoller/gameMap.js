import MapImage from "./MapImage";
import tile0 from "../../assets/image/tile/forest/tile_0.png";
import tile1 from "../../assets/image/tile/forest/tile_1.png";
import point0 from "../../assets/image/pitchPoint/point_0.png";
import point1 from "../../assets/image/pitchPoint/point_1.png";
import pad0 from "../../assets/image/tile/forest/pad_0.png";
import { IMAGE_TYPE } from "../../constants/constants";

class GameMap {
  constructor(tileSize, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;

    this.tiles = [
      new MapImage(tile0),
      new MapImage(tile1),
    ];
    this.pitchPoints = [
      point0,
      point1,
    ];
    this.pads = [
      pad0,
    ];

    this.gameMap = {
      staticDots: [],
      staticMap: [],
      interactionPoints: [],
    };

    this.fillTiles();
    this.fillInteractionPoints();
  }

  fillInteractionPoints() {
    const length = this.canvasHeight / this.tileHeight;

    this.fillInteractionPointsHelper(IMAGE_TYPE.ROAD, 0, 11, length - 2, 12, 3);
    this.fillInteractionPointsHelper(IMAGE_TYPE.ROAD, 0, 3, 4, 14, 3);

    this.fillInteractionPointsHelper(IMAGE_TYPE.PAD, 1, 38, 10, 5, 2, 12, this.pads[0]);
    this.fillInteractionPointsHelper(IMAGE_TYPE.PAD, 1, 24, 9, 5, 2, 18, this.pads[0]);
  }

  fillInteractionPointsHelper(type, index, x, y, width, height, range, pad) {
    this.gameMap.interactionPoints.push({
      type,
      pointer: {
        src: this.pitchPoints[index],
        range: this.tileWidth,
      },
      posX: x * this.tileWidth,
      posY: y * this.tileHeight,
      width: width * this.tileWidth,
      height: height * this.tileHeight,
      pad: {
        src: pad,
        range: this.tileWidth * range,
      },
    });
  }

  fillTiles() {
    const length = this.canvasHeight / this.tileHeight;

    this.fillTilesHelper(1, 0, length - 1, 1, 1, 12);

    this.fillTilesHelper(1, 24, length - 2, 1, 1);
    this.fillTilesHelper(0, 24, length - 1, 1, 1);

    this.fillTilesHelper(1, 33, length - 6, 1, 1, 4);
    this.fillTilesHelper(1, 30, length - 4, 1, 1, 2);

    this.fillTilesHelper(1, 38, length - 8, 1, 1, 1);
    this.fillTilesHelper(1, 38, length - 6, 1, 1, 1);

    this.fillTilesHelper(1, 24, length - 9, 1, 1, 2);

    this.fillTilesHelper(1, 2, length - 10, 1, 1, 4);

    this.fillTilesHelper(1, 3, 5, 1, 1, 1);
    this.fillTilesHelper(1, 2, 7, 1, 1, 1);

    this.fillTilesHelper(1, 18, 3, 1, 1, 8);
    this.fillTilesHelper(0, 18, 4, 1, 1, 8);
    this.fillTilesHelper(0, 18, 5, 1, 1, 8);
  }

  fillTilesHelper(index, x, y, width, height, length) {
    const posY = y * height * this.tileHeight;
    const myWidth = width * this.tileWidth;
    const myLength = length ? length : (this.canvasWidth - (x * myWidth)) / myWidth;

    if (index === 1) {
      for (let i = 0; i < myLength * myWidth; i++) {
        const posX = (x * myWidth) + i;

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
