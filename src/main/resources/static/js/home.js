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

    function getFolder(folderId) {
        ajaxGet("/bookmarks-app/folder/"+folderId);
    }

    function setFolderPath(folder) {
        let divToRefresh = $("#folder-path");

        if (folder.parent == null) {
            divToRefresh.empty();
        }

        divToRefresh.append("" +
            "<div class='d-inline-block'>" +
                "<div class='d-inline-block pl-2 pr-2'>/</div>" +
                "<button class='d-inline-block btn btn-outline-dark btnPathGoTo' id='folderId-"+folder.id+"'>"+folder.name+"</button>" +
            "</div>"
        );

        $("#folder-path-home").on("click", function () {
            location.replace("/home");
        });

        // $(".btnPathGoTo").on("click", function () { // todo 2022-01-02: go to specific folder from the path
        //     let folderId = $(this).attr("id").slice(9);
        //     getFolder(folderId);
        // });

        // $("#folder-path-back").on("click", function () { // todo 2022-01-02: go to previous folder
        //     // let folderId = $(this).next().children().last().attr("id").slice(9);
        //     let folderId = $(this).next().children().last().children().last().prev().attr("id").slice(9);
        //     alert("folder id to back: "+folderId);
        // });

    }

    let doWhenSuccessGettingFolders = function (dataGet) {
        //alert("Success! 1st level folders downloaded.\nDownloaded "+dataGet.length+" folders.");
        if (dataGet.length > 1) { // if dataGet is array of folders
            showFolders(dataGet);
        } else { // if dataGet is a specific folder
            //alert("folder to show: "+dataGet.name);
            showFolders(dataGet.children);
            setFolderPath(dataGet);
        }
    }

    function showFolders(folders) {
        let divToShowFolders = $("#content-main div");
        divToShowFolders.html("");

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
            let folderId = $(this).parent().parent().attr("id").slice(9);
            getFolder(folderId);
        });

    }

    function ajaxGet(url) {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "JSON"
        }).done(function (dataGet) {
            doWhenSuccessGettingFolders(dataGet);
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