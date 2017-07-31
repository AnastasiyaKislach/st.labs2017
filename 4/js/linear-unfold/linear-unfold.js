(function (global) {
    "use strinct";

    function isEmpty(val) {
        return (val === undefined || val == null) ? true : false;
    }


    global.unfold = function (callback, initialValue) {
        var array = [];

        if (isEmpty(initialValue)) {
            return array;
        }

        var result = callback(initialValue);

        while (!result.done) {
            array.push(result.element);
            result = callback(result.next);
        }

        return array;
    }



    function decrement(initialValue) {
        return initialValue > 0
            ? {
                element: initialValue,
                next: initialValue - 1
            }
            : { done: true };
    }


    function main() {

        console.log("4. Linear unfold ");
        console.log("Positive decrement sequence is starting from 15");
        var initVal = 15;
        var result = unfold(decrement, initVal);

        console.log("Result " + result + "\n\r");

    }

    main();

})(this);