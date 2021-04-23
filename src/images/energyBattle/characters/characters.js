import character1Cast from "./energyBattle_character_1_cast.png";
import character1Idle from "./energyBattle_character_1_idle.png";
import character1Lose from "./energyBattle_character_1_lose.png";
import character2Cast from "./energyBattle_character_2_cast.png";
import character2Idle from "./energyBattle_character_2_idle.png";
import character2Lose from "./energyBattle_character_2_lose.png";
import skillFire from "./energyBattle_skill_fire.png";
import skillIce from "./energyBattle_skill_ice.png";
import skillComet from "./energyBattle_skill_comet.png";

const CHARACTERS = {
  myCharacter: {
    idle: character1Idle,
    cast: character1Cast,
    lose: character1Lose,
  },
  otherCharacter: {
    idle: character2Idle,
    cast: character2Cast,
    lose: character2Lose,
  },
  skillEffect: {
    fire: skillFire,
    ice: skillIce,
    comet: skillComet,
  },
};

export default CHARACTERS;
