import { inRange } from '../common.js';

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} chunk
 * @param {Array} tilesets
 * @param {number} offset
 */

export function drawLayer(ctx, chunk, tilesets, offset) {
  let tileset = tilesets[0];
  const pxOffset = (offset * tileset.tileOutputSize) % tileset.updatedTileSize;
  const chunkSize = chunk.length;

  for (let col = 0; col < chunkSize; col++) {
    for (let row = 0; row < chunkSize; row++) {
      let tileVal = chunk[col][row];

      if (tileVal !== 0) {
        tileVal -= 1;

        // If tileVal is not found in the current tileset, search for the matching tileset and cache it
        if (!inRange(tileVal, tileset.firstgid, tileset.lastgid)) {
          tileset = tilesets.find((ts) => inRange(tileVal, ts.firstgid, ts.lastgid)) || tileset;
        }

        const sourceY =
          Math.floor((tileVal / tileset.atlasCol) % tileset.atlasCol) * tileset.tileSize;
        const sourceX = (tileVal % tileset.atlasCol) * tileset.tileSize;

        ctx.drawImage(
          tileset.atlas,
          sourceX,
          sourceY,
          tileset.tileSize,
          tileset.tileSize,
          row * tileset.updatedTileSize - pxOffset,
          col * tileset.updatedTileSize,
          tileset.updatedTileSize,
          tileset.updatedTileSize
        );
      }
    }
  }
}
