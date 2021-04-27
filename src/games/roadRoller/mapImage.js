class MapImage {
  constructor(src) {
    this.img = new Image();
    this.img.src = src;
  }

  draw(ctx) {
    ctx.fillStyle = ctx.createPattern(this.img, "repeat");
  }
}

export default MapImage;
