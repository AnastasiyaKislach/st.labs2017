(function (global) {

    "use strict";

    global.createRandom = function (min, max, conditionVal) {

        return conditionVal > 0
                    ? {
                        element: Math.floor(Math.random() * (max - min)) - min,
                        next: conditionVal - 1
                    }
                    : { done: true };
    }

    global.sumOfRandom = function (count) {

        var sum = 0;
        var randomArr = [];

        var createRandomFn = partial(createRandom, 0, 100);

        randomArr = unfold(createRandomFn, count);
        console.log(randomArr);

        sum = fold(randomArr, add);

        return sum;
    }


    function main() {

        console.log("8. Sum of 10 random numbers  ");
        var result = sumOfRandom(10);
        console.log("Result " + result + "\n\r");

    }

    main();

})(this);