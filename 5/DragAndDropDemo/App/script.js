(function (global) {
    "use strict";

    function showModal() {
        $("#appModal").modal("show");
        $("#appModal").on("hide.bs.modal",
            function () {
                location.reload();
            });
    }

    function loadFiles(draggableElem) {

        var files = draggableElem.draganddrop("getData"),
            length = files.length,
            loaded = 0;

        if (length > 0) {
            for (let i = 0; i < length; i++) {
                let formData = new FormData();
                formData.append("Images", files[i]);

                $.ajax({
                    type: "POST",
                    url: "/api/file",
                    contentType: false,
                    processData: false,
                    data: formData,
                    dataType: 'html',
                    success: function (response) {
                        console.log(response);
                        loaded++;
                        if (loaded === length) {
                            showModal();
                        }
                    }
                });
            }
        }
    }

    function register(e) {
        e.preventDefault();

        var login = $("#login").val(),
            data = $(this).serialize();

        return new Promise(function (resolve, reject) {
            if (!login) {
                reject("Error!");
            } else {
                $.ajax('http://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    data: data,
                    success: function (response) {
                        console.log(response);
                        loadFiles(global.draganddrop);
                    }
                });
                resolve("Worked!");
            }
        });
    }

    $(document).ready(function () {
        global.draganddrop = $("div.draganddrop");
        global.draganddrop.draganddrop();
        var registrationForm = $("#registrationForm");
        registrationForm.submit(register);
    });

})(this);