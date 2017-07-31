
(function () {

    "use strict";

    Object.prototype.toString = function () {
        let isFirstProperty = true;
        let stringObject = '{';
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                if (!isFirstProperty) {
                    stringObject += ', ';
                }
                if (this.hasOwnProperty(property)) {
                    stringObject += property + ': ' + this[property];
                }
                isFirstProperty = false;
            }
        }
        stringObject += '}';
        return stringObject;
    };

})();