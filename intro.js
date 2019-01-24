var introImages = [
  "./imgs/scenas/mzclasProductions.jpg",
  "./imgs/scenas/cartel1.jpg",
  "./imgs/scenas/cartel2.jpg",
  "./imgs/scenas/cartel3.jpg",
  "./imgs/scenas/cartel4.jpg"
];

function Intro(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = "./imgs/scenas/portada-131.jpg";

  this.x = 0;
  this.y = 0;
}

Intro.prototype.drawImage = function(imageSrc) {
  var image = new Image();
  image.src = imageSrc;
  image.onload = function() {
    this.game.ctx.drawImage(
      image,
      this.x,
      this.y,
      this.game.canvas.width,
      this.game.canvas.height
    );
  }.bind(this);
};

Intro.prototype.drawIntro = function(callback) {
  var index = 0;
  var duration = 4000;
  var numImages = introImages.length;

  var startIntro = function() {
    this.game.canvas.removeEventListener("click", startIntro);
    this.game.gameSound.play();
    var imagesInterval = setInterval(
      function() {
        this.drawImage(introImages[index++]);
      }.bind(this),
      duration
    );
    setTimeout(
      function() {
        clearInterval(imagesInterval);
        callback();
      }.bind(this),
      numImages * duration
    );
  }.bind(this);

  this.drawImage(introImages[index++]);
  this.game.canvas.addEventListener("click", startIntro);
};
