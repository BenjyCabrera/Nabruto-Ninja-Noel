class Player {
	constructor(x, y, game) {
		this.game = game;

		this.sprites = {
			Run: {
				img: createImage('assets/Ninja.png'),
				frames: 10,
				frameIndex: 0,
			},
			Gun: {
				img: createImage('assets/Ataque.png'),
				frames: 10,
				frameIndex: 0,
			} 
		};
		
		this.currentSprite = this.sprites.Run;

		this.width = 146 * 0.8;
		this.height = 180 * 0.8;

		this.y0 = game.height * 0.8;

		console.log(this.y0)

		this.pos = {
			x: game.width * 0.0,
			y: this.y0,
		};

		this.speed = {
			x: 0,
			y: 0,
		};

		this.bullets = [];

		this.setCotrols();


		this.actions = {
			shoot: false,
			jump: false
		}

	}

	setCotrols() {
		const { JUMP, SHOOT } = this.game.keys;

		addEventListener('keydown', ({ code }) => {
			switch (code) {
				case JUMP:
					if (this.y0 === this.pos.y) {
						this.speed.y = -10;
						this.pos.y -= 1;

						this.actions.jump = true
					}
					break;

				case SHOOT:
					this.shoot();
					break;
					
			}
		});
	}

	draw(frameCounter) {
		const { ctx } = this.game;

		if(this.actions.shoot){
			this.currentSprite = this.sprites.Gun;
		} else { this.currentSprite = this.sprites.Run}
		
		

		ctx.drawImage(
			this.currentSprite.img,
			this.currentSprite.frameIndex *
				(this.currentSprite.img.width / this.currentSprite.frames),
			0,
			this.currentSprite.img.width / this.currentSprite.frames,
			this.currentSprite.img.height,
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

		this.animateSprite(frameCounter)
		this.bullets = this.bullets.filter(
			(bullet) => bullet.pos.x - bullet.radius < this.game.width
		);

		this.bullets.forEach((bullet) => {
			bullet.draw();
			bullet.move();
		});
	}

	shoot() {

	
			setTimeout(() => {
				if(!this.actions.shoot) {
					this.actions.shoot = true
					this.bullets.push(new Bullet(this.game));
				}
			}, 200)
	
	
		
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.currentSprite.frameIndex++;

			

			if (this.currentSprite.frameIndex === this.currentSprite.frames) {
				if(this.actions.shoot) {
					this.actions.shoot = false
				}
				this.currentSprite.frameIndex = 0;
			}
		}
	}

	move() {
		const gravity = 0.3;

		if (this.pos.y < this.y0) {
			this.speed.y += gravity;
		} else {
			this.actions.jump = false
			this.speed.y = 0;
			this.pos.y = this.y0;
		}

		this.pos.y += this.speed.y;
	}
}
