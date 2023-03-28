const Game = {
	ctx: undefined,
	width: innerWidth,
	height: innerHeight,
	scoreBoard: ScoreBoard,
	fps: 60,
	keys: {
		JUMP: 'Space',
		SHOOT: 'KeyF',
	},

	init() {
		const canvas = document.querySelector('canvas');

		canvas.style.display = 'block';
		canvas.width = this.width;
		canvas.height = this.height;

		this.ctx = canvas.getContext('2d');

		this.setup();
		this.start();
	},

	setup() {
		console.log('Estableciendo valores iniciales para el juego');

		this.player = new Player(0, 0, this);
		this.background = new Background(this);

		this.enemigos1 = [];

		this.score = 0;

		this.scoreBoard.init(this.ctx);

		this.bso = new Audio('BSO/nabruto.mp3');
		this.bso.loop = true;
		this.bso.play();
		this.bso.volume = 0.6;
	},

	start() {
		this.frameCounter = 0;
		this.progress = 1;
		this.animationLoopId = setInterval(() => {
			this.clear();

			this.frameCounter++;
			this.score += 0.01;

			if (this.frameCounter % 80 === 0) this.generateEnemigo1();

			this.drawAll();
			this.moveAll();

			this.scoreBoard.update(this.score);

			if (this.isCollision()) this.gameOver();

			if (this.isCollisionBullet()) console.log('Colisión bullet');

			this.clearEnemigos1();
		}, 1000 / this.fps);

			this.Win()
			
	},

	drawAll() {
		this.background.draw();



		this.enemigos1.forEach((Enemigo1) => {
			Enemigo1.draw(this.frameCounter);
		});

		this.player.draw(this.frameCounter);
	},

	moveAll() {
		this.background.move();

		  this.enemigos1.forEach((enemigo1) => {
    enemigo1.move(this.frameCounter);
  });

		this.player.move(this.frameCounter);
	},

	clearEnemigos1() {
		this.enemigos1 = this.enemigos1.filter(
			(enemigo1) => enemigo1.pos.x + enemigo1.width > 0
		);
	},

	isCollision() {
		return this.enemigos1.some(
			(enemigo1) =>
				this.player.pos.x + this.player.width - 55 > enemigo1.pos.x &&
				this.player.pos.x < enemigo1.pos.x + enemigo1.width &&
				this.player.pos.y + this.player.height - 65 > enemigo1.pos.y &&
				this.player.pos.y < enemigo1.pos.y + enemigo1.height
		);
	},

	isCollisionBullet() {
		return this.player.bullets.some((bullet) => {
			return this.enemigos1.some((enemigo1) => {
				const isCollision =
					bullet.pos.x + bullet.radius > enemigo1.pos.x &&
					bullet.pos.x - bullet.radius < enemigo1.pos.x + enemigo1.width &&
					bullet.pos.y + bullet.radius > enemigo1.pos.y &&
					bullet.pos.y - bullet.radius < enemigo1.pos.y + enemigo1.height;

				if (isCollision) {
					this.enemigos1 = this.enemigos1.filter((o) => o !== enemigo1);
					this.player.bullets = this.player.bullets.filter((b) => b !== bullet);
				}

				return isCollision;
			});
		});
	},

	generateEnemigo1() {
		console.log(this);

		if(Math.random() > 0.5) {
			this.enemigos1.push(new Enemigo2(this));
		} else if(Math.random() > 0.5) {
			this.enemigos1.push(new Enemigo1(this));
		} else{
			this.enemigos1.push(new Enemigo3(this));
		}
		
		
	},

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	gameOver() {
		this.bso.pause();
		clearInterval(this.animationLoopId);
		if (confirm('FIN DEL JUEGO. ¿VOLVER A EMPEZAR?')) this.init();
	},

	Win() {
		if (this.winTimeoutId) {
		  clearTimeout(this.winTimeoutId);
		}
	  
		this.winTimeoutId = setTimeout(() => {
		  if (confirm("¡ERES EL GANADOR DEL JUEGO! ¿Quieres jugar de nuevo?")) {
			this.init(); // Reinicia el juego
		  }
		}, 50000);
	}
};
