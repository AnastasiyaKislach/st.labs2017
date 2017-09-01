(function ($) {

    "use strict";

    var self;

    var hiddenImgs = [];
    var proportionVal = 0;

    var settings = {
        images: [],
        width: "590px",
        height: "500px",
        min_height: 150
    };


    var methods = {
        init: function (options) {
            if (options) {
                $.extend(settings, options);
            }

            self = this;
            self.css({ width: settings.width, height: settings.height });

            if (settings.resource) {
                $.ajax({
                    method: "GET",
                    url: settings.resource,
                    dataType: "json",
                    success: function (response) {
                        settings.images = response;
                        proportionVal = Math.floor(proportion());
                        hiddenImgs = settings.images;
                        showVisibleImages();
                        $(self)
                            .on("scroll", showVisibleImages);

                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            }

        },
        reset: function () {
            return this.unbind(".lazyload");
        }
    };

    $.fn.lazyload = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.lazyload');
        }
        return true;
    };

    function showFullImage(event) {
        var src = event.data.src;
        $("#fullImg").attr("src", src);
        $("#myModal").modal("show");
    }

    function createTemplate(image) {
        return $("<img />", {
            src: image.thumbnailUrl,
            albumId: image.albumId,
            id: 'imgLazy_' + image.id,
            url: image.url,
            alt: image.title,
            'class': 'trambnail'

        });
    }

    function proportion() {
        var displayHeight = self.get(0).getBoundingClientRect().height;
        return (displayHeight / settings.min_height) * 8;
    }

    function showVisibleImages() {

        var lenght = hiddenImgs.length;
        if (proportionVal > lenght) {
            proportionVal = lenght;
        }
        var i = 0;
        for (i = 0; i < proportionVal; i++) {
            let template = createTemplate(hiddenImgs[i]);
            self.append(template);

            $('#imgLazy_' + hiddenImgs[i].id).on('click', null, { src: hiddenImgs[i].url }, showFullImage);
        }

        hiddenImgs = hiddenImgs.slice(i);
    }

})(jQuery);