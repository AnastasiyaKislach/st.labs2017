(function (global) {

    "use srtict";

    global.first = function (array, callback) {
        if (!(array && array.length)) {
            return 0;
        }
        var length = array.length;

        for (var i = 0; i < length; i++) {
            var condition = callback(array[i]);
            if (condition) {
                return array[i];
            }
        }
        return {};
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    var array = ['f', 'l-23', '1k', -6, "lkj", "\\n"];

    function main() {

        console.log("9. First");

        console.log("array = [" + array.toString() + "]");
        console.log("find first numeric ");
        var result = first(array, isNumeric);

        console.log("Result " + result + "\n\r");

    }

    main();
 

})(this);