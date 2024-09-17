export class TileAtlas {
	constructor(tileset, tileScale) {
		this.atlas = new Image();
		this.atlas.src = `./varastetut_spritet/${tileset.name}.png`;
		this.atlas.style.imageRendering = 'pixelated';
		this.atlasCol = tileset.columns;
		this.tileSize = tileset.tileheight;
		this.tileOutputSize = tileScale;
		this.updatedTileSize = this.tileSize * this.tileOutputSize;
		this.firstgid = tileset.firstgid;
		this.lastgid = this.firstgid + tileset.tilecount;

		console.debug(`- ${tileset.name}`);
	}

	// load() {
	//   return new Promise((resolve) => {
	//     this.atlas.onload = resolve;
	//   });
	// }
}
