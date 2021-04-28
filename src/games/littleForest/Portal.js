class Portal {
  constructor(point, image) {
    this.img = image;

    this.posX = point.posX;
    this.posY = point.posY;

    this.width = point.width;
    this.height = point.height;
  }

  draw(ctx, characterController) {
    ctx.save();
    ctx.drawImage(
      this.img,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    ctx.restore();

    this.checkOnboardPortal(characterController);
  }

  checkOnboardPortal(characterController) {
    const characterX = characterController.characterCenterX;
    const characterY = characterController.posY - 20;

    if (this.posX <= characterX && characterX <=this.posX + this.width) {
      if (this.posY <= characterY && characterY <= this.posY + this.height) {
        characterController.posX = characterController.initialX;
        characterController.posY = characterController.initialY;
      }
    }
  }
}

export default Portal;
