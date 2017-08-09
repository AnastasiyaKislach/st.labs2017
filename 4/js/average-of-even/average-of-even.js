(function (global) {

    "use srtict";

    global.findAverageOfEven = function (array) {
        if (!(array && array.length)) {
            return 0;
        }

        var filteredArray = filter(array, isEven);

        var averageOfEven = fold(filteredArray, add) / filteredArray.length;

        return averageOfEven;
    }


    function main() {

        console.log("7.  Average of even numbers ");
        var array = [1, 23, 2, 6, 12, 0];

        console.log("array = [" + array.toString() + "]");


        var result = findAverageOfEven(array);
        console.log("Result " + result + "\n\r");

    }

    main();

})(this);