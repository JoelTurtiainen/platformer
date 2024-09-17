import { Player, Enemy } from './entities/enemyPlayerClassit.js';
import { TileAtlas } from './world/atlas.js';

export function initializeCanvas(config) {
	console.debug(`- Canvas`);
	const canvas = document.createElement('canvas');
	canvas.width = config.width * config.scale;
	canvas.height = config.height * config.scale;
	canvas.style = `border: ${config.border}`;
	canvas.style.cursor = config.cursor;
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	document.body.insertBefore(canvas, document.body.childNodes[0]);
	return { canvas, ctx, scale: config.scale };
}

export function initializeAtlases(map, tileScale) {
	console.debug('Generating atlases:');
	return map.tilesets.map((tileset) => new TileAtlas(tileset, tileScale));
}

export function setupEventListeners(gameArea) {
	console.debug(`- Event Listeners`);
	window.addEventListener('keydown', (e) => {
		gameArea.keys = gameArea.keys || [];
		gameArea.keys[e.key] = true;
	});

	window.addEventListener('keyup', (e) => {
		gameArea.keys[e.key] = false;
	});
}

export function initPlayer(playerConfig, canvas) {
	console.debug(`- Player`);
	return new Player(playerConfig.x, playerConfig.y, playerConfig.width, playerConfig.height, playerConfig.speed, playerConfig.color, canvas);
}

export function initEnemies(enemiesConfig, canvas) {
	console.debug(`- Enemies`);
	return enemiesConfig.map((config) => new Enemy(config.x, config.y, config.width, config.height, config.speed, config.color, canvas));
}

export function initializeGameProperties(gameArea, map, scale) {
	console.debug(`- Game Properties`);
	gameArea.map = map;
	gameArea.scale = scale;
	gameArea.currentMapMatrix = new Map();
	gameArea.atlases = initializeAtlases(map, scale);
	gameArea.offset = 0;
}

export function initializeEntities(gameArea, playerConfig, enemiesConfig, canvas) {
	console.debug(`Loading Entities:`);
	gameArea.player = initPlayer(playerConfig, canvas);
	gameArea.enemies = initEnemies(enemiesConfig, canvas);
}

export function setupGameAreaMethods(gameArea, ctx, canvas) {
	gameArea.clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
	gameArea.stop = () => cancelAnimationFrame(gameArea.frameNo);
}
