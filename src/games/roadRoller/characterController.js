import { addEventHelper } from "../../utils/eventListHelper";
import Character from "./character";

function CharacterController(eventList) {
  this.eventList = eventList;

  this.x = 20;

  this.isImgChanged = false;
  this.gravity = 0;
  this.characterMove = {
    left: false,
    right: false,
    jump: false,
    speed: 2,
    isJumping: false,
    jumpHeight: 20,
    direction: "right",
  };
  this.KEY_CODE = {
    A: 65,
    D: 68,
    W: 87,
  };

  this.character = new Character();

  addEventHelper(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
  addEventHelper(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
}

CharacterController.prototype.draw = function (ctx, dots, timeStamp) {
  this.characterCenterX = this.x + this.character.characterWidthHalf;
  this.maxY = dots[this.characterCenterX] - this.character.characterHeight;

  if (this.y === undefined || this.y >= this.maxY) {
    this.y = this.maxY;
    this.characterMove.isJumping = false;
    this.gravity = 0;
  }

  this.handleCharacterMovement(dots);
  this.character.draw(ctx, this.x, this.y, timeStamp);
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
};

CharacterController.prototype.handleCharacterMovement = function (dots) {
  this.handleCharacterImage();

  if (this.characterMove.left) {
    if (dots[this.x - this.characterMove.speed]) {
      this.x -= this.characterMove.speed;
    }
  }

  if (this.characterMove.right) {
    if (dots[this.x + this.character.characterWidth]) {
      this.x += this.characterMove.speed;
    }

    this.characterMove.direction = "right";
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

CharacterController.prototype.handleCharacterImage = function () {
  const currentImg = this.character.currentImg;

  if (this.characterMove.left) {
    this.character.currentImg = this.character.imgList.walking;
    this.handleCurrentFrame(currentImg);
    this.character.isFlipped = true;
    return;
  }

  if (this.characterMove.right) {
    this.character.currentImg = this.character.imgList.walking;
    this.handleCurrentFrame(currentImg);
    this.character.isFlipped = false;
    return;
  }

  this.character.currentImg = this.character.imgList.idle;
  this.handleCurrentFrame(currentImg);
};

CharacterController.prototype.handleCurrentFrame = function (currentImg) {
  if(currentImg !== this.character.currentImg) {
    this.character.currentFrame = 0;
  }
}

export default CharacterController;
