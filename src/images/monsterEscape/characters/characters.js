import bat from "./bat.png";
import batCollision from "./batCollision.png";
import batDead from "./batDead.png";
import goblin from "./goblin.png";
import goblinCollision from "./goblinCollision.png";
import goblinDead from "./goblinDead.png";

const CHARACTERS = {
  bat: {
    normal: bat,
    collision: batCollision,
    dead: batDead,
  },
  goblin: {
    normal: goblin,
    collision: goblinCollision,
    dead: goblinDead,
  }
};

export default CHARACTERS;
