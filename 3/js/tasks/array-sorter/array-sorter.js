(function (global) {

    'use strict';


    global.sorter = global.sorter || new Sorter();

    function Sorter() {
        var self = this;

        self.counting = counting;
        self.cocktail = cocktail;
        self.shell = shell;
        self.bubble = bubble;
        self.selection = selection;
        self.quick = quick;

        function isArray(array) {
            if (!array) {
                return false;
            }

            if (array.length <= 0) {
                return false;
            }
            return true;
        };

        function findMin(arr) {
            if (!isArray(arr)) {
                return NaN;
            }

            var min = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        };

        function findMax(arr) {
            if (!isArray(arr)) {
                return NaN;
            }

            var max = arr[0];
            for (var i = 1; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        };

        function swap(array, i, j) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        };

        function counting(array) {
            if (!isArray(array)) {
                return [];
            }

            var n = array.length;

            var min = findMin(array);
            var max = findMax(array);

            if (min <= max) {

                var b = new Array(max - min + 1);
                var i;
                for (i = 0; i < n; i++) {
                    b[array[i] - min] = 0 + 1;
                }
                i = 0;

                for (var j = min; j <= max; j++) {
                    var c = b[j - min];
                    while (c > 0) {
                        array[i] = j;
                        i++;
                        c--;
                    }
                }
                return array;
            }
            return array;
        };

        function cocktail(array) {
            if (!isArray(array)) {
                return [];
            }

            var left = 0,
                right = array.length - 1,
                count = 0;
            while (left <= right) {
                for (var i = left; i < right; i++) {
                    count++;
                    if (array[i] > array[i + 1]) {
                        swap(array, i, i + 1);
                    }
                }
                right--;

                for (var j = right; j > left; j--) {
                    count++;
                    if (array[j - 1] > array[j]) {
                        swap(array, j - 1, j)
                    }
                }
                left++;
            }
            return array;
        };

        function shell(array) {

            if (!isArray(array)) {
                return [];
            }

            var n = array.length;

            var j;
            var step = Math.floor(array.length / 2);
            while (step > 0) {
                for (var i = step; i < array.length; i++) {
                    var value = array[i];
                    for (j = i - step; (j >= 0) && (array[j] > value) ; j -= step)
                        array[j + step] = array[j];
                    array[j + step] = value;
                }
                step = Math.floor(step / 2);
            }
            return array;
        };

        function bubble(array) {
            if (!isArray(array)) {
                return [];
            }

            var n = array.length;

            var i, j;
            for (i = n - 1; i >= 0; i--) {
                for (j = 0; j < i; j++) {
                    if (array[j] > array[j + 1]) {
                        swap(array, j, j + 1);
                    }
                }
            }

            return array;
        };

        function selection(array) {
            if (!isArray(array)) {
                return [];
            }

            var n = array.length;

            for (var i = 0; i < n - 1; i++) {
                var min = i;

                for (var j = i + 1; j < n; j++) {
                    if (array[j] < array[min]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    swap(array, i, min);
                }
            }
            return array;
        };

        function partition(array, start, end) {
            var marker = start;

            for (var i = start; i <= end; i++) {
                if (array[i] < array[end]) {
                    swap(array, marker, i);
                    marker += 1;
                }
            }

            setTimeout(swap(array, marker, end), 10000000);
            return marker;
        };

        function quick(array, start, end) {
            if (start >= end) {
                return [];
            }

            var n = array.length;

            var pivot;
            setTimeout(function () {
                pivot = partition(array, start, end);
            }, 100000);

            setTimeout(self.quick(array, start, pivot - 1), 10000000);
            setTimeout(self.quick(array, pivot + 1, end), 10000000);

            return array;
        };
    }
})(this);


