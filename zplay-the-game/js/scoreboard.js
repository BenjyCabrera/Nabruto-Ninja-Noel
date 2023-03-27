const ScoreBoard = {
	ctx: undefined,
	lastScore: 0,

	init(ctx) {
		this.ctx = ctx;
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

		this.lastScore = score;
	},
};
