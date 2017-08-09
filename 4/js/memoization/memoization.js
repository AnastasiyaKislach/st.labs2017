(function (global) {

    "use strict";

    function add(a, b) {
        return a + b;
    }

    global.cache = new Object();

    global.memoized = function (fn) {
        var fnName = fn.name;

        return function () {
            var expression = fnName;
            var args = arguments;
            for (var i = 0; i < args.length; i++) {
                expression += " " + args[i];
            }

            if (cache[expression]) {
                console.log("Fetched from cache");
                return cache[expression];
            } else {
                var result = fn.apply(this, args);
                cache[expression] = result;
                console.log("Just calculated");
                return result;
            }
        }
    }

    function main() {

        console.log("11. Memoization ");

        console.log("newAdd = memoized(add)");
        console.log("newAdd = " + memoized(add));

        var newAdd = memoized(add);

        console.log("newAdd(9, 1) = " + newAdd(9, 1));
        console.log("newAdd(9, 1) = " + newAdd(9, 1));
        console.log("newAdd(5, 7) = " + newAdd(5, 7));
        console.log("newAdd(6, 8) = " + newAdd(6, 8));

        for(var key in cache)
            if (cache.hasOwnProperty(key))
                console.log("Key = " + key + ", value = " + cache[key] + "\n\r");

    }

    main();

})(this);