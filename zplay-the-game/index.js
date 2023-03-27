addEventListener('load', () => {
	const welcomeScreen = document.querySelector('main');

	const startBtn = document.querySelector('#start-button');
	startBtn.onclick = function () {
		welcomeScreen.style.display = 'none';
		Game.init();
	};
});