function GameMap(type, canvasWidth, canvasHeight, images) {
  this.type = type;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.images = images;
}

GameMap.prototype.generatePoint = function (type, posX, posY, width, image) {
  const height = width * (image.height / image.width);

  return {
    posX: posX,
    posY: type === "onGround" ? this.canvasHeight - height : posY,
    width: width,
    height: height,
    image: image,
  };
};

GameMap.prototype.setGameMap = function (
  type,
  total,
  posYMap,
  widthMap,
  imageMap,
) {
  const gap = this.canvasWidth * (1 / (total - 2));
  const posY = this.canvasHeight;
  const images = this.images;
  const width = this.canvasWidth;

  const gameMap = imageMap.map((image, index) => {
    return this.generatePoint(
      type,
      (index - 1) * gap,
      posYMap[index] * posY,
      widthMap[index] * width,
      images[imageMap[index]],
    );
  });

  this.gameMap = gameMap;
};

export default GameMap;
