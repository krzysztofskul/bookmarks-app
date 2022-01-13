$(document).ready(function () {
    //alert("test index.js/jquery for index.html!"); // ok

    $("header").load("/header.html");
    $("footer").load("/footer.html");

    getUserLoggedIn();

    function getUserLoggedIn() {
        $.ajax({
            url: "/bookmarks-app/user-logged-in",
            data: {},
            type: "GET",
            dataType: "text"
        }).done(function(username) {
            console.log("User logged in: "+username);
            $("#btnMyAccount").removeClass("disabled");
            $("#btnLogOut").removeClass("disabled");
        }).fail(function () {
            console.log("Not recognized who is logged in!");
        });
    }

});