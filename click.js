var res = undefined;
var canvas = document.getElementById("myCanvas");
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener(
  "click",
  function(evt) {
    res = getMousePos(canvas, evt);
    console.log(res);
  },
  false
);
