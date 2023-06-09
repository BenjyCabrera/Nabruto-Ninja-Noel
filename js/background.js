class Background {
	constructor(game) {
		this.game = game;

		this.img = new Image();
		this.img2 = new Image();

		this.img.src = 'assets/oscuro3.jpg',

		this.x = 0;
		this.y = 0;

		this.dx = 6;
	}

	draw() {
		this.game.ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.game.width,
			this.game.height
		);

		this.game.ctx.drawImage(
			this.img,
			this.x + this.game.width,
			this.y,
			this.game.width,
			this.game.height
		);
	}

	move() {
		if (this.x - this.dx <= -this.game.width) {
			this.x = 0;
		}

		this.x -= this.dx;
	}
}
