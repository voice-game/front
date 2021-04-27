import idle from "../../assets/image/characters/hedgehog/idle.png";
import walking from "../../assets/image/characters/hedgehog/walking.png";

const createImageInfo = (width, height, totalFrame, src) => {
  return {
    width,
    height,
    totalFrame,
    src
  };
};

export const imageController = (imageList) => {
  return {
    idle: createImageInfo(400, 320, 24, idle),
    walking: createImageInfo(400, 320, 18, walking),
  };
};
