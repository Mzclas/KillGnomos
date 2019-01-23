function Gnomo(game, x, y) {
  this.game = game;
  this.x = x;
  this.y = y;
  this.size = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  this.gnomoImages = [
    "./imgs/conejo.png",
    "./imgs/enterrado.png",
    "./imgs/enterrado2.png",
    "./imgs/enterrado3.png",
    "./imgs/girl.png",
    "./imgs/hallowen.png",
    "./imgs/scream.png",
    "./imgs/viernes13.png",
    "./imgs/zombi1.png",
    "./imgs/zombi2.png"
  ];
  this.img = new Image();
  this.img.src = this.gnomoImages[Math.floor(Math.random() * 10)];
}

Gnomo.prototype.generateWHNomo = function() {};

Gnomo.prototype.drawGnomo = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
};
