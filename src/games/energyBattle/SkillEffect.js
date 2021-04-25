class SkillEffect {
  constructor(imgObj, canvasWidth, canvasHeight) {
    this.imgObj = imgObj;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  mySkill(ctx, spriteCount, volumeSum, myVolumeSum) {
    ctx.drawImage(
      this.imgObj.fire,
      (this.imgObj.fire.width / 10) * (spriteCount % 10),
      0,
      this.imgObj.fire.width / 10,
      this.imgObj.fire.height,
      (myVolumeSum / volumeSum) * this.canvasWidth -
        (this.canvasWidth / 8 / 10) * 6,
      this.canvasHeight * 0.4,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }

  otherSkill(ctx, spriteCount, volumeSum, otherVolumeSum) {
    ctx.drawImage(
      this.imgObj.ice,
      (this.imgObj.ice.width / 13) * (spriteCount % 13),
      0,
      this.imgObj.ice.width / 13,
      this.imgObj.ice.height,
      -this.canvasWidth +
        (otherVolumeSum / volumeSum) * this.canvasWidth -
        (this.canvasWidth / 8 / 10) * 6,
      this.canvasHeight * 0.4,
      this.canvasWidth / 8,
      (this.canvasWidth / 8 / 10) * 9
    );
  }
}

export default SkillEffect;
