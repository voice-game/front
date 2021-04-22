import CharacterController from "./characterController";
import PitchDetectorController from "./pitchDetectorController";
import GameMap from "./gameMap";
import Dots from "./dots";

function Game(ref, { pitchDetectorRef, staticDots }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetectorRef = pitchDetectorRef;
  this.staticDots = staticDots;
console.log(staticDots)
  this.eventList = [];

  this.dots = new Dots(this.canvas.width, this.canvas.height);
  this.pitchDetectorController = new PitchDetectorController(
    this.canvas.width,
    this.canvas.height,
    this.pitchDetectorRef
  );
  this.characterController = new CharacterController(
    this.eventList,
    this.canvas.width,
    this.canvas.height
  );

  this.animate();
}

Game.prototype.animate = async function (timeStamp) {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const dots = this.staticDots;
  this.characterController.draw(this.ctx, dots, timeStamp);
};

export default Game;
