import { drawChunk } from './loadWorld.js';
import testMap from './maps/test.json' with { type: 'json' };

const canvas = document.getElementById('test-canvas');
export const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

drawChunk(testMap, 0);
