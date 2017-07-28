(function (global) {
    'use strict';

    global.partial = function (someFunction) {

        var slice = Array.prototype.slice;
        var argsPartial = slice.call(arguments, 1);

        return function () {
            var argsInner = slice.call(arguments, 0);
            var argsFull = argsPartial.concat(argsInner);
            var result = someFunction.apply(this, argsFull);
            return result;
        }
    }

    function add() {
        var sum = Array.prototype.reduce.call(arguments, function (previousValue, currentValue) {
            return previousValue + currentValue;
        }, 0);
        return sum;
    }

    var result = partial(add, 2);

    var sum = result(3, 4, 5, 6);

    console.log(sum);

})(this);