import CharacterController from "./characterController";
import pitchDetectorController from "./pitchDetectorController";
import gameMap from "./gameMap";
import Dots from "./dots";

function Game(ref, { pitchDetectorRef }) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.pitchDetectorRef = pitchDetectorRef;

  this.eventList = [];

  this.gameMap = new gameMap(this.canvas.width, this.canvas.height);
  this.dots = new Dots(this.canvas.width, this.canvas.height);
  this.pitchDetectorController = new pitchDetectorController(
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

  const gameDots = this.dots.createEmptyDots();
  this.gameMap.draw(this.ctx, gameDots);
  this.characterController.draw(this.ctx, gameDots, timeStamp);
};

export default Game;
