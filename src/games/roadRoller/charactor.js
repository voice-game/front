import { addEventHelper } from "../../utils/eventListHelper";

function Charactor(eventList, dots, x, y) {
  this.eventList = eventList;
  this.dots = dots;
  this.x = x;
  this.y = y;
  this.charactorWidth = 20;
  this.charactorHeight = 20;
  this.charactorMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
  };
  this.KEY_CODE = {
    A: 65,
    D: 68,
    W: 87,
  };

  addEventHelper(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
  addEventHelper(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
}

Charactor.prototype.draw = function (ctx) {
  ctx.fillStyle = "#0095DD";
  ctx.fillRect(
    this.x,
    this.dots[this.x] - this.charactorHeight,
    this.charactorWidth,
    this.charactorHeight
  );
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
      if (this.dots[this.x - 1]) {
        this.x -= this.charactorMove.speed;
      }
    }

    if (this.charactorMove.right) {
      if (this.dots[this.x + this.charactorWidth + 1]) {
        this.x += this.charactorMove.speed;
      }
    }
};

export default Charactor;
