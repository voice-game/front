import { addEventHelper } from "../../utils/eventListHelper";

function Charactor(eventList, x, y) {
  this.eventList = eventList;
  this.x = x;
  this.y = y;
  this.charactorMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
  };
  this.KEY_CODE = {
    A: 65,
    D: 68,
  };

  addEventHelper(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
  addEventHelper(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
}

Charactor.prototype.draw = function (ctx) {
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(this.x, this.y - 220, 20, 20);
  this.moveCharactor();
};

Charactor.prototype.handleKeyEvent = function (event) {
  const isKeyDown = event.type === "keydown" ? true : false;

  switch (event.keyCode) {
    case this.KEY_CODE.A:
      this.charactorMove.left = isKeyDown;
      break;
    case this.KEY_CODE.D:
      this.charactorMove.right = isKeyDown;
      break;
    default:
      break;
  }
}

Charactor.prototype.moveCharactor = function () {
  if (this.charactorMove.left) {
    this.x -= this.charactorMove.speed;
  }

  if (this.charactorMove.right) {
    this.x += this.charactorMove.speed;
  }
};

Charactor.prototype.handleJumping = function () {
  if (!this.charactorMove.jump) {
    this.charactorMove.jump = true;
  }
};

export default Charactor;
