class Ball {
  constructor(i, x, y, vx, vy, r, g, b, m, rad) {
    this.index = i;
    this.pos = { x, y };
    this.vel = { x: vx, y: vy };
    this.color = { r, g, b };
    this.m = m;
    this.r = rad;
  }

  update() {
    this.checkEdges();
    this.checkCollisions();
    this.move();
    this.show();
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  checkEdges() {
    if (this.pos.x <= this.r) {
      this.vel.x *= -(1 - friction);
      this.pos.x = this.r;
    } else if (this.pos.x >= w - this.r) {
      this.vel.x *= -(1 - friction);
      this.pos.x = w - this.r;
    }

    if (this.pos.y <= this.r) {
      this.vel.y *= -(1 - friction);
      this.pos.y = this.r;
    } else if (this.pos.y >= h - this.r) {
      this.vel.y *= -(1 - friction);
      this.pos.y = h - this.r;
    }
  }

  checkCollisions() {
    for (let i = this.index + 1; i < balls.length; i++)
      this.checkCollision(balls[i]);
  }

  checkCollision(ball) {
    if (this.collides(ball)) this.collide(ball);
  }

  collides = (b) =>
    (this.pos.x - b.pos.x) ** 2 + (this.pos.y - b.pos.y) ** 2 <=
    (this.r + b.r) ** 2;

  collide(ball) {
    // debugger;
    const angle = Math.atan2(ball.pos.y - this.pos.y, ball.pos.x - this.pos.x);
    const x1 = this.vel.x;
    const y1 = this.vel.y;
    const x2 = ball.vel.x;
    const y2 = ball.vel.y;
    const m1 = this.m;
    const m2 = ball.m;
    const fx = Math.cos(angle);
    const fy = Math.sin(angle);

    // const r = fx * (x2 - x1) + fy * (y2 - y1) // only for m1 = m2
    // const r = m1 * fx * x2 + m1 * fy * y2 - m2 * fx * x1 + m2 * fy * y1;
    const r = (2 * m1 * m2 * (fx * (x2 - x1) + fy * (y2 - y1))) / (m1 + m2);

    const u1 = { x: x1 + (fx * r) / m1, y: y1 + (fy * r) / m1 };
    const u2 = { x: x2 - (fx * r) / m2, y: y2 - (fy * r) / m2 };

    this.vel = u1;
    ball.vel = u2;

    ball.pos = {
      x: this.pos.x + (this.r + ball.r + d) * Math.cos(angle),
      y: this.pos.y + (this.r + ball.r + d) * Math.sin(angle),
    };
  }

  show() {
    Fill(this.color.r, this.color.g, this.color.b);
    Circle(this.pos.x, this.pos.y, this.r);
  }
}
