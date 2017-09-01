(function (global) {

    "use strict";

    var resource = "https://jsonplaceholder.typicode.com/photos";
    $(document).ready(function () {
        global.lazyload = $("div.lazyload");
        global.lazyload.lazyload({
            resource: resource
        });
    });
})(this);