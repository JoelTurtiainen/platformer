import { getVisibleChunkTiles } from '../components/world/chunks.js';
import { drawLayer } from '../components/world/layer.js';
import { clamp } from '../components/common.js';

export function updateGameArea(gameArea) {
	gameArea.clear();
	gameArea.frameNo += 1;

	if (gameArea.keys) {
		if (gameArea.keys['a']) {
			gameArea.player.moveLeft();
		}
		if (gameArea.keys['d']) {
			gameArea.player.moveRight();
		}
	}

	// Drawing map layers (might change)
	for (let layer of gameArea.map.layers) {
		gameArea.cameraOffset = clamp(gameArea.cameraOffset, gameArea.player.x, 256);
		const chunkArr = getVisibleChunkTiles(layer, gameArea.cameraOffset);
		drawLayer(gameArea.ctx, chunkArr, gameArea.atlases, gameArea.cameraOffset);
	}

	// Update and draw all enemies
	gameArea.enemies.forEach((enemy) => {
		enemy.move();
		enemy.draw(gameArea.ctx);
	});

	// Update and draw the player
	gameArea.player.dropDown();
	gameArea.player.draw(gameArea.ctx);

	// Request the next frame
	gameArea.animationFrameID = requestAnimationFrame(() => updateGameArea(gameArea));
}
