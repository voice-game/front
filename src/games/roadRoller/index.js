import CharacterController from "./characterController";
import DotsController from "./dots";
import InteractionController from "./interactionController";

function Game(ref, { pitchDetectorRef, staticDots, interactionPoints }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.width = this.canvas.width;
  this.height = this.canvas.height;

  this.staticDots = staticDots;

  this.eventList = [];

  this.dotsController = new DotsController();
  this.characterController = new CharacterController(
    this.eventList,
    this.width,
    this.height,
  );
  this.interactionController = new InteractionController(
    this.height,
    pitchDetectorRef,
    interactionPoints,
  );

  window.requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.animate = async function (timeStamp) {
  this.ctx.clearRect(0, 0, this.width, this.height);

  this.characterX = this.characterController.characterCenterX;
  this.characterY = this.characterController.posY;

  const dots = this.dotsController.fiilStaticDots(this.staticDots);
  const roadDots = this.interactionController.getRoadDots(this.ctx, this.characterX, this.characterY);

  this.dotsController.fillRoadDots(this.ctx, dots, roadDots);
  this.characterController.draw(this.ctx, dots, timeStamp);

  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
};

export default Game;
