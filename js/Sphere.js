class Sphere {
  constructor(x, y, radius, vx, vy, mass, restitution) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.restitution = restitution;

    this.color = getRandomHexColor();
    this.borderColor = "#432818";

    this.clicked = false;

    canvas.addEventListener('mousemove', (e) => {
      this.cursorX = e.offsetX;
      this.cursorY = e.offsetY;
    });
  }

  update() {
    
    this.vx*=friction;
    this.vy*=friction;

    if (Math.abs(this.vx) < 0.1) this.vx = 0;
    if (Math.abs(this.vy) < 0.1) this.vy = 0;
    
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
    ctx.lineTo(this.x+Math.abs(this.vx*5), this.y);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y+Math.abs(this.vy*5));
    ctx.strokeStyle = "green";
    ctx.stroke();
  }

  vector() {

    ctx.font = "15px CaskaydiaCove";
    ctx.fillStyle = "black";
    ctx.fillText(`M: ${this.mass.toFixed(2)}`, this.x-30, this.y);
    ctx.fillText(`R: ${this.restitution.toFixed(2)}`, this.x-30, this.y+12);
    if (!this.clicked) {
      
      return
    }
    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.cursorX, this.cursorY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();

    let distance = Math.hypot((this.cursorX - this.x)/6, (this.cursorY - this.y)/6);

    ctx.font = "15px CaskaydiaCove";
    ctx.fillStyle = "black";
    ctx.fillText(`V: ${distance.toFixed(2)}`, this.x-30, this.y-12);
  }
  
  launch() {
    this.vx = (this.cursorX - this.x)/6;
    this.vy = (this.cursorY - this.y)/6;
  }

  mousedown(event) {
    let distance = Math.hypot(event.offsetX - this.x, event.offsetY - this.y);

    if (distance<=this.radius) {
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