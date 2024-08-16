import lvl1 from './maps/level1.json' with { type: 'json' };
import { ctx } from './main.js';

const worldTileset = {
  tileAtlas: new Image(),
  atlasCol: 16,
  atlasRow: 16,
  tileSize: 16,
  tileOutputSize: 2,

  load(callback) {
    this.tileAtlas.src = './varastetut_spritet/world_tileset.png';
    this.tileAtlas.onload = () => {
      this.updatedTileSize = this.tileSize * this.tileOutputSize;
      callback();
    };
  },
};

function drawMap(map, ts) {
  let mapIndex = 0;
  for (let col = 0; col < map.height; col++) {
    for (let row = 0; row < map.width; row++) {
      let tileVal = map.layers[0].data[mapIndex];
      if (tileVal != 0) {
        tileVal -= 1;
        let sourceY = Math.floor(tileVal / ts.atlasCol) * ts.tileSize;
        let sourceX = (tileVal % ts.atlasCol) * ts.tileSize;
        ctx.drawImage(
          ts.tileAtlas,
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

export function drawWorld() {
  worldTileset.load(() => {
    drawMap(lvl1, worldTileset);
  });
}

