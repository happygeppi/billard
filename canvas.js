function CreateCanvas() {
  Canvas = document.createElement("canvas");
  Canvas.width = w;
  Canvas.height = h;
  Canvas.style.width = `${w}px`;
  Canvas.style.height = `${h}px`;

  document.body.append(Canvas);

  c = Canvas.getContext("2d");
}

function Background(r, g, b) {
  Fill(r, g, b);
  c.fillRect(0, 0, w, h);
}

function Fill(r, g, b) {
  c.fillStyle = `rgb(${r}, ${g}, ${b})`;
}

function Stroke(r, g, b) {
  c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
}

function StrokeWeight(s) {
  c.lineWidth = s;
}

function Line(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  c.closePath();
}

function Circle(x, y, r) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.closePath();
}
