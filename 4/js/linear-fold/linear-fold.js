(function () {

    "use strict";

    function isEmpty(val) {
        return (val === undefined || val == null) ? true : false;
    }

    function foldArray(array, callback, initialValue) {

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

    function sum(a, b) {
        return a + b;
    }

    var array = [1, 6, 5, 4, 3, 2];

    var resultSum = foldArray(array, sum, 0);

    console.log(resultSum);

    resultSum = foldArray();

    console.log(resultSum);

    resultSum = foldArray([], sum, 7);

    console.log(resultSum);

    resultSum = foldArray([1], sum, undefined);

    console.log(resultSum);
})();