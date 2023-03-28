const ScoreBoard = {
	ctx: undefined,
	lastScore: 0,
	displayLock: false,
	init(ctx) {
		this.ctx = ctx;
	},

	setLock() {
		this.ctx.save()
		this.ctx.fillStyle = '#e22a22';
		this.ctx.fillText("DISPARO BLOQUEADO", 20, 100);


		this.restore()
	},

	addLock() {

		this.displayLock = true
	
	},

	removeLock() {
		this.displayLock = false
	},
	update(score) {
		score = Math.floor(score);

		this.ctx.save();

		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, 150, 70);

		if (score > this.lastScore) {
			this.ctx.font = '40px Arial';
			this.ctx.fillStyle = 'yellow';
		} else {
			this.ctx.font = '30px Arial';
			this.ctx.fillStyle = 'white';
		}

		this.ctx.fillText(score, 20, 50);

		this.ctx.restore();

		if (this.displayLock)  {
			this.ctx.save()
			this.ctx.fillStyle = '#e22a22';
			this.ctx.font = '20px Arial';
			this.ctx.fillText("DISPARO BLOQUEADO", 20, 100);
			this.ctx.restore()
		}

		this.lastScore = score;
	},
};
