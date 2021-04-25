import cyclops from "./cyclops.png";
import dagger from "./dagger.png";
import dionaea from "./dionaea.png";
import witch from "./witch.png";
import leftTree from "./leftTree.png";
import rightTree from "./rightTree.png";
import hill from "./hill.png";
import house from "./house.png";
import light from "./light.png";
import tomb from "./tomb.png";
import fence from "./fence.png";
import spider from "./spider.png";

const OBSTACLES = {
  enemy: {
    cyclops,
    dagger,
    dionaea,
    witch,
  },
  ground: {
    leftTree,
    rightTree,
    hill,
    house,
    light,
    tomb,
    fence,
  },
  celing: {
    spider,
  },
};

export default OBSTACLES;
