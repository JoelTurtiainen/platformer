import { createAtlases } from '../components/world/atlas.js';
import testMap from '../maps/test.json' with { type: 'json' };
import { canvasConfig, playerConfig, enemiesConfig } from '../components/config.js';
import { updateGameArea } from '../components/update.js';
import { initCanvas, setupEventListeners, initPlayer, initEnemies } from '../components/setup.js';

const myGameArea = {
  start() {
    // Init Canvas
    const { canvas, ctx } = initCanvas(canvasConfig);
    this.canvas = canvas;
    this.ctx = ctx;
		this.map = testMap

    // Initialize Atlases 
    this.atlases = createAtlases(testMap, 3);

    // Initialize everything else
    this.cameraOffset = 0;
    this.frameNo = 0;

    // Init player
    this.player = initPlayer(playerConfig, this.canvas);
    
    // Init enemies
    this.enemies = initEnemies(enemiesConfig, this.canvas);

    setupEventListeners(this);

    this.clear = () => this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.stop = () => cancelAnimationFrame(this.animationFrameID);

    this.updateGameArea = () => updateGameArea(this);
    this.animationFrameID = requestAnimationFrame(() => updateGameArea(this));
  },
};

myGameArea.start();