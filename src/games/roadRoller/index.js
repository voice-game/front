import Background from "./background";
import Charactor from "./charactor";

function Game(ref) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.eventList = [];
  this.dots = new Array(this.canvas.width);
  this.backGround = new Background(this.canvas.width, this.canvas.height);
  this.charactor = new Charactor(this.eventList, 20, this.canvas.height);

  this.animate();
}

Game.prototype.animate = function () {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.beginPath();
  this.backGround.draw(this.ctx);
  this.charactor.draw(this.ctx);
  this.ctx.closePath();
};

export default Game;
