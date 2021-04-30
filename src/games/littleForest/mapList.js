import { IMAGE_TYPE } from "../../constants/constants";

const mapList = [
  {
    tiles: [
      [IMAGE_TYPE.TILE, 1, 0, 18, 1, 1, 12],
      [IMAGE_TYPE.TILE, 0, 24, 18, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 17, 1, 1],
      [IMAGE_TYPE.TILE, 1, 30, 15, 1, 1, 2],
      [IMAGE_TYPE.TILE, 1, 33, 13, 1, 1, 4],
      [IMAGE_TYPE.TILE, 1, 38, 13, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 38, 11, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 10, 1, 1, 2],
      [IMAGE_TYPE.TILE, 1, 2, 9, 1, 1, 4],
      [IMAGE_TYPE.TILE, 1, 3, 5, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 2, 7, 1, 1, 1],
      [IMAGE_TYPE.TILE, 0, 18, 5, 1, 1, 8],
      [IMAGE_TYPE.TILE, 0, 18, 4, 1, 1, 8],
      [IMAGE_TYPE.TILE, 1, 18, 3, 1, 1, 8],
    ],
    interactionPoints: [
      [IMAGE_TYPE.ROAD, 11, 17, 12, 3, 1, 0],
      [IMAGE_TYPE.ROAD, 3, 4, 14, 3, 1, 0],
      [IMAGE_TYPE.PAD, 38, 10, 5, 2, 12, 1, 0],
      [IMAGE_TYPE.PAD, 24, 9, 5, 2, 18, 1, 0],
      [IMAGE_TYPE.OBSTACLE, 3, 3, 1, 1, 10],
      [IMAGE_TYPE.PORTAL, 25, 14, 3, 3],
    ],
  },
];

export default mapList;
