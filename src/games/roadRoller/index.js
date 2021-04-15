function Game(ref) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.x = this.canvas.width;
  this.y = this.canvas.height;

  this.draw();
}

Game.prototype.draw = function () {
  requestAnimationFrame(this.draw.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.beginPath();
  this.drawRocks();
  this.drawCharactor();
  this.ctx.fill();
  this.ctx.closePath();
};

Game.prototype.drawRocks = function () {
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, this.y - 200, 200, 200);
  this.ctx.fillRect(this.x - 200, this.y - 200, 200, 200);
};

Game.prototype.drawCharactor = function () {
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillRect(20, this.y - 220, 20, 20);
};

export default Game;
