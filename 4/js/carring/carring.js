(function (global) {

    "use strict";


    function curry(func, argsCount) {

        if (typeof (argsCount) != "number") {
            argsCount = func.length;
        }


        function curryedFunction(prev) {
            return function () {
                var args = Array.prototype.slice.call(arguments, 0);
                args = prev.concat(args);

                if (args.length < argsCount) {
                    return curryedFunction(args);
                }

                return func.apply(this, args);
            }
        }

        return curryedFunction([]);
    }


    function sum(a, b, c) {
        return a + b + c;
    }


    var curryed = curry(sum);
    var sumOne = curryed(1);
    var sumTwo = sumOne(2);
    var sumThree = sumTwo(3);

    console.log(sumThree);

})(this);