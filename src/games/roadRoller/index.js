import CharacterController from "./characterController";
import DotsController from "./dots";
import PitchDetectorController from "./pitchDetectorController";

function Game(ref, { pitchDetectorRef, staticDots }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetectorRef = pitchDetectorRef;
  this.staticDots = staticDots;

  this.eventList = [];

  this.dotsController = new DotsController();
  this.characterController = new CharacterController(
    this.eventList,
    this.canvas.width,
    this.canvas.height
  );
  this.pitchDetectorController = new PitchDetectorController(
    this.canvas.width,
    this.canvas.height,
    this.pitchDetectorRef
  );

  window.requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.animate = async function (timeStamp) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const dots = this.dotsController.fiilStaticDots(this.staticDots);
  this.characterController.draw(this.ctx, dots, timeStamp);

  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
};

export default Game;
