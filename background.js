function Background(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "./imgs/85cdca8088322c299b99cde3a64807ae.jpg";

  this.x = 0;
  this.y = 0;

  this.dx = 10;
}

Background.prototype.drawBackground = function() {
  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.game.canvas.width,
    this.game.canvas.height
  );
};
