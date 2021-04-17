import { addEventHelper } from "../../utils/eventListHelper";

function Character(eventList) {
  this.eventList = eventList;
  this.x = 40;
  this.characterWidth = 20;
  this.characterHeight = 20;
  this.gravity = 0;
  this.characterMove = {
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

Character.prototype.draw = function (ctx, dots) {
  const maxY = dots[this.x] - this.characterHeight;

  if (this.y === undefined || this.y > maxY) {
    this.y = dots[this.x] - this.characterHeight;
    this.gravity = 0;
    this.characterMove.isJumping = false;
  }

  ctx.fillStyle = "#0095DD";
  ctx.fillRect(
    this.x,
    this.y,
    this.characterWidth,
    this.characterHeight
  );
  this.handleCharacterMovement(dots);
};

Character.prototype.handleKeyEvent = function (event) {
  const isKeyDown = event.type === "keydown" ? true : false;

  switch (event.keyCode) {
    case this.KEY_CODE.A:
      this.characterMove.left = isKeyDown;
      break;
    case this.KEY_CODE.D:
      this.characterMove.right = isKeyDown;
      break;
    case this.KEY_CODE.W:
      this.characterMove.jump = isKeyDown;
    default:
      break;
  }
}

Character.prototype.handleCharacterMovement = function (dots) {
  if (this.characterMove.left) {
    if (dots[this.x - 1]) {
      this.x -= this.characterMove.speed;
    }
  }

  if (this.characterMove.right) {
    if (dots[this.x + this.characterWidth + 1]) {
      this.x += this.characterMove.speed;
    }
  }

  if (this.characterMove.jump && !this.characterMove.isJumping) {
    this.characterMove.isJumping = true;
    this.gravity -= 20;
  }

  this.y += this.gravity;
  this.gravity += 1.5;
  this.gravity *= 0.9;
};

export default Character;
