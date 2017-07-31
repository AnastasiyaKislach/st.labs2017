(function () {

    "use strict";

    Array.prototype.toString = function () {
        let stringArray = '[';
        for (let i = 0; i < this.length; i++) {
            if (i > 0) {
                stringArray += ', ';
            }
            stringArray += this[i].toString();
        }
        stringArray += ']';
        return stringArray;
    };

})();