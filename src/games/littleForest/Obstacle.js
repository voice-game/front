class Obstacle {
  constructor(info) {
    this.posX = info.posX;
    this.posY = info.posY;

    this.minX = info.posX;
    this.maxX = info.posX + info.range;

    this.width = info.width;
    this.height = info.height;

    this.speed = 1;
  }

  draw(ctx, characterController) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = "red";
    ctx.arc(
      this.posX,
      this.posY,
      this.width / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();

    this.animate(characterController);
  }

  animate(characterController) {
    if (this.posX <= this.maxX) {
      this.speed += 0.1;
    } else {
      this.speed -= 0.1;
    }

    this.posX += this.speed;

    this.collision(characterController);
  }

  collision(characterController) {
    const isHit = characterController.isHit;

    if (isHit) {
      return;
    }

    const width = characterController.character.width;
    const characterLeftX = characterController.posX;
    const characterRightX = characterLeftX + width;

    const height = characterController.character.height;
    const characterBottomY = characterController.posY;
    const characterUpperY = characterBottomY - height;

    const isXCollision =
    (characterLeftX <= this.posX && this.posX <= characterRightX);

    const isYCollision =
    (characterUpperY <= this.posY && this.posY <= characterBottomY);

    const speed = Math.floor(this.speed);

    if (isXCollision && isYCollision) {
      characterController.gravity -= 15;
      characterController.isHit = true;

      characterController.reaction += speed * 2;
    }
  }
}

export default Obstacle;
