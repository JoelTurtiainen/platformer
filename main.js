import { drawWorld } from './loadWorld.js';

const canvas = document.getElementById('test-canvas');
export const ctx = canvas.getContext('2d');

drawWorld();
