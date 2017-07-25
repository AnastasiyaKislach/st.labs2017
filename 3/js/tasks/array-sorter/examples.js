(function () {
    'use strict';

    var arrays = [
        [1, -2, 3, 4, -9, 6],
        [-1, 2, 3, -9],
        [2, -1, 2, 3, -9],
        [-1, 2, 3, -9, 11],
        [-2, -1, 1, 2],
        [100, -9, 2, -3, 5],
        [-1, -2, -3]
    ];

    for (var i = 0; i < arrays.length; i++) {
        console.log(arrays[i].toString());
        console.log("Сортировка подсчетом: ", sorter.counting(arrays[i]));
        console.log("Сортировка смешиванием: ", sorter.cocktail(arrays[i]));
        console.log("Сортировка Шелла: ", sorter.shell(arrays[i]));
        console.log("Пузырьковая сортировка: ", sorter.bubble(arrays[i]));
        console.log("Сортировка выбором: ", sorter.selection(arrays[i]));
        console.log("\n");
    }

})();