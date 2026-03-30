class Sphere {
  constructor(x, y, radius, color, borderColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.borderColor = borderColor;

    this.clicked = false;
    this.offsetX = null;
    this.offsetY = null;

    canvas.addEventListener('mousemove', (e) => {
      this.cursorX = e.offsetX;
      this.cursorY = e.offsetY;
    });
  }

  update() {
    if(this.clicked) {
      this.x = this.cursorX - this.offsetX;
      this.y = this.cursorY - this.offsetY;
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
    this.clicked = false
  }
}