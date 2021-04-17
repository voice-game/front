import { addEventHelper } from "../../utils/eventListHelper";

function Charactor(eventList, dots) {
  this.eventList = eventList;
  this.dots = dots;
  this.x = 40;
  this.charactorWidth = 20;
  this.charactorHeight = 20;
  this.gravity = 0;
  this.charactorMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
    isJumping: false,
    jumpHeight: 10,
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
  const maxY = this.dots[this.x] - this.charactorHeight;

  if (this.y === undefined || this.y > maxY) {
    this.y = this.dots[this.x] - this.charactorHeight;
    this.gravity = 0;
    this.charactorMove.isJumping = false;
  }

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(
    this.x,
    this.y,
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
    case this.KEY_CODE.W:
      this.charactorMove.jump = isKeyDown;
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

  if (this.charactorMove.jump && !this.charactorMove.isJumping) {
    this.charactorMove.isJumping = true;
    this.gravity -= 20;
  }

  this.y += this.gravity;
  this.gravity += 1.5;
  this.gravity *= 0.9;
};

Charactor.prototype.handleJump = function () {
};

export default Charactor;
