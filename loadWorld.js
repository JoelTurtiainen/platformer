import { ctx } from './main.js';

function drawLayer(map, chunkIndex, layerId, tilesets) {
  let mapIndex = 0;
  let ts = tilesets[0];
  const chunk = map.layers[layerId].chunks[chunkIndex];
  for (let col = 0; col < chunk.width; col++) {
    for (let row = 0; row < chunk.height; row++) {
      let tileVal = chunk.data[mapIndex];
      if (tileVal !== 0) {
        tileVal -= 1;
        if (!inRange(tileVal, ts.firstgid, ts.lastgid)) {
          ts =
            tilesets.find((tileset) => inRange(tileVal, tileset.firstgid, tileset.lastgid)) || ts;
        }
        const sourceY = Math.floor((tileVal / ts.atlasCol) % ts.atlasCol) * ts.tileSize;
        const sourceX = (tileVal % ts.atlasCol) * ts.tileSize;
        ctx.drawImage(
          ts.atlas,
          sourceX,
          sourceY,
          ts.tileSize,
          ts.tileSize,
          row * ts.updatedTileSize,
          col * ts.updatedTileSize,
          ts.updatedTileSize,
          ts.updatedTileSize
        );
      }
      mapIndex++;
    }
  }
}

function drawAllLayers(map, tilesets, chunkIndex) {
  map.layers.forEach((_, layerId) => drawLayer(map, chunkIndex, layerId, tilesets));
}

const inRange = (x, min, max) => x >= min && x <= max;

function createAtlases(map) {
  return map.tilesets.map((tileset) => new TileAtlas(tileset));
}

class TileAtlas {
  constructor(tileset) {
    this.atlas = new Image();
    this.atlas.src = `./varastetut_spritet/${tileset.name}.png`;
    this.atlas.style.imageRendering = 'pixelated';
    this.atlasCol = tileset.columns;
    this.tileSize = tileset.tileheight;
    this.tileOutputSize = 1;
    this.updatedTileSize = this.tileSize * this.tileOutputSize;
    this.firstgid = tileset.firstgid;
    this.lastgid = this.firstgid + tileset.tilecount;
  }

  load() {
    return new Promise((resolve) => {
      this.atlas.onload = resolve;
    });
  }
}

export async function drawChunk(mapfile, chunkIndex) {
  const atlases = createAtlases(mapfile);
  await Promise.all(atlases.map((atlas) => atlas.load()));
  drawAllLayers(mapfile, atlases, chunkIndex);
}
