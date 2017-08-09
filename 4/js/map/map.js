(function (global) {

    "use strict";


    global.mapping = function (array, callback) {

        var newArray = [];

        var len = array.length;

        for (var i = 0; i < len; i++) {
            var value = array[i];
            var mappedValue = callback(value);
            newArray.push(mappedValue);
        }
        return newArray;
    }

    var array = [
        {
            id: 1,
            message: "По ссылке вы найдете файл с заданиями 2 по JavaScript"
        },
        {
            id: 4,
            message: "Использовать ветку develop-javascript."
        },
        {
            id: 5,
            message: "Демонстрационная страница index.html для каждого задания"
        },
        {
            id: 6,
            message: "Не использовать сторонние библиотеки."
        },
        {
            id: 8,
            message: "При возникновении любых вопросов обращайтесь. "
        },
        {
            id: 9,
            message: "Успехов!"
        }
    ];


    function main() {

        console.log("5. Map");
        console.log("Creating new array ");
        var res = mapping(array,
               function (item) {
                   return item.message;
               });
        console.log("Result " + res + "\n\r");

    }

    main();


})(this);