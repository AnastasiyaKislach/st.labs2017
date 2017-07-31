(function () {
    'use strict';

    var arrays = [
        [1, -2, 3, 4, -9, 6],
        [-1, 2, 3, -9],
        [2, -1, 2, 3, -9],
        [-1, 2, 3, -9, 11],
        [-2, -1, 1, 2],
        [100, -9, 2, -3, 5],
        [1, 2, 3],
        [-1, -2, -3]
    ];
    console.log("5. найти непрерывный подмассив arr, сумма элементов которого максимальна");
    for (var i = 0; i < arrays.length; i++) {
        console.log(arrays[i].toString());
        console.log("Макс. сумма эл-в непрерывного подмассива O(n^2): ", arrayProcessingTool.getMaxSubSum(arrays[i]));
        console.log("Макс. сумма эл-в непрерывного подмассива O(n): ", arrayProcessingTool.getMaxSubSumN(arrays[i]));
        console.log("Максимум: ", arrayProcessingTool.max(arrays[i]));
        console.log("Минимум: ", arrayProcessingTool.min(arrays[i]));
        console.log("Медиана: ", arrayProcessingTool.median(arrays[i]));

        console.log("\n");
    }

    console.log("\n");
})();