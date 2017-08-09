(function (global) {

    "use strict";


    global.curry = function(func, argsCount, thisArg) {

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

                return func.apply(thisArg, args);
            }
        }

        return curryedFunction([]);
    }


    function sum(a, b, c) {
        return a + b + c;
    }



    function main() {

        console.log("2. Currying");
        console.log("Sum of 1 + 2 + 3");

        var curryed = curry(sum);
        var sumOne = curryed(1);
        var sumTwo = sumOne(2);
        var sumThree = sumTwo(3);

        console.log("Result " + sumThree + "\n\r");

    }

    main();


 

})(this);