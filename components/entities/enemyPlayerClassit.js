class Sprite {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export class Enemy extends Sprite {
	constructor(x, y, width, height, speed, color, canvas) {
		super(x, y, width, height, color);
		this.speed = speed;
		this.direction = 1;
		this.canvas = canvas;
	}

	move() {
		this.x += this.speed * this.direction;

		if (this.x <= 0 || this.x + this.width >= this.canvas.width) {
			this.direction *= -1;
		}
	}
}

export class Player extends Sprite {
	constructor(x, y, width, height, speed, color, canvas) {
		super(x, y, width, height, color);
		this.speed = speed;
		this.velocity = { x: 0, y: 1 };
		this.canvas = canvas;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	jump() {
		this.y -= this.height;
	}

	dropDown() {
		this.y += this.velocity.y;
		if (this.y + this.height + this.velocity.y < this.canvas.height) {
			this.velocity.y += 0.5;
		} else {
			this.velocity.y = 0;
		}
	}
}

// const keys = {
// 	d: {
// 		pressed: false,
// 	},
// 	a: {
// 		pressed: false,
// 	},
// };
