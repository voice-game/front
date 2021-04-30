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
    const characterFX = characterController.posX;
    const characterBX = characterFX + width;

    const height = characterController.character.height;
    const characterBY = characterController.posY;
    const characterFY = characterBY - height;

    const isXCollision =
    (characterFX <= this.posX && this.posX <= characterBX);

    const isYCollision =
    (characterFY <= this.posY && this.posY <= characterBY);

    const speed = Math.floor(this.speed);

    if (isXCollision && isYCollision) {
      characterController.gravity -= 15;
      characterController.isHit = true;

      characterController.reaction += speed * 2 - 5;
    }
  }
}

export default Obstacle;
