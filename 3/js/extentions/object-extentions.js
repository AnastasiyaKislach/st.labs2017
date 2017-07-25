Object.prototype.toString = function () {
    var isFirstProperty = true;
    var stringObject = '{';
    for (var property in this) {
        if (!isFirstProperty) {
            stringObject += ', ';
        }
        if (this.hasOwnProperty(property)) {
            stringObject += property + ': ' + this[property];
        }
        isFirstProperty = false;
    }
    stringObject += '}';
    return stringObject;
}