import { Player, Enemy } from '../components/enemyPlayerClassit.js';

export function initCanvas(canvasConfig) {
	const canvas = document.createElement('canvas');
	canvas.width = canvasConfig.width;
	canvas.height = canvasConfig.height;
	canvas.style = `border: ${canvasConfig.border}`;
	canvas.style.cursor = canvasConfig.cursor;
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	document.body.insertBefore(canvas, document.body.childNodes[0]);
	return { canvas, ctx };
}

export function setupEventListeners(gameArea) {
	window.addEventListener('keydown', (e) => {
		gameArea.keys = gameArea.keys || [];
		gameArea.keys[e.key] = true;
	});

	window.addEventListener('keyup', (e) => {
		gameArea.keys[e.key] = false;
	});
}

export function initPlayer(playerConfig, canvas) {
	return new Player(playerConfig.x, playerConfig.y, playerConfig.width, playerConfig.height, playerConfig.color, canvas);
}

export function initEnemies(enemiesConfig, canvas) {
	return enemiesConfig.map((config) => new Enemy(config.x, config.y, config.width, config.height, config.speed, config.color, canvas));
}
