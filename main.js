import testMap from '../maps/test.json' with { type: 'json' };
import { canvasConfig, playerConfig, enemiesConfig } from '../components/config.js';
import { drawNextTiles } from './components/world/worldCore.js';
import { initializeCanvas, initializeEntities, initializeGameProperties, setupEventListeners, setupGameAreaMethods } from './components/init.js';

const myGameArea = {
  start() {
		console.log(`Initializing`);
		const { canvas, ctx, scale } = initializeCanvas(canvasConfig);
		this.canvas = canvas;
		this.ctx = ctx;
		
		setupEventListeners(this);
		initializeGameProperties(this, testMap, scale);
		initializeEntities(this, playerConfig, enemiesConfig, canvas);
		setupGameAreaMethods(this, ctx, canvas);

		console.log(`Initializing finished`);

		this.frameNo = requestAnimationFrame(() => this.update());
  },
	handleInput() {
		if (!this.keys) return;

		if (this.keys['a']) {
			this.player.moveLeft();
		}
		
		if (this.keys['d']) {
			if (this.player.x > this.canvas.width / 2) {
				this.offset += playerConfig.speed;
			} else {
				this.player.moveRight();
			}
		}
		
	},
	update() {
		this.clear();

		this.handleInput()

		drawNextTiles(this);

		// Update and draw all enemies
    this.enemies.forEach((enemy) => {
      enemy.move();
      enemy.draw(this.ctx);
    });

		// Update and draw the player
    this.player.dropDown();
    this.player.draw(this.ctx);

		// Request the next frame
		this.frameNo = requestAnimationFrame(() => this.update());
	}
}

myGameArea.start();