class Sphere {
  constructor(x, y, radius, vx, vy, friction) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.friction = friction;

    this.color = "#99582a";
    this.borderColor = "#432818";

    this.clicked = false;
    this.offsetX = null;
    this.offsetY = null;

    canvas.addEventListener('mousemove', (e) => {
      this.cursorX = e.offsetX;
      this.cursorY = e.offsetY;
    });
  }

  update(spheres) {
    this.vx*=this.friction;
    this.vy*=this.friction;

    if (Math.abs(this.vx) < 0.01) this.vx = 0;
    if (Math.abs(this.vy) < 0.01) this.vy = 0;
    
    this.x += this.vx
    this.y += this.vy
    
    if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
        this.vx *= -1;
        this.x = this.x <= this.radius ? this.radius : canvas.width - this.radius;
    }
    if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
        this.vy *= -1;
        this.y = this.y <= this.radius ? this.radius : canvas.height - this.radius;
    }
    
    for(let i=0; i<spheres.length;i++) {
      let other = spheres[i];
      if (other!=this) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let distance = Math.hypot(dx, dy);

        if (distance<=(this.radius + other.radius)) {
          let overlap = (this.radius + other.radius - distance) / 2;
          let nx = dx / distance;
          let ny = dy / distance;

          this.x -= nx * overlap;
                this.y -= ny * overlap;
                other.x += nx * overlap;
                other.y += ny * overlap;

                // Elastic Collision Response
                // 1. Relative velocity
                let dvx = this.vx - other.vx;
                let dvy = this.vy - other.vy;

                // 2. Velocity along normal
                let velAlongNormal = dvx * nx + dvy * ny;

                // Do not resolve if velocities are separating
                if (velAlongNormal > 0) continue;

                // 3. Apply impulse (assuming equal mass for simplicity)
                let j = -(2 * velAlongNormal) / 2; // (1/m1 + 1/m2)
                
                this.vx += j * nx;
                this.vy += j * ny;
                other.vx -= j * nx;
                other.vy -= j * ny;
        }
      }
    }
    
  }

  draw() {
    ctx.beginPath();

    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = 3;
    
    ctx.fill();
    ctx.stroke();

    ctx.lineWidth=1;

    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x+this.vx*5, this.y);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y+this.vy*5);
    ctx.strokeStyle = "green";
    ctx.stroke();
  }

  vector() {
    if (!this.clicked) {
      let distance = Math.hypot(this.vx, this.vy);

      ctx.font = "15px monospace";
      ctx.fillStyle = "black";
      ctx.fillText(distance.toFixed(2), this.x-15, this.y-10);
      return
    }
    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.cursorX, this.cursorY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();

    let distance = Math.hypot((this.cursorX - this.x)/6, (this.cursorY - this.y)/6);

    ctx.font = "15px monospace";
    ctx.fillStyle = "black";
    ctx.fillText(distance.toFixed(2), this.x-45/2, this.y-10);
  }
  
  launch() {
    this.vx = (this.cursorX - this.x)/6;
    this.vy = (this.cursorY - this.y)/6;
    console.log("change")
  }

  mousedown(event) {
    let distance = Math.hypot(event.offsetX - this.x, event.offsetY - this.y);

    if (distance<=this.radius) {
      this.offsetX = event.offsetX - this.x;
      this.offsetY = event.offsetY - this.y;
      this.clicked = true;
    }
  }

  mouseup() {
    if(this.clicked == true) {
      this.launch()
    }
    this.clicked = false
  }
}