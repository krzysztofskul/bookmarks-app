$(document).ready(function() {

    //alert("test home.js!"); //ok

    init();

    function init() {
        $("header").load("/header.html");
        $("footer").load("/footer.html");
        removeTestDivs();
        getFolders1stLevel("/bookmarks-app/folders/1st-level");
    }

    function getFolders1stLevel(url) {
        ajaxGet(url)
    }

    let doWhenSuccess = function (dataGet) {
        //alert("Success! 1st level folders downloaded.\nDownloaded "+dataGet.length+" folders.");
        showFolders(dataGet);
    }

    function showFolders(folders) {
        let divToShowFolders = $("#home");

        folders.forEach(function(element) {
           divToShowFolders.append(
               "<div class='row p-1' id='folderId-"+element.id+"'> "+
                   "<div class='col-sm-1 border bg-light'>"+element.id+"</div>" +
                   "<div class='col-sm-8'>"+element.name+"</div>" +
                   "<div class='col-sm-2'><button class='btn btn-sm btn-primary btnGoTo'>GO TO</button></div>" +
                   "<div class='col-sm-1'><button class='btn btn-sm btn-danger'>DEL</button></div>" +
               "</div>"
           );
        });

        $(".btnGoTo").on("click", function () {
            alert("test btnShowFolder!\nFolder od to go to: "+$(this).parent().parent().attr("id").slice(9));
        });


    }

    function ajaxGet(url) {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "JSON"
        }).done(function (dataGet) {
            doWhenSuccess(dataGet);
        }).fail(function () {
            alert("error while get 1st level folders!");
        })

    }

    function removeTestDivs() {
        $(".test").each(function () {
            $(this).fadeOut(500);
        });
    }

});