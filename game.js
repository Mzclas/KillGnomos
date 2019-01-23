var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,
  startGame: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.click();
    this.fps = 60;
    this.reset();
    this.start();
    this.contGnomos = 0;
    this.maxGnomos = 10;
  },
  start: function() {
    this.clickX = undefined;
    this.clickY = undefined;
    this.framesCounter = 0;
    console.log(this.canvas.width);
    this.ugeInterval = setInterval(
      function() {
        this.clear();
        this.framesCounter++;
        if (this.framesCounter > 1000) {
          this.framesCounter = 0;
        }
        if (this.framesCounter % 100 === 0) {
          this.generateGnomos();
        }
        this.drawAll();
        // borre
        // cree gnomos cada cierto tiempo ,  this.gnomos.push(new Gnomo (this))
        // mueva los elementos si se mueven
        // pinte
        // recoja si hay click de raton
        // elimine gnomos destruidos.
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
          function(nomo, i) {
            if (
              this.clickX >= nomo.x &&
              this.clickX <= nomo.x + nomo.size &&
              this.clickY >= nomo.y &&
              this.clickY <= nomo.y + nomo.size
            ) {
              console.log(`Nomo en la posición ${i} del array.`);
            }
          }.bind(this)
        );
      }.bind(this)
    );
    //   false
  },
  //generamos nuevos gnomos
  generateGnomos: function() {
    //todo: consider refactoring hardcoded variables
    if (this.contGnomos < this.maxGnomos) {
      var x = Math.floor(Math.random() * (1350 - 0 + 1) + 0);
      var y = Math.floor(Math.random() * (680 - 375 + 1) + 375);
      this.arrGnomos.push(new Gnomo(this, x, y));
      this.contGnomos++;
    }
  },
  // clear: function() {}
  //dibuja todos los assets del juego
  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawAll: function() {
    this.background.drawBackground();
    this.arrGnomos.forEach(function(gnomo) {
      gnomo.drawGnomo();
    });
  },
  reset: function() {
    this.background = new Background(this);
    this.framesCounter = 0;
    this.arrGnomos = [];
    this.contGnomos = 0;
  }
};
