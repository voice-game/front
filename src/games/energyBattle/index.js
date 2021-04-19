function Canvas(ref) {
  this.canvas = ref.current;
  this.ctx = this.canvas.getContext("2d");
  this.x = 20;
  this.y = this.canvas.height;
  this.eventList = [];

  this.draw();
  window.addEventListener("keydown", this.keyEvent.bind(this), false);
  // should remove this event after unmount
}

Canvas.prototype.draw = function () {
  this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.beginPath();
  this.drawRocks();
  this.drawCharactor();
  this.ctx.fill();
  this.ctx.closePath();
};

Canvas.prototype.drawRocks = function () {
  const x = this.canvas.width;
  const y = this.canvas.height;

  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0, y - 200, 200, 200);
  this.ctx.fillRect(x - 200, y - 200, 200, 200);
};

Canvas.prototype.drawCharactor = function () {
  this.ctx.fillStyle = "#0095DD";
  this.ctx.fillRect(this.x, this.y - 220, 20, 20);
};

Canvas.prototype.keyEvent = function (e) {
  const KEY_CODE = {
    D: 68,
    A: 65,
  };
  const MOVE_POINT = 3;

  switch (e.keyCode) {
    case KEY_CODE.D:
      this.x += MOVE_POINT;
      break;
    case KEY_CODE.A:
      this.x -= MOVE_POINT;
      break;
    default:
      break;
  }
};

export default Canvas;
