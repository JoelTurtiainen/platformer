export function getVisibleChunkTiles(layer, offset) {
	const chunks = layer.chunks;
	const tileOffset = Math.floor(offset / 16);
	const chunkOffset = Math.floor(tileOffset / 16);

	//console.debug(`Pixel: ${offset % 16} | Tile: ${tileOffset} | Chunk: ${chunkOffset}`);

	if (chunkOffset >= chunks.length) {
		return []; // Return an empty array if the chunkOffset is out of bounds
	}

	const chunk1 = chunkToMatrix(chunks[chunkOffset]);

	if (tileOffset !== 0 && chunkOffset + 1 < chunks.length) {
		// Combine chunks
		const chunk2 = chunkToMatrix(chunks[chunkOffset + 1]);
		for (let row in chunk1) {
			chunk1[row] = chunk1[row].slice(tileOffset).concat(chunk2[row].slice(0, tileOffset));
		}
	}
	return chunk1;
}

function chunkToMatrix(chunk) {
	const matrix = [];
	const n = 16;
	for (let index = 0; index < n; index += 1) {
		const array = chunk.data.slice(index * n, (index + 1) * n);
		matrix.push(array);
	}
	return matrix;
}
