$(document).ready(function () {
    //console.log("test login.js/jquery for login.html!") //ok

	/*$("header").load("/header.html");*/
    $("footer").load("/footer.html");

    loginAsGuestFunc();

    function loginAsGuestFunc() {

        $("#loginAsGuest").on("click", function () {
            alert("test button login as a guest!"); //ok
        $("#username").val("userguest");
        $("#password").val("test");
        $("#login").trigger("click");

        })
    }

});