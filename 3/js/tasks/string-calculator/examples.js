(function () {
    'use strict';

    var expressions = [
        " 12 + 3.5 * 5 - 7 / 3.1",
        "3 + 4 * 2 / (1 - 5)*2",
        "0.1+ 0.2",
        "0.23 +0.6966 / 3 + 45*68 -1"
    ];

    console.log("2. Разработать объект содержащий набор методов для выполнения функций калькулятора ");
    for (var i = 0; i < expressions.length; i++) {
        console.log(expressions[i]);
        console.log("Обратная польская запись: ",
            calculator.outputString(expressions[i]));
        console.log("Результат вычисления выражения: ",
            calculator.calculate(expressions[i]));
        console.log("\n");
    }
    console.log("\n");

})();