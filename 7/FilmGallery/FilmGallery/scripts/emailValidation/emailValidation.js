$.validator.addMethod("emailregex", function (value, element) {

    var regex = new
        RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
    var matches = value.match(regex);
    if (matches && matches.length) {
        var emailValues = value.split('@');
        if (emailValues[emailValues.length - 1] === 'tut.by') {
            return true;
        }
    }
    return false;
});


$.validator.unobtrusive.adapters.add("emailregex", null, function (options) {
    options.rules["emailregex"] = {};
    options.messages["emailregex"] = options.message;
});