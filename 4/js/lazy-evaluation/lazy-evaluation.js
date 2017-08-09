(function (global) {

    "use srtict";

    global.lazyEval = function (fn) {
        var args = arguments;
        var result;
        var lazyEvaluate = fn.bind.apply(fn, args);
        return function () {
            if (result) {
                return result;
            }
            result = lazyEvaluate();
            return result;
        }
    };

    function add(a, b) {
        return a + b;
    }

    
    function main() {
        console.log("10. Lazy evaluation ");

        const lazyVal = lazyEval(add, 5, 3);

        var result = 0;

        console.log("Result = " + result); 
        console.log("lazyVal = lazyEval(add, 5, 3) ");
        console.log("lazyVal = " + lazyVal); 
        console.log("lazyVal() = " + lazyVal()); 
        console.log(); 

        console.log("\n\r");

    }

    main();

})(this);


