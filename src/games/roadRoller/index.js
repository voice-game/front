import Objects from "./objects";
import Character from "./character";
import Road from "./road";

function Game(ref, { pitchDetector }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetector = pitchDetector;
  this.eventList = [];
  this.objects = new Objects(this.canvas);
  this.character = new Character(this.eventList);
  this.road = new Road(this.canvas, this.pitchDetector);
  this.stage = 1;

  this.animate();
}

Game.prototype.animate = async function () {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
  this.switchAudio();

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const currentRoad = this.road.draw(this.ctx);
  const dots = this.objects.draw(this.ctx, currentRoad);
  this.character.draw(this.ctx, dots);
};

Game.prototype.switchAudio = function () {
  switch (this.stage) {
    case 1:
      const charactorCenter = this.character.x + (this.character.characterWidth / 2);

      if (charactorCenter >= 140 && charactorCenter <= 180) {
        this.road.isReady = true;
      } else {
        this.road.isReady = false;
      }

      break;
    default:
      break;
  }
};

export default Game;
