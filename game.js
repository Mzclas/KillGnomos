var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  scoreBoard: undefined,
  stagelvl: undefined,

  startGame: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.click();
    this.fps = 60;
    this.contGnomos = 0;
    this.maxGnomos = 10;
    this.initialSpeed = 40;
    this.speedGnomes = this.initialSpeed;
    this.deadGnomos = 0;
    this.reset();
    this.start();
  },
  start: function() {
    this.clickX = undefined;
    this.clickY = undefined;
    this.framesCounter = 0;
    console.log(this.canvas.width);
    this.ugeInterval = setInterval(
      function() {
        this.clear();
        console.log(
          this.maxGnomos,
          this.deadGnomos,
          this.contGnomos,
          this.speedGnomes
        );
        this.framesCounter++;
        if (this.framesCounter > 100000) {
          this.framesCounter = 0;
        }
        if (this.framesCounter % this.speedGnomes === 0) {
          this.generateGnomos();
        }
        if (this.arrGnomos.length >= 10) {
          this.gameOver();
        }
        if (this.deadGnomos === this.maxGnomos) {
          this.stage++;
          this.stop();
          this.lvlcomplet();
        }
        this.move();
        this.drawAll();
      }.bind(this),
      1000 / this.fps
    );
  },
  click: function() {
    this.canvas.addEventListener(
      "click",
      function(evt) {
        this.clickX = evt.clientX;
        this.clickY = evt.clientY;

        this.arrGnomos.forEach(
          function(gnomo, i) {
            if (
              this.clickX >= gnomo.x &&
              this.clickX <= gnomo.x + gnomo.size &&
              this.clickY >= gnomo.y &&
              this.clickY <= gnomo.y + gnomo.size
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
      var x = Math.floor(Math.random() * (1350 - 0 + 1) + 0);
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
    this.fog.fogDraw();
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
    this.maxGnomos *= 2;
    this.speedGnomes -= 4;
    this.deadGnomos = 0;
    this.contGnomos = 0;
    this.start();
  },

  gameOver: function() {
    this.stop();
    this.reset();
    this.start();
  },
  drawScore: function() {
    this.scoreBoard.update(this.score, this.ctx);
  },
  drawStage: function() {
    this.stagelvl.update(this.stage, this.ctx);
  }
};
