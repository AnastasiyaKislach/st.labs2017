(function () {
    "use strinct";

    function isEmpty(val) {
        return (val === undefined || val == null) ? true : false;
    }


    function unfoldWith(callback, initialValue) {
        var result = [];

        if (isEmpty(initialValue)) {
            return result;
        }
        while (initialValue){
           result.push(initialValue); 
            initialValue = callback(initialValue);
        }
        
        return result;
    }



    function decrement(initialValue) {
        return initialValue > 0
                        ? initialValue - 1
                            : false;
    }

    var initVal = 15;

    var result = unfoldWith(decrement, initVal);

    console.log(result);

})();