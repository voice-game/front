import { addEventHelper } from "../../utils/eventListHelper";
import Character from "./Character";
import pickRandom from "../../utils/pickRandom";

class CharacterController {
  constructor(eventList, canvasWidth, canvasHeight, images) {
    this.eventList = eventList;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images.characters;

    this.initialX = 1050;
    this.initialY = 100;
    this.posX = this.initialX;
    this.posY = this.initialY;

    this.isImgChanged = false;
    this.gravity = 0;
    this.characterMove = {
      left: false,
      right: false,
      jump: false,
      speed: 3,
      isJumping: false,
      jumpHeight: 20,
      direction: "right",
    };
    this.KEY_CODE = {
      A: 65,
      D: 68,
      W: 87,
    };

    this.character = new Character(pickRandom(this.images));

    addEventHelper(
      this.eventList,
      window,
      "keydown",
      this.handleKeyEvent.bind(this)
    );
    addEventHelper(
      this.eventList,
      window,
      "keyup",
      this.handleKeyEvent.bind(this)
    );
  }

  draw(ctx, dots, timeStamp) {
    this.characterCenterX = this.posX + (this.character.width / 2);

    if (this.canvasHeight < this.posY - this.character.height) {
      this.posX = this.initialX;
      this.posY = this.initialY;
    }

    if (!this.maxY) {
      this.maxY = this.getMaxY(dots, this.characterCenterX);
    }

    if (this.maxY <= this.posY) {
      this.posY = this.maxY;
      this.characterMove.isJumping = false;
      this.gravity = 0;
    }

    this.maxY = this.getMaxY(dots, this.characterCenterX);

    this.handleCharacterMovement(dots);
    this.character.draw(
      ctx,
      this.posX,
      this.posY - this.character.height,
      timeStamp
    );
  }

  getMaxY(dots, x) {
    if (dots[x]) {
      for (const y of dots[x]) {
        if (this.posY - 10 <= y) {
          return y;
        }
      }
    }
  }

  handleKeyEvent(event) {
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

  handleCharacterMovement(dots) {
    this.handleCharacterImage();
    this.character.frameSpeed = 10;

    if (this.characterMove.left) {
      this.character.frameSpeed = 50;

      if (0 < this.posX - this.characterMove.speed) {
        this.posX -= this.characterMove.speed;
      }
    }

    if (this.characterMove.right) {
      this.character.frameSpeed = 50;

      if (this.posX + this.character.width < this.canvasWidth) {
        this.posX += this.characterMove.speed;
      }

      this.characterMove.direction = "right";
    }

    if (this.characterMove.jump && !this.characterMove.isJumping) {
      this.characterMove.isJumping = true;
      this.gravity -= this.characterMove.jumpHeight;
    }

    if (this.gravity) {
      this.posY += Math.floor(this.gravity);
    }

    this.gravity += 1.5;
    this.gravity *= 0.9;
  }

  handleCharacterImage() {
    if (this.characterMove.left) {
      this.character.currentImg = this.character.imgList.walking;
      this.character.isFlipped = true;
      return;
    }

    if (this.characterMove.right) {
      this.character.currentImg = this.character.imgList.walking;
      this.character.isFlipped = false;
      return;
    }

    this.character.currentImg = this.character.imgList.idle;
  }
}

export default CharacterController;