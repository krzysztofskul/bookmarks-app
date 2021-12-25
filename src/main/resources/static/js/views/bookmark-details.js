$(document).ready(function () {
    //alert("test bookmark-details.js/jquery for bookmark-details.jsp!"); // ok

    $("#test").fadeOut(1000);

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
                    "bookmark id: " + loadedBookmark.id +
                "</div>" +
                "<div class='card-body'>" +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark folder:</div>" +
                        "<div class='col-8'>"+loadedBookmark.folder.name+"</div>" +
                    "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark name:</div>" +
                        "<div class='col-8'>"+loadedBookmark.name+"</div>" +
                        "<div class='col-1'><button class='btn btn-sm btn-primary'>EDIT</button></div>" +
                    "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark url:</div>" +
                        "<div class='col-8'>"+loadedBookmark.url+"</div>" +
                        "<div class='col-1'><button class='btn btn-sm btn-primary'>EDIT</button></div>" +

            "</div> " +
                    "<div class='row m-1'>" +
                        "<div class='col-3 text-right'>bookmark description:</div>" +
                        "<div class='col-8'>"+loadedBookmark.description+"</div>" +
                        "<div class='col-1'><button class='btn btn-sm btn-primary'>EDIT</button></div>" +
            "</div> " +
                "</div>" +
                "<div class='card-footer'>" +
                "" +
                "</div> " +
            "</div>");
    }

});