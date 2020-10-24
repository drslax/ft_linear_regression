// stochastic gradient descent
function sgd() {
  var learning_rate = slider.value();
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    var h = m * x + b;
    var error = h - y;
    b -= error * learning_rate;
    m -= x * error * learning_rate;
  }
}

// batch gradient descent
function bgd() {
  var learning_rate = slider.value();
  var tmp_m = 0;
  var tmp_b = 0;
  for (var i = 0; i < data.length; i++) {
    var x = data[i].x;
    var y = data[i].y;
    var h = m * x + b;
    var error = h - y;
    tmp_b += learning_rate * error;
    tmp_m += learning_rate * error * x;
  }
  b -= (1 / data.length) * tmp_b;
  m -= (1 / data.length) * tmp_m;
}
// Least Squares
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
