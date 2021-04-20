import Objects from "./objects";
import CharacterController from "./characterController";
import pitchDetectorController from "./pitchDetectorController";

function Game(ref, { pitchDetectorRef }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetectorRef = pitchDetectorRef;

  this.eventList = [];

  this.pitchDetectorController = new pitchDetectorController(
    this.canvas.width,
    this.canvas.height,
    this.pitchDetectorRef
  );
  this.objects = new Objects(this.canvas.width, this.canvas.height);
  this.characterController = new CharacterController(this.eventList);

  this.animate();
}

Game.prototype.animate = async function (timeStamp) {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const pitchDots = this.pitchDetectorController.handlePitchInteraction(
    this.ctx,
    this.characterController.characterCenterX
  );
  const dots = this.objects.draw(this.ctx, pitchDots);
  this.characterController.draw(this.ctx, dots, timeStamp);
};

export default Game;
