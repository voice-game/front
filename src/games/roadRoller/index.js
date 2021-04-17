import Background from "./background";
import Character from "./character";

function Game(ref) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.eventList = [];
  this.backGround = new Background(this.canvas.width, this.canvas.height);
  this.character = new Character(this.eventList, this.dots);

  this.animate();
}

Game.prototype.animate = function () {
  this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.beginPath();

  const dots = this.backGround.draw(this.ctx);
  this.character.draw(this.ctx, dots);

  this.ctx.closePath();
};

export default Game;
