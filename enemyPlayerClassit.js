class Sprite {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  class Enemy extends Sprite {
    constructor(x, y, width, height, speed, color) {
      super(x, y, width, height, color);
      this.speed = speed;
      this.direction = 1;
    }
  
    move() {
      this.x += this.speed * this.direction;
  
      if (this.x <= 0 || this.x + this.width >= canvas.width) {
        this.direction *= -1;
      }
    }
  }
  
  class Player extends Sprite {
    constructor(x, y, width, height, color) {
      super(x, y, width, height, color);
      this.velocity = { x: 0, y: 1 }
  
    }
  
    moveLeft() {
      this.x -= 1;
    }
  
    moveRight() {
      this.x += 1;
    }
  
    jump() {
      this.y -= this.height
    }
  
    dropDown() {
      this.y += this.velocity.y;
      if (this.y + this.height + this.velocity.y < canvas.height) {
        this.velocity.y += 0.5;
      }
      else {
        this.velocity.y = 0;
      }
    }
  }
  
  const keys = {
    d: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
  }
  
  const enemy = new Enemy(100, 100, 50, 50, 0.5, 'red');
  const player = new Player(0, 520, 50, 80, 'blue');
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemy.move();
    enemy.draw();
    player.dropDown();
    player.draw();
    requestAnimationFrame(animate);
  
    if (keys.d.pressed) {
      player.moveRight();
    }
    else if (keys.a.pressed) {
      player.moveLeft();
    }
  }
  
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true;
        break;
      case 'a':
        keys.a.pressed = true;
        break;
      case 'w':
        player.jump();
        break;
    }
  })
  
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false;
        break;
      case 'a':
        keys.a.pressed = false;
        break;
    }
  })
  
  animate();
  
  