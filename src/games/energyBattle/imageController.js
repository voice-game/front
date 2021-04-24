import cast from "../../images/energyBattle/characters/energyBattle_character_1_cast.png";
import idle from "../../images/energyBattle/characters/energyBattle_character_1_idle.png";

const createImageInfo = (width, height, totalFrame, src) => {
  return {
    width,
    height,
    totalFrame,
    src,
  };
};

export const imageController = (imageList) => {
  return {
    idle: createImageInfo(100, 100, 11, idle),
    cast: createImageInfo(100, 100, 11, cast),
    // win: createImageInfo(400, 320, 24, idle),
    // lose: createImageInfo(400, 320, 24, idle),
  };
};
