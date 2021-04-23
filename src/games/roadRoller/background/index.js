class BackGround {
  constructor(ref, { staticMap }) {
    this.canvas = ref.current;
    this.ctx = this.canvas.getContext("2d");

    this.staticMap = staticMap;

    this.draw(this.staticMap, this.ctx);
  }

  draw(mapData, ctx) {
    for (let i = 0; i < mapData.length; i++) {
      const {
        img,
        posX,
        posY,
        width,
        height
      } = mapData[i];

      ctx.save();
      img.draw(ctx);
      ctx.fillRect(
        posX,
        posY,
        width,
        height
      );
      ctx.restore();
    }
  }
}

export default BackGround;
