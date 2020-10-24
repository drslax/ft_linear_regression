var data = [];
var table;
var m = 0;
var b = 0;
var typ;
var slider;
var thisalgo = function () {};

var sketch1 = function (p) {
  p.preload = function () {
    table = p.loadJSON("data.json");
  };

  p.setup = function () {
    p.maxX = 0;
    p.maxY = 0;
    p.canvas = p.createCanvas(400, 400);
    p.canvas.parent("canvascontainer");
    slider = p.select("#myRange");
    data = table.data;
    for (var i = 0; i < data.length; i++) {
      p.x = data[i].x;
      p.y = data[i].y;
      p.maxX = p.max(p.x, p.maxX);
      p.maxY = p.max(p.y, p.maxY);
    }
    p.maxX += (p.maxX * 1) / 5;
    p.maxY += (p.maxY * 1) / 5;
    console.log(p.maxX, p.maxY);
    for (var i = 0; i < data.length; i++) {
      data[i].x = data[i].x / p.maxX;
      data[i].y = data[i].y / p.maxY;
    }
  };
  p.drawLine = function () {
    p.x1 = 0;
    p.y1 = m * p.x1 + b;
    p.x2 = 1;
    p.y2 = m * p.x2 + b;

    p.x1 = p.map(p.x1, 0, 1, 0, p.width);
    p.y1 = p.map(p.y1, 0, 1, p.height, 0);
    p.x2 = p.map(p.x2, 0, 1, 0, p.width);
    p.y2 = p.map(p.y2, 0, 1, p.height, 0);
    p.stroke(0);
    p.line(p.x1, p.y1, p.x2, p.y2);
  };
  p.draw = function () {
    p.background(255, 150, 150);
    for (var i = 0; i < data.length; i++) {
      p.x = p.map(data[i].x, 0, 1, 0, p.width);
      p.y = p.map(data[i].y, 0, 1, p.height, 0);
      p.stroke(255);
      p.ellipse(p.x, p.y, 4, 4);
    }
    p.drawLine();
    thisalgo();
  };
};

// Free Hand

var sketch2 = function (p) {
  p.setup = function () {
    p.canvas = p.createCanvas(400, 400);
    p.canvas.parent("canvascontainer");
    slider = p.select("#myRange");
  };
  p.drawLine = function () {
    p.x1 = 0;
    p.y1 = m * p.x1 + b;
    p.x2 = 1;
    p.y2 = m * p.x2 + b;

    p.x1 = p.map(p.x1, 0, 1, 0, p.width);
    p.y1 = p.map(p.y1, 0, 1, p.height, 0);
    p.x2 = p.map(p.x2, 0, 1, 0, p.width);
    p.y2 = p.map(p.y2, 0, 1, p.height, 0);
    p.stroke(0);
    p.line(p.x1, p.y1, p.x2, p.y2);
  };
  p.mousePressed = function () {
    if (p.width <= 400 && p.height <= 400) {
      p.x = p.map(p.mouseX, 0, p.width, 0, 1);
      p.y = p.map(p.mouseY, 0, p.height, 1, 0);
      if (p.x <= 1 && (p.y <= 1) & (p.y >= 0) && p.x >= 0) {
        p.point = p.createVector(p.x, p.y);
        data.push(p.point);
      }
    }
  };
  p.draw = function () {
    p.background(255, 150, 150);
    for (var i = 0; i < data.length; i++) {
      p.x = p.map(data[i].x, 0, 1, 0, p.width);
      p.y = p.map(data[i].y, 0, 1, p.height, 0);
      p.stroke(255);
      p.ellipse(p.x, p.y, 4, 4);
    }
    p.drawLine();
    thisalgo();
  };
};

var myp5 = new p5(sketch1);

function selectAlgo(a) {
  if (a == "bgd" || a == "sgd" || a == "least") {
    typ = a;
  }
  if (typ == "sgd") {
    thisalgo = sgd;
  } else if (typ == "bgd") {
    thisalgo = bgd;
  } else if (typ == "least") {
    thisalgo = leastSquares;
  }
}
