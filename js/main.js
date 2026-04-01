const spheres = []

function addCircle() {
  var x = getRandomIntInclusive(0, canvas.width);
  var y = getRandomIntInclusive(0, canvas.height);
  var radius = getRandomIntInclusive(10, 100);
  var mass = getRandomArbitrary(0.1, 10);
  var restitution = getRandomArbitrary(0.1, 1)
  spheres.push(new Sphere(
    x,
    y,
    radius,
    0,
    0,
    mass,
    restitution
  ));
}

function removeCircle() {
  spheres.pop()
}

for (let i=0;i<1;i++) {
  addCircle()
}

function handleCollisions(spheres) {
  for (let i = 0; i < spheres.length; i++) {
    for (let j = i + 1; j < spheres.length; j++) {
      let a = spheres[i];
      let b = spheres[j];

      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let distance = Math.hypot(dx, dy);

      if (distance === 0) continue;

      if (distance < a.radius + b.radius) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let distance = Math.hypot(dx, dy);

        if (distance<=(a.radius + b.radius)) {
          let overlap = (a.radius + b.radius - distance);
          let nx = dx / distance;
          let ny = dy / distance;

          let totalMass = a.mass + b.mass;

          a.x += nx * overlap * (b.mass / totalMass);
          a.y += ny * overlap * (b.mass / totalMass);

          b.x -= nx * overlap * (a.mass / totalMass);
          b.y -= ny * overlap * (a.mass / totalMass);

          let dvx = a.vx - b.vx;
          let dvy = a.vy - b.vy;

          let velAlongNormal = dvx * nx + dvy * ny;

          if (velAlongNormal > 0) continue;

          let e = Math.min(a.restitution, b.restitution);

          let j = -(1 + e) * velAlongNormal;
          j /= (1 / a.mass) + (1 / b.mass);

          a.vx += (j / a.mass) * nx;
          a.vy += (j / a.mass) * ny;
          
          b.vx -= (j / b.mass) * nx;
          b.vy -= (j / b.mass) * ny;
        }
      }
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spheres.forEach(sphere => {
    sphere.update();
    handleCollisions(spheres)
    sphere.draw();
    sphere.vector();
  })

  requestAnimationFrame(loop);
}

function init() {
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