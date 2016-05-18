function Game() {}


Game.prototype.init = function () {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;

  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.gravity.y = 1000;
  this.cursors = this.game.input.keyboard.createCursorKeys();
  this.RUNNING_SPEED = 180;
  this.JUMPING_SPEED = 550;
};


Game.prototype.preload = function(){
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('goal', 'assets/images/gorilla3.png');
  this.load.image('arrowButton', 'assets/images/arrowButton.png');
  this.load.image('actionButton', 'assets/images/actionButton.png');

  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
  this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
}

Game.prototype.create = function () {
  // this.input.onDown.add(this.onInputDown, this);

  //platform ----------------------------------------------------
  this.ground = this.add.sprite(0, 400, 'ground');
  this.game.physics.arcade.enable(this.ground);
  this.ground.body.allowGravity = false;
  this.ground.body.immovable = true;

  //platform ----------------------------------------------------
  this.platform = this.add.sprite(0, 300, 'platform');
  this.game.physics.arcade.enable(this.platform);
  this.platform.body.allowGravity = false;
  this.platform.body.immovable = true;

  //player ----------------------------------------------------
  this.player = this.add.sprite(100, 350, 'player', 3);
  this.player.anchor.setTo(0.5);
  this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
  this.player.play('walking');
  this.player.customParams = {};
  this.game.physics.arcade.enable(this.player);
  this.createOnScreenControls();

};

Game.prototype.createOnScreenControls = function () {
  this.leftArrow = this.add.button(20, 400, 'arrowButton');
  this.rightArrow = this.add.button(110, 400, 'arrowButton');
  this.actionButton = this.add.button(280, 400, 'actionButton');

  this.leftArrow.alpha = 0.5;
  this.rightArrow.alpha = 0.5;
  this.actionButton.alpha = 0.5;

  // up
  this.actionButton.events.onInputDown.add(function(){
    this.player.customParams.mustJump = true;
  }, this);

  this.actionButton.events.onInputUp.add(function(){
    this.player.customParams.mustJump = false;
  }, this);
  // right
  this.rightArrow.events.onInputDown.add(function(){
    this.player.customParams.isMovingRight = true;
  }, this);

  this.rightArrow.events.onInputUp.add(function(){
    this.player.customParams.isMovingRight = false;
  }, this);
  // left
  this.leftArrow.events.onInputDown.add(function(){
    this.player.customParams.isMovingLeft = true;
  }, this);

  this.leftArrow.events.onInputUp.add(function(){
    this.player.customParams.isMovingLeft = false;
  }, this);
}

Game.prototype.update = function () {
  this.game.physics.arcade.collide(this.player, this.ground, this.landed);
  this.game.physics.arcade.collide(this.player, this.platform, this.landed);

  this.player.body.velocity.x = 0;

  if(this.cursors.left.isDown || this.player.customParams.isMovingLeft){
    this.player.body.velocity.x = -this.RUNNING_SPEED;
  }else if(this.cursors.right.isDown || this.player.customParams.isMovingRight){
    this.player.body.velocity.x = this.RUNNING_SPEED;
  }
  if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down){
    
    this.player.body.velocity.y = -this.JUMPING_SPEED;
    this.player.customParams.mustJump = false;
  }

};

Game.prototype.landed = function(player, ground){

}
Game.prototype.onInputDown = function () {
  // this.game.state.start('menu');
};

module.exports = Game;
