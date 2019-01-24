window.onload = function() {
  Game.init("myCanvas");
  Game.showIntro(function() {
    Game.reset();
    Game.start();
  });
};
