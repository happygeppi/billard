const w = innerWidth;
const h = innerHeight;
let Canvas, c;

let draw;
let drawing = true;

const balls = [];
let N = 100;
const radMult = 15; // mass per area
const d = 0;
const mag = 7;
const friction = 0.0;

// d = m / V = m / pi*r**2 -> r = sqrt(m / (pi*d))
const radius = (mass) => Math.floor(radMult * Math.sqrt(mass));
const random = (a, b) => Math.random() * (b - a) + a;
const randomInt = (a, b) => Math.floor(Math.random() * (b - a) + a);

function Init() {
  CreateCanvas();
  InitBalls();
  Draw();
}

function InitBalls() {
  const bigM = 10;
  balls.push(new Ball(0, w / 2, h / 2, 0, 0, 255, 0, 0, bigM, radius(bigM)));

  for (let i = balls.length; i < N; i++) {
    let x, y, m, r;
    m = 1;
    do {
      // m = random(0.1, 10);
      r = radius(m);
      x = randomInt(r, w - r);
      y = randomInt(r, h - r);
    } while (!isValid(x, y, r));

    const vx = randomInt(-mag, mag);
    const vy = randomInt(-mag, mag);
    const c = { r: random(0, 255), g: random(0, 255), b: random(0, 255) };
    balls.push(new Ball(i, x, y, vx, vy, c.r, c.g, c.b, m, r));
  }
}

function isValid(x, y, r) {
  if (balls.length == 0) return true;

  for (const ball of balls)
    if (ball.collides({ pos: { x, y }, r })) return false;
  return true;
}

function Draw() {
  Background(0, 0, 0);

  for (const ball of balls) ball.update();

  if (drawing) draw = requestAnimationFrame(Draw);
  else draw = cancelAnimationFrame(draw);
}

document.addEventListener("keypress", (e) => {
  if (e.key == " ") {
    drawing = !drawing;
    if (drawing) Draw();
  }
});

Init();

/*

todo:
chunks for faster collision checks
smaller dt --> more accurate collisions

ideas:
puckball (arcade game)
random number generator -> PI ?

*/
