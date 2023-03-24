class Obstacle {
	constructor(game) {		
		this.game = game
		this.width = 146 * 0.8;
		this.height = 180 * 0.8;

		this.y0 = game.height * 0.8;

		this.pos = {
			x: game.width,
			y: game.player.y0 + game.player.height - this.height,
		};
	
		this.dx = 10;
	}

	draw(frameCounter) {
		const { ctx } = this.game;
	
		this.animateSprite(frameCounter);
	
		ctx.drawImage(
			this.img,
			this.img.currentFrame * (this.img.width / this.img.frameCount),
			0,
			this.img.width / this.img.frameCount,
			this.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);
	}

	animateSprite(frameCounter) {
		if (frameCounter % 5 === 0) {
			this.img.currentFrame++;

			if (this.img.currentFrame === this.img.frameCount) {
				this.img.currentFrame = 0;
			}
		}
	}

	move() {
		this.pos.x -= this.dx;
	}
}
class Enemigo1 extends Obstacle{
	constructor(game,x,y) {
		super(game,x,y)

		this.img = new Image();
		this.img.src = 'assets/Enemigo2.png';

		this.img.currentFrame = 0;
		this.img.frameCount = 17;
	}
}

class Enemigo2 extends Obstacle{
		constructor(game,x,y) {
		super(game,x,y)

		this.img = new Image();
		this.img.src = 'assets/Enemigo1.png';

		this.img.currentFrame = 0;
		this.img.frameCount = 20;
	}
}	

class Enemigo3 extends Obstacle{
	constructor(game,x,y) {
		super(game,x,y)

		this.img = new Image();
		this.img.src = 'assets/Enemigo3.png';

		this.img.currentFrame = 0;
		this.img.frameCount = 20;
	}
}	