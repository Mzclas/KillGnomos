var reticleSize = 64; // 64 px x 64 px
var stagesImages = [
  "./imgs/scenas/stage1.jpg",
  "./imgs/scenas/stage2.jpg",
  "./imgs/scenas/stage3.jpg",
  "./imgs/scenas/stage4.jpg",
  "./imgs/scenas/stage5.jpg",
  "./imgs/scenas/stage6.jpg"
];

var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  stagelvl: undefined,

  init: function(canvasId) {
    this.gameSound = new Audio("./sounds/Theme.mp3");
    this.shootingSound = new Audio("./sounds/sniper-shot.m4a");
    this.screamSound = new Audio("./sounds/grito.mp3");
    this.hordaSound = new Audio("./sounds/horda-loud.mp3");
    this.reloadSound = new Audio("./sounds/reload.mp3");

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = document.body.clientWidth; //document.width is obsolete
    this.canvas.height = document.body.clientHeight; //document.height is obsolete
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.intro = new Intro(this);
    this.gameOver = new GameOver(this);

    this.fps = 60;
    this.contGnomos = 0;
    this.maxGnomos = 10;
    this.initialSpeed = 80;
    this.speedGnomes = this.initialSpeed;
    this.deadGnomos = 0;

    this.canvas.setAttribute("height", window.innerHeight);
    this.canvas.setAttribute("width", window.innerWidth);
  },
  showIntro: function(callback) {
    this.intro.drawIntro(callback);
  },
  start: function() {
    this.setOnClick();
    this.reloadSound.play();
    this.clickX = undefined;
    this.clickY = undefined;
    this.framesCounter = 0;
    this.ugeInterval = setInterval(
      function() {
        this.clear();
        this.framesCounter++;
        if (this.arrGnomos.length > 10) {
          this.playerDead();
        } else {
          if (this.framesCounter > 1000) {
            this.framesCounter = 0;
          }
          if (this.framesCounter % this.speedGnomes === 0) {
            this.generateGnomos();
          }
          if (this.deadGnomos === this.maxGnomos) {
            this.stop();
            this.lvlcomplet();
          }
          this.move();
          this.drawAll();
        }
      }.bind(this),
      1000 / this.fps
    );
  },
  setOnClick: function() {
    this.canvas.addEventListener(
      "click",
      function(evt) {
        this.shootingSound.currentTime = 0;
        this.shootingSound.play();

        this.clickX = evt.clientX;
        this.clickY = evt.clientY;

        this.arrGnomos.forEach(
          function(gnomo, i) {
            if (
              this.clickX + reticleSize / 2 >= gnomo.x &&
              this.clickX + reticleSize / 2 <= gnomo.x + gnomo.size &&
              this.clickY + reticleSize / 2 >= gnomo.y &&
              this.clickY + reticleSize / 2 <= gnomo.y + gnomo.size
            ) {
              this.score++;
              this.arrGnomos.splice(i, 1);
              this.deadGnomos++;
            }
          }.bind(this)
        );
      }.bind(this)
    );
  },
  generateGnomos: function() {
    if (this.contGnomos < this.maxGnomos) {
      var x = Math.floor(Math.random() * (1300 - 50 + 1) + 0);
      var y = Math.floor(Math.random() * (680 - 375 + 1) + 375);
      this.arrGnomos.push(new Gnomo(this, x, y));
      this.contGnomos++;
    }
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.drawBackground();
    this.arrGnomos.forEach(function(gnomo) {
      gnomo.drawGnomo();
    });
    this.fog.fogDraw(this.stage);
    this.drawScore();
    this.drawStage();
  },
  move: function() {
    this.fog.move();
  },
  reset: function() {
    this.background = new Background(this);
    this.fog = new Fog(this);
    this.framesCounter = 0;
    this.arrGnomos = [];
    this.contGnomos = 0;
    this.scoreBoard = ScoreBoard;
    this.stagelvl = Stagelvl;
    this.score = 0;
    this.stage = 1;
    this.speedGnomes = this.initialSpeed;
  },
  stop: function() {
    clearInterval(this.ugeInterval);
  },
  lvlcomplet: function() {
    this.stage++;
    this.maxGnomos *= 2;
    this.speedGnomes -= 10;
    this.deadGnomos = 0;
    this.contGnomos = 0;
    var stageImageIndex = Math.min(this.stage, stagesImages.length - 1);
    this.intro.drawImage(stagesImages[stageImageIndex]);
    setTimeout(
      function() {
        this.hordaSound.play();
        this.start();
      }.bind(this),
      5000
    );
  },

  playerDead: function() {
    this.stop();
    this.screamSound.play();
    this.gameOver.drawGameOver();
    setTimeout(
      function() {
        this.reset();
        this.start();
      }.bind(this),
      4000
    );
  },
  drawScore: function() {
    this.scoreBoard.update(this.score, this.ctx);
  },
  drawStage: function() {
    this.stagelvl.update(this.stage, this.ctx);
  }
};
