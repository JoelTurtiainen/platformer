import { getVisibleChunkTiles } from './world/chunks.js';
import { createAtlases } from './world/atlas.js';
import { drawLayer } from './world/layer.js';
import { clamp } from './common.js';
import testMap from './maps/test.json' with { type: 'json' };

const myGameArea = {
  canvas: document.createElement('canvas'),

  start() {
    // Init Canvas
    this.tileScale = 3;
    this.canvas.width = 256 * this.tileScale - 16;
    this.canvas.height = 256 * this.tileScale;
    this.canvas.style = 'border: 1px solid #000000';
    this.canvas.style.cursor = 'none'; //hide the original cursor
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    // Initialize Atlases 
    this.atlases = createAtlases(testMap, this.tileScale);

    // Initialize everything else
    this.offset = 0;
    this.frameNo = 0;

    window.addEventListener('keydown', (e) => {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      myGameArea.keys[e.key] = false;
    });

    this.updateGameArea = this.updateGameArea.bind(this);
    this.animationFrameID = requestAnimationFrame(this.updateGameArea);
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop() {
    cancelAnimationFrame(this.animationFrameID);
  },
  updateGameArea() {
    this.clear();
    this.frameNo += 1;

    if (myGameArea.keys) {
      //Todo: Use players position instead of this.offset
      if (myGameArea.keys['ArrowLeft']) {
        this.offset--;
      } 
      if (myGameArea.keys['ArrowRight']) {
        this.offset++;
      } 
    }

    // Some hardcoded wip spaghetti
    for (let layer of testMap.layers) {
      this.offset = clamp(this.offset, 0, 256)
      const chunkArr = getVisibleChunkTiles(layer, this.offset);
      drawLayer(this.ctx, chunkArr, this.atlases, this.offset);
    }

    // Request the next frame
    this.animationFrameID = requestAnimationFrame(this.updateGameArea);
  },
};

myGameArea.start();