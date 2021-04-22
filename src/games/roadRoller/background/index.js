import Tile from "../tile";
import tile0 from "../../../assets/image/tile/forest/tile_0.png";
import tile1 from "../../../assets/image/tile/forest/tile_1.png";

class BackGround {
  constructor(ref, { staticMap }) {
    this.canvas = ref.current;
    this.ctx = this.canvas.getContext("2d");

    this.tiles = [
      new Tile(tile0),
      new Tile(tile1),
    ];

    this.staticMap = staticMap;

    this.draw(this.staticMap, this.ctx);
  }

  draw(mapData, ctx) {
    for (let i = 0; i < mapData.length; i++) {
      const {
        value,
        posX,
        posY,
        width,
        height
      } = mapData[i];

      ctx.save();
      this.tiles[value].draw(ctx);
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
