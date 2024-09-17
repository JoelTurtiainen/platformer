import { getVisibleChunkTiles } from '../world/chunks.js';
import { drawLayer } from '../world/layer.js';

export function updateMapMatrix(gameArea) {
	if (gameArea.currentMapMatrix.size === 0 || (gameArea.offset !== 0 && gameArea.offset % 16 === 0)) {
		console.log('loading more tiles');
		for (let layer of gameArea.map.layers) {
			const chunkArr = getVisibleChunkTiles(layer, gameArea.offset);
			gameArea.currentMapMatrix.set(layer.id, chunkArr);
		}
	}
}

export function drawNextTiles(gameArea) {
	updateMapMatrix(gameArea);
	const chunkArr = gameArea.currentMapMatrix;
	chunkArr.forEach((key) => drawLayer(gameArea.ctx, key, gameArea.atlases, gameArea.offset));
}
