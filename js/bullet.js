class Bullet {
	constructor(game) {
		this.game = game;

		const { player } = game;

		this.pos = {
			x: player.pos.x + player.width,
			y: player.pos.y,
		};

		this.speed = {
			x: 10,
			y: 1,
		};

		this.radius = 10;
	}

	draw() {  
		
	const { ctx } = this.game;

	const image = new Image();
	image.src = 'assets/Kunai.png';
	
	image.addEventListener('load', () => {
	  ctx.beginPath();
	  ctx.save();
	  ctx.drawImage(image, this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 4, this.radius * 4);
	  ctx.restore();
	  ctx.closePath();
	});
	
	}

	move() {
		const gravity = 0;

		this.speed.y += gravity;
		this.pos.y += this.speed.y;
		this.pos.x += this.speed.x;

		if (this.pos.y > this.game.player.y0 + this.game.player.height) {
			this.speed.y *= 0;
		}
	}
}
