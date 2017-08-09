(function (global) {

    "use strict";


    global.filter = function (array, callback) {

        var newArray = [];

        var len = array.length;

        for (var i = 0; i < len; i++) {
            var value = array[i];
            var includeInResult = callback(value);
            if (includeInResult) {
                newArray.push(value);
            }
        }
        return newArray;
    }


    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    global.isEven = function (item) {
         return item % 2 === 0;
    }
    
    function main() {

        console.log("6. Filter");
        console.log("array = [" + array.toString() + "]");

        var res = filter(array, isEven);
        console.log("Result (only even members) " + res + "\n\r");

    }

    main();
})(this);