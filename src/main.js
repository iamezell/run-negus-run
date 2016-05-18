var game = new Phaser.Game(360, 592, Phaser.AUTO, 'run-negus-run-game');
game.state.add('boot', require('./boot'));
game.state.add('preloader', require('./preloader'));
game.state.add('menu', require('./menu'));
game.state.add('game', require('./game'));
game.state.start('boot');
