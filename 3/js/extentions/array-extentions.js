Array.prototype.toString = function () {
    var stringArray = '[';
    for (var i = 0; i < this.length; i++) {
        if (i > 0) {
            stringArray += ', ';
        }
        stringArray += this[i].toString();
    }
    stringArray += ']';
    return stringArray;
};