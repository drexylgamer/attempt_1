const spheres = [
  new Sphere(500, 500, 50, 0, 0, 0.9),
  new Sphere(50, 50, 50, 0, 0, 0.9)
]

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spheres.forEach(sphere => {
    sphere.update(spheres);
    sphere.draw();
    sphere.vector();
  })

  requestAnimationFrame(loop);
}

function init() {
  canvas.width = 1000;
  canvas.height = 1000;
  loop();
}

init();

canvas.addEventListener("mousedown", event => {
  spheres.forEach(sphere => {
    sphere.mousedown(event);
  })
});

canvas.addEventListener("mouseup", () => {
  spheres.forEach(sphere => {
    sphere.mouseup();
  })
});