$(document).ready(function () {
    alert("test bookmark-details.js/jquery for bookmark-details.jsp!"); // ok

    //$("#test").fadeOut(1000);

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
            alert("success! bookmark loaded.");
            loadedBookmark = bookmark;
            refreshDivContent();
        }).fail(function() { // xhr, status, error (?)
            alert("error loading bookmark!");
        });
    }

    function refreshDivContent() {
        divContent.append("" +
            "<div class='card'>" +
            "<div class='card-header'>" +
            "<p>test</p>" +
            "</div>" +
            "<div class='card-body'>" +
            "bookmark loaded id: " + loadedBookmark.id +
            "</div>" +
            "<div class='card-footer'>" +
            "" +
            "</div> " +
            "</div>");
    }

});