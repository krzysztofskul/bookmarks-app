$(document).ready(function() {

    //alert("test home.js!"); //ok

    let doWhenSuccessGettingFolders = function (dataGet) {
        if (dataGet.length > 1) { // if dataGet is array of folders
            showFolders(dataGet);
        } else { // if dataGet is a specific folder
            showFolders(dataGet.children);
            setFolderPath(dataGet);
        }
    }

    function init() {

        //testFunction();

        $("header").load("/header.html");
        $("footer").load("/footer.html");
        removeTestDivs();
        if (getActualFolderIdFromUrlParam() != null || getActualFolderIdFromUrlParam() !== undefined) {
            getFolder(getActualFolderIdFromUrlParam());
        } else {
            getFolders1stLevel();
        }

        setQuickBookmarkAddRow();

    }

    function testFunction() {
        console.log(getActualFolderIdFromUrlParam());
    }

    function getActualFolderIdFromUrlParam() {
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("folderId")) {
            return urlParams.get("folderId");
        }
    }

    function getFolders1stLevel() {
        ajaxGet("/bookmarks-app/folders/1st-level", true, doWhenSuccessGettingFolders, "Error while getting 1st level folders!");
    }

    function getFolder(folderId) {
        ajaxGet("/bookmarks-app/folder/"+folderId, true, doWhenSuccessGettingFolders, "Error while getting the folder!");
    }

    function setButtonFunctionality(button) {
        switch (button) {
            case ".btnPathGoTo": {
                $(button).on("click", function () {
                    let folderId = $(this).attr("id").slice(9);
                    location.replace("/folders?folderId=" + folderId);
                });
                break;
            }
            case ".btnGoTo": {
                $(button).on("click", function () {
                    let folderId = $(this).parent().parent().attr("id").slice(9);
                    location.replace("/folders?folderId="+folderId);
                });
                break;
            }
        }

    }

    function setFolderPath(folder) {
        let divToRefresh = $("#folder-path");
        let folderId = folder.id
        let doWhenSuccessWhenGettingFolderToBuildPath = function (folderGet) {
            //alert("let doWhenSuccessWhenGettingFolderToBuildPath = function (folderGet)");
            //divToRefresh.prepend("" +
            $("#folder-path").prepend("" +
                "<div class='d-inline-block'>" +
                "<div class='d-inline-block pl-2 pr-2'>/</div>" +
                "<button class='d-inline-block btn btn-outline-dark btnPathGoTo' id='folderId-"+folderGet.id+"'>"+folderGet.id+" | "+folderGet.name+"</button>" +
                "</div>"
            );

            $("#folder-path-home").on("click", function () {
                location.replace("/home");
                //location.href = "/home";
            });

            $("#folder-path-back").on("click", function () {
                let folderId;
                if ($(this).next().children().length > 1) {
                    folderId = $(this).next().children().last().prev().children().last().attr("id").slice(9);
                    location.replace("/folders?folderId="+folderId);
                } else {
                    location.replace("/home");
                }
            });

            if (folderGet.parent != null) {
                //buildFolderPath(folderGet.parent);
                ajaxGet("/bookmarks-app/folder/"+folderGet.parent, false, doWhenSuccessWhenGettingFolderToBuildPath, "Error while get folder to build folder path!");
            }
        }
        function buildFolderPath() {
            ajaxGet("/bookmarks-app/folder/"+folderId, false, doWhenSuccessWhenGettingFolderToBuildPath, "Error while get folder to build folder path!");
        }

        divToRefresh.empty();
        buildFolderPath();
        setButtonFunctionality(".btnPathGoTo");
    }

    function showFolders(folders) {
        let divToShowFolders = $("#menu-folders-tree div");
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

        setButtonFunctionality(".btnGoTo");

    }

    function ajaxGet(url, asyncMethod, success, error) {
        $.ajax({
            url: url,
            method: "GET",
            dataType: "JSON",
            async: asyncMethod
        }).done(function (dataGet) {
            success(dataGet);
        }).fail(function () {
            alert(error);
        });
    }

    function removeTestDivs() {
        $(".test").each(function () {
            $(this).fadeOut(500);
        });
    }

    function setQuickBookmarkAddRow() {
        let divQuickBookmarkAdd = $("#quickBookmarkAdd")

        divQuickBookmarkAdd.empty().append(
            "<div class='input-group mb-3 pl-5 pr-5 pt-5'>" +
                "<input type='text' class='form-control' disabled placeholder='paste or type url here ...' aria-label='URL' aria-describedby='button-url' id='input-url'>" +
                "<button class='btn btn-outline-success disabled' type='button' id='button-url'>QUICK BOOKMARK ADD</button>" +
            "</div>"
        );

        if (getActualFolderIdFromUrlParam() != null && getActualFolderIdFromUrlParam() !== undefined) {
            divQuickBookmarkAdd.find("input").removeAttr("disabled");
            divQuickBookmarkAdd.find("button").removeClass("disabled");
        }

    }

    init();

});