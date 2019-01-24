var ScoreBoard = {
  update: function(score, ctx) {
    ctx.font = "80px 'ZCOOL KuaiLe'";

    ctx.fillStyle = "black";
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;

    ctx.fillText("Dead gnomes: " + score, 430, 150);
    ctx.strokeText("Dead gnomes: " + score, 430, 150);
  }
};
