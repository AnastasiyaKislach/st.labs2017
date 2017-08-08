(function ($) {

    "use strict";

    var data = [],
        self;

    var methods = {
        init: function () {
            self = this;
            self
                .on("dragenter",
                    function (e) {
                        e.currentTarget.style.borderColor = "#61696C";
                    })
                .on("drop",
                    function(e) {
                        e.preventDefault();
                        e.currentTarget.style.border = "";
                        var files = e.originalEvent.dataTransfer.files;
                        handlerUploads(files, this);
                        return this;
                    })
                .on("change",
                    function(e) {
                        var files = e.target.files;
                        handlerUploads(files, this);
                        return this;
                    });
        },
        reset: function() {
            return self.unbind(".dragAndDrop");
        },
        getData: function() {
            return data;
        }
    };

    function handlerUploads(files, targetSelector) {
        var length = files.length;

        for (var i = 0; i < length; i++) {
            let f = files[i],
                filename = f.name;

            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = (
                function (e) {
                    var selector = $(".photos");
                    if (!selector.length) {
                        $('#' + targetSelector.id).after(function () {
                            return '<div class="photos"></div>';
                        });
                        selector = $(".photos");
                    }
                    selector.append("<img src='" + e.target.result + "' class='img-responsive image' alt='" + filename + "'/>");

                });
            data.push(f);
            reader.readAsDataURL(f);
        }
    }

    $.fn.draganddrop = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.dragAndDrop');
        }
        return true;
    };

})(jQuery);
