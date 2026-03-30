const sphere = new Sphere(500, 500, 50, "red", "black")

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sphere.update();
  sphere.draw();
  requestAnimationFrame(loop);
}

function init() {
  canvas.width = 1000;
  canvas.height = 1000;
  loop()
}

init()

canvas.addEventListener("mousedown", event => {
  sphere.mousedown(event);
});

canvas.addEventListener("mouseup", event => {
  sphere.mouseup();
})