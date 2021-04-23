import MapImage from "./mapImage";
import tile0 from "../../assets/image/tile/forest/tile_0.png";
import tile1 from "../../assets/image/tile/forest/tile_1.png";
import point0 from "../../assets/image/pitchPoint/point_0.png";

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
      new MapImage(point0),
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

    this.fillInteractionPointsHelper(0, 15, length - 2, 8, 5);
  }

  fillInteractionPointsHelper(index, x, y, width, height) {
    this.gameMap.interactionPoints.push({
      img: this.pitchPoints[index],
      posX: x * this.tileWidth,
      posY: y * this.tileHeight,
      width: width * this.tileWidth,
      height: height * this.tileHeight,
      range: this.tileWidth,
    });
  }

  fillTiles() {
    const length = this.canvasHeight / this.tileHeight;

    this.fillTilesHelper(1, 0, length - 1, this.tileWidth, this.tileHeight, 16);

    this.fillTilesHelper(1, 24, length - 2, this.tileWidth, this.tileHeight);
    this.fillTilesHelper(0, 24, length - 1, this.tileWidth, this.tileHeight);

    this.fillTilesHelper(1, 32, length - 6, this.tileWidth, this.tileHeight, 4);
    this.fillTilesHelper(1, 30, length - 4, this.tileWidth, this.tileHeight, 2);

    this.fillTilesHelper(1, 38, length - 12, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 38, length - 10, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 38, length - 8, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 38, length - 6, this.tileWidth, this.tileHeight, 1);

    this.fillTilesHelper(1, 33, length - 10, this.tileWidth, this.tileHeight, 3);
    this.fillTilesHelper(0, 33, length - 9, this.tileWidth, this.tileHeight, 3);

    this.fillTilesHelper(1, 34, length - 14, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 34, length - 12, this.tileWidth, this.tileHeight, 1);

    this.fillTilesHelper(1, 24, length - 9, this.tileWidth, this.tileHeight, 2);
    this.fillTilesHelper(1, 17, length - 9, this.tileWidth, this.tileHeight, 4);
    this.fillTilesHelper(0, 17, length - 8, this.tileWidth, this.tileHeight, 4);
    this.fillTilesHelper(1, 26, length - 7, this.tileWidth, this.tileHeight, 1);

    this.fillTilesHelper(1, 2, length - 10, this.tileWidth, this.tileHeight, 4);

    this.fillTilesHelper(1, 2, 3, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 2, 5, this.tileWidth, this.tileHeight, 1);
    this.fillTilesHelper(1, 2, 7, this.tileWidth, this.tileHeight, 1);

    this.fillTilesHelper(1, 8, 2, this.tileWidth, this.tileHeight, 5);
    this.fillTilesHelper(0, 8, 3, this.tileWidth, this.tileHeight, 5);

    this.fillTilesHelper(1, 18, 3, this.tileWidth, this.tileHeight, 8);
    this.fillTilesHelper(0, 18, 4, this.tileWidth, this.tileHeight, 8);
    this.fillTilesHelper(0, 18, 5, this.tileWidth, this.tileHeight, 8);
  }

  fillTilesHelper(index, x, y, width, height, length) {
    const posY = y * height;
    const myLength = length ? length : (this.canvasWidth - (x * width)) / width;

    if (index === 1) {
      for (let i = 0; i < myLength * width; i++) {
        const posX = (x * width) + i;

        if (this.gameMap.staticDots[posX]) {
          this.gameMap.staticDots[posX].push(posY);
        } else {
          this.gameMap.staticDots[posX] = [posY];
        }

        this.gameMap.staticDots[posX].sort((a, b) => a - b);
      }
    }

    for (let i = 0; i < myLength; i++) {
      const posX = (x + i) * width;

      this.gameMap.staticMap.push({
        img: this.tiles[index],
        posX,
        posY,
        width,
        height,
      });
    }
  }
}

export default GameMap;
