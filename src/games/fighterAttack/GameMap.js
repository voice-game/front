function GameMap(type, canvasWidth, canvasHeight, images) {
  this.type = type;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.images = images;
}

GameMap.prototype.generatePoint = function (type, posX, posY, height, image) {
  const width = height * (image.width / image.height);

  let calibratedPosY = width * (image.height / image.width);

  if (type === "onGround") {
    calibratedPosY = this.canvasHeight - height;
  } else if (type === "onCeiling") {
    calibratedPosY = 0;
  } else {
    calibratedPosY = posY;
  }

  return {
    posX: posX,
    posY: calibratedPosY,
    width: width,
    height: height,
    image: image,
  };
};

GameMap.prototype.setGameMap = function (
  type,
  total,
  posYMap,
  heightMap,
  imageMap,
) {
  const gap = this.canvasWidth * (1 / (total - 2));
  const posY = this.canvasHeight;
  const images = this.images;
  const height = this.canvasHeight;

  const gameMap = imageMap.map((image, index) => {
    return this.generatePoint(
      type,
      (index - 1) * gap,
      posYMap[index] * posY,
      heightMap[index] * height,
      images[imageMap[index]],
    );
  });

  this.gameMap = gameMap;
};

// GameMap.prototype.setGameMap = function (
//   type,
//   total,
//   posYMap,
//   widthMap,
//   imageMap,
// ) {
//   const gap = this.canvasWidth * (1 / (total - 2));
//   const posY = this.canvasHeight;
//   const images = this.images;
//   const width = this.canvasWidth;

//   const gameMap = imageMap.map((image, index) => {
//     return this.generatePoint(
//       type,
//       (index - 1) * gap,
//       posYMap[index] * posY,
//       widthMap[index] * width,
//       images[imageMap[index]],
//     );
//   });

//   this.gameMap = gameMap;
// };

export default GameMap;