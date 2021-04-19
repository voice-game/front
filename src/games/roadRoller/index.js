import Objects from "./objects";
import Character from "./character";
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
  this.character = new Character(this.eventList);

  this.animate();
}

Game.prototype.animate = async function () {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const pitchDots = this.pitchDetectorController.handlePitchInteraction(this.ctx, this.character.characterCenterX);
  const dots = this.objects.draw(this.ctx, pitchDots);
  this.character.draw(this.ctx, dots);
};

export default Game;
