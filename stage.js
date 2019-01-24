var Stagelvl = {
  update: function(stage, ctx) {
    ctx.font = "60px 'ZCOOL KuaiLe'";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillText("Stage: " + stage, 620, 80);
    ctx.strokeText("Stage: " + stage, 620, 80);
  }
};
