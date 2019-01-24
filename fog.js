//esta función mantiene el fondo del juego
var fogImage = new Image();
fogImage.src = "./imgs/decorados/fog.png";
var mirroredFogImage = new Image();
mirroredFogImage.src = "./imgs/decorados/fog-mirrored.png";

function Fog(game) {
  this.game = game;
  this.img = fogImage;
  this.imgMirrored = mirroredFogImage;

  this.x = 0;
  this.y = 150;

  this.dx = 2;
}

Fog.prototype.fogDraw = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
  this.game.ctx.drawImage(
    this.imgMirrored,
    this.x + this.game.canvas.width,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
};

Fog.prototype.move = function() {
  this.x -= this.dx;

  if (this.x < -this.game.canvas.width) {
    this.x = 0;
    var currentFogImage = this.img;
    this.img = this.imgMirrored;
    this.imgMirrored = currentFogImage;
  }
};
