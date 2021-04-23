import { addEventHelper } from "../../utils/eventListHelper";
import Character from "./character";

class CharacterController {
  constructor(eventList, canvasHeight) {
    this.eventList = eventList;
    this.canvasHeight = canvasHeight;

    this.posX = 600;
    this.posY = 0;

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

    this.character = new Character();

    addEventHelper(this.eventList, window, "keydown", this.handleKeyEvent.bind(this));
    addEventHelper(this.eventList, window, "keyup", this.handleKeyEvent.bind(this));
  }

  draw(ctx, dots, timeStamp) {
    this.characterCenterX = this.posX + this.character.widthHalf;

    if (this.canvasHeight < this.posY - this.character.height) {
      this.posX = 40;
      this.posY = 300;
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
        if (this.posY <= y) {
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

    if (this.characterMove.left) {
      if (dots[this.posX - this.characterMove.speed]) {
        this.posX -= this.characterMove.speed;
      }
    }

    if (this.characterMove.right) {
      if (dots[this.posX + this.character.width]) {
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
  }

  handleCurrentFrame(currentImg) {
    if(currentImg !== this.character.currentImg) {
      this.character.currentFrame = 0;
    }
  }
}

export default CharacterController;