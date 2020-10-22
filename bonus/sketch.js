var data = [];
var m = 0;
var b = 0;
var slider

function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent("canvascontainer")
  slider = select("#myRange")
  console.log(canvas)
}

function gradientDescent() {
  var learning_rate = slider.value();
  var insText = document.querySelector("#l_r");
  insText.innerHTML = `Learning rate : ${slider.value()}`
  console.log(learning_rate)
  var tmp_m = 0;
  var tmp_b = 0;
  var prevM = m;
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    var h = m * x + b;
    var error = h - y;
    tmp_b += learning_rate * (1 / data.length) * error;
    tmp_m += learning_rate * (1 / data.length) * error * x;
  }
  b -= tmp_b;
  m -= tmp_m;
  if (Math.abs(m - prevM) < 0.0000001) {
    noLoop();
  }

}

function leastSquares() {
  var xsum = 0;
  var ysum = 0;
  for (var i = 0; i < data.length; i++) {
    xsum += data[i].x;
    ysum += data[i].y;
  }
  var xmean = xsum / data.length;
  var ymean = ysum / data.length;
  var num = 0;
  var den = 0;

  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    num += (x - xmean) * (y - ymean);
    den += (x - xmean) * (x - ymean);
    m = num / den;
    b = ymean - m * xmean;
  }
}

function drawLine() {
  var x1 = 0;
  var y1 = m * x1 + b;
  var x2 = 1;
  var y2 = m * x2 + b;

  x1 = map(x1, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  x2 = map(x2, 0, 1, 0, width);
  y2 = map(y2, 0, 1, height, 0);
  stroke(0);
  line(x1, y1, x2, y2);
}

function mousePressed() {
  if (width <= 400 && height <= 400) {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);
    if (x <= 1 && y <= 1 & y >= 0 && x >= 0) {
      var point = createVector(x, y);
      data.push(point);
    }
  }
}

function draw() {
  background(255, 150, 150);
  for (var i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    stroke(255);
    ellipse(x, y, 4, 4);
  }
  if (data.length > 1) {
    gradientDescent();
    //leastSquares();
    drawLine();
  }
}
