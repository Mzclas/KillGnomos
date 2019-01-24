function GameOver(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "./imgs/scenas/endGame.jpg";

  this.x = 0;
  this.y = 0;
}

GameOver.prototype.drawGameOver = function() {
  console.log("muerto");
  //this.img.onload = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
  //}.bind(this);
};
