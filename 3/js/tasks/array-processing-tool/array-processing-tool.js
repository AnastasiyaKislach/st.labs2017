(function (global) {

    'use strict';

    global.arrayProcessingTool = global.arrayProcessingTool || new ArrayProcessingTool();

    function ArrayProcessingTool() {

        var self = this;

        self.getMaxSubSum = getMaxSubSum;
        self.getMaxSubSumN = getMaxSubSumN;
        self.min = min;
        self.max = max;
        self.median = median;

        function getMaxSubSum(array) {
            if (!isArray(array)) {
                return NaN;
            }

            var length = array.length;

            if (!isArray(array)) {
                return NaN;
            }

            var maxSubSum = 0, sum = 0;

            for (let i = 0; i < length; i++) {
                for (let p = i; p < length; p++) {
                    sum += array[p];
                    if (sum > maxSubSum) {
                        maxSubSum = sum;
                    }
                }
                sum = 0;
            }

            return maxSubSum;
        };

        function getMaxSubSumN(array) {
            if (!isArray(array)) {
                return NaN;
            }

            var length = array.length;

            var sum = 0;
            var maxSubSum = 0;
            for (let i = 0; i <= length; i++) {
                sum = sum + array[i];
                if (sum < 0) {
                    sum = 0;
                }
                if (maxSubSum < sum) {
                    maxSubSum = sum;
                }
            }
            return maxSubSum;
        };

        function min(array) {
            if (!isArray(array)) {
                return NaN;
            }

            let length = array.length;

            var minValue = array[0];

            for (let i = 1; i < length; i++) {
                if (array[i] < minValue) {
                    minValue = array[i];
                }
            }
            return minValue;
        };

        function max(array) {
            if (!isArray(array)) {
                return NaN;
            }

            let length = array.length;

            var maxValue = array[0];

            for (let i = 1; i < length; i++) {
                if (array[i] > maxValue) {
                    maxValue = array[i];
                }
            }
            return maxValue;
        };

        function median(array) {
            if (!isArray(array)) {
                return NaN;
            }

            let length = array.length;

            array = array.sort(compare);

            var medium;

            if (length % 2 === 0) {
                let left = length / 2 - 1, right = length / 2;
                medium = ((array[left] + array[right])) / 2;
            } else {
                let mediumIndex = Math.round(length / 2);
                medium = array[mediumIndex - 1];
            }
            return medium;
        };

        function isArray(array) {
            if (!array) {
                return false;
            }

            if (array.length <= 0) {
                return false;
            }
            return true;
        };

        function compare(a, b) {
            return a - b;
        };
    }

})(this);