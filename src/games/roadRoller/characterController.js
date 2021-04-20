import { addEventHelper } from "../../utils/eventListHelper";
import Character from "./character";

function CharacterController(eventList) {
  this.eventList = eventList;

  this.x = 40;

  this.gravity = 0;
  this.characterMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
    isJumping: false,
    jumpHeight: 20,
  };
  this.KEY_CODE = {
    A: 65,
    D: 68,
    W: 87,
  };

  this.characters = new Character();

  addEventHelper(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
  addEventHelper(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
}

CharacterController.prototype.draw = function (ctx, dots, timeStamp) {
  this.characterCenterX = this.x + this.characters.characterWidthHalf;
  this.maxY = dots[this.characterCenterX] - this.characters.characterHeight;

  if (this.y === undefined || this.y >= this.maxY) {
    this.y = this.maxY;
    this.characterMove.isJumping = false;
    this.gravity = 0;
  }

  this.characters.draw(ctx, this.x, this.y, timeStamp);
  this.handleCharacterMovement(dots);
};

CharacterController.prototype.handleKeyEvent = function (event) {
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

      break;
    default:
      break;
  }
}

CharacterController.prototype.handleCharacterMovement = function (dots) {
  if (this.characterMove.left) {
    if (dots[this.x - this.characterMove.speed]) {
      this.x -= this.characterMove.speed;
    }
  }

  if (this.characterMove.right) {
    if (dots[this.x + this.characters.characterWidth]) {
      this.x += this.characterMove.speed;
    }
  }

  if (this.characterMove.jump && !this.characterMove.isJumping) {
    this.characterMove.isJumping = true;
    this.gravity -= this.characterMove.jumpHeight;
  }

  if (this.gravity) {
    this.y += Math.floor(this.gravity);
  }

  this.gravity += 1.5;
  this.gravity *= 0.9;
};

export default CharacterController;
