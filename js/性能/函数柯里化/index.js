function Curry(fn, length = fn.length) {
  return function () {
    if (length > arguments.length) {
      var arg = [].slice.call(arguments, 0);
      return Curry(fixParams.apply(this, [fn, ...arg]), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  }
}
function fixParams(fn) {
  var arg = [].slice.call(arguments, 1);
  return function () {
    var _arg = [].slice.call(arguments, 0);
    return fn.apply(this, [...arg, ..._arg]);
  }
}

function add(a, b, c, d) {
  return a + b + c + d;
}

var curryAdd = new Curry(add);

var res0 = curryAdd(1)(3, 4)(10);

var res1 = curryAdd(31, 2);
var res2 = res1(4, 10)

console.log(res0, res2);