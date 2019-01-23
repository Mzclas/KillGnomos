var Game = {
  canvas: undefined,
  ctx: undefined,
  fps: 60,

  start: function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.clickX = undefined;
    this.clickY = undefined;
    this.framesCounter = 0;
    this.reset();
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
        this.click();
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
      }.bind(this)
    );
    //   false
  },
  //generamos nuevos gnomos
  generateGnomos: function() {
    var x = Math.floor(Math.random() * (1350 - 0 + 1) + 0);
    var y = Math.floor(Math.random() * (680 - 375 + 1) + 375);
    this.arrGnomos.push(new Gnomo(this, x, y));
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
  }
  ////////////////////////////
  ////////////////////////////
  /////////////////////////////
};
