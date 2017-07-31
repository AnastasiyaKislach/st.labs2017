(function (global) {

    "use strict";

    function isEmpty(val) {
        return (val === undefined || val == null) ? true : false;
    }

    global.fold = function(array, callback, initialValue) {

        if (!(array && array.length) && isEmpty(initialValue)) {
            console.log("Пустой массив или начальное значение!", 'linear-fold.js', 7);
            return undefined;
        }

        if (array.length === 1 && isEmpty(initialValue)) {
            return array[0];
        }

        if (!isEmpty(initialValue) && !(array && array.length)) {
            return initialValue;
        }

        var previousValue, index;

        if (isEmpty(initialValue)) {
            previousValue = array[0];
            index = 1;

        } else {
            previousValue = initialValue;
            index = 0;
        }

        for (var i = index; i < array.length; i++) {
            previousValue = callback(previousValue, array[i], i, array);
        }

        return previousValue;
    }

    global.add = function(a, b) {
        return a + b;
    }

    var array = [1, 6, 5, 4, 3, 2];

    function main() {

        console.log("3. Linear fold ");

        console.log("array = [" + array.toString() + "]");

        console.log("fold array, method: add, initValue = " + 0);
        var resultSum = fold(array, add, 0);
        console.log("Result " + resultSum + "\n\r");

        console.log("Fold without parameters ");
        resultSum = fold();
        console.log("Result " + resultSum + "\n\r");

        console.log("fold empty array, method: add, initValue = " + 7);
        resultSum = fold([], add, 7);
        console.log("Result " + resultSum + "\n\r");

        console.log("fold one element array, method: add, initValue = " + undefined);
        resultSum = fold([1], add, undefined);
        console.log("Result " + resultSum + "\n\r");

    }

    main();

   

   
})(this);