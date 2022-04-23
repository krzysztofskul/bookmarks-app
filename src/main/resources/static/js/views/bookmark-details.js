$(document).ready(function () {
    //alert("test bookmark-details.js/jquery for bookmark-details.jsp!"); // ok

    $("#test").fadeOut(100);

    let bookmarkId = $("#bookmarkId").text();
    let divContent = $("#content");
    let loadedBookmark = null;

    console.log("bookmarkId to load: "+bookmarkId);

    loadBookmark();

    function loadBookmark() {
        $.ajax({
            url: "/bookmarks-app/bookmark/"+bookmarkId,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (bookmark) {
            //alert("success! bookmark loaded."); //ok
            loadedBookmark = bookmark;
            refreshDivContent();
        }).fail(function() { // xhr, status, error (?)
            alert("error loading bookmark!");
        });
    }

    function refreshDivContent() {
        divContent.append("" +
            "<div class='card w-75 ml-auto mr-auto'>" +
                "<div class='card-header'>" +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark id:</div>" +
                        "<div class='col-8'>"+ loadedBookmark.id +"</div>" +
                        "<div class='col-1'>" +
                            "<button id='btnDelBookmark' class='btn btn-sm btn-del btn-danger'>DEL</button>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
                "<div class='card-body'>" +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark folder:</div>" +
                        "<div class='col-8'>"+loadedBookmark.folder.name+"</div>" +
                    "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark name:</div>" +
                        "<div id='bookmarkName' class='col-8'>"+loadedBookmark.name+"</div>" +
                        "<div class='col-1'><button id='btnEditBookmarkName' class='btn btn-sm btn-edit btn-primary disabled'>EDIT</button></div>" +
                    "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark url:</div>" +
                        "<div class='col-8'>"+loadedBookmark.url+"</div>" +
                        "<div class='col-1'><button class='btn btn-sm btn-edit btn-primary disabled'>EDIT</button></div>" +
            "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark description:</div>" +
                        "<div class='col-8'>"+loadedBookmark.description+"</div>" +
                        "<div class='col-1'><button class='btn btn-sm btn-edit btn-primary'>EDIT</button></div>" +
            "</div> " +
                "</div>" +
                "<div class='card-footer'>" +
                    "<button class='btn-sm btn-outline-success float-right disabled'>SAVE</button>" +
                "</div> " +
            "</div>"
        );

        $('button.btn-edit').on("click", function() {
            /* tests */
            //console.log("test! Edit button clicked!"); // ok
            //$(this).parent().prev().css("background-color", "red"); // ok

            let divToEdit = $(this).parent().prev();

            let divToEditClassList = divToEdit;
            divToEdit.replaceWith("<input id='input' class='col-8' placeholder='"+divToEdit.text()+"'>");
            divToEdit.addClass(divToEditClassList);

            let btnSave = $('button.btn-outline-success');
            btnSave.removeClass("disabled", "btn-outline-success");
            btnSave.addClass("btn-success");
            btnSave.on("click", function() {
                loadedBookmark.description = $("#input").val();
                putEditedBookmark()
            });
        });

        $("#btnDelBookmark").on("click", function() {
            if (confirm("Confirm that you want to delete bookmark...")) {
                $.ajax({
                    url: "/bookmarks-app/bookmarks/" + loadedBookmark.id,
                    method: "DELETE"
                }).done(function () {
                    alert("success! bookmark deleted!");
                    location.replace("/");
                }).fail(function () {
                    alert("failed! bookmark not deleted!");
                }).always(function () {});
            }

        })

    }

    function putEditedBookmark() {
        //alert("test! btn save works!"); //ok
        $.ajax({
            url: "/bookmarks-app/bookmarks/" + loadedBookmark.id,
            method: "PUT",
            dataType: "json",
            data: loadedBookmark
        }).done(function (){
            alert("success! bookmark updated!");
            location.reload();
        }).fail(function () {
            alert("failed! bookmark not updated!");
        })
    }

});