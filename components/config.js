// config.js
export const canvasConfig = {
	width: 256 * 3,
	height: 256 * 3,
	border: '1px solid #000000',
	cursor: 'none',
};

export const playerConfig = {
	x: 0,
	y: 520,
	width: 50,
	height: 80,
	color: 'blue',
};

export const enemiesConfig = [
	{ x: 100, y: 100, width: 50, height: 50, speed: 0.5, color: 'red' },
	// ...
];
