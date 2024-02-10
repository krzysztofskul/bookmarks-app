$(document).ready(function() {

    //alert("test home.js!"); //ok

    let doWhenSuccessGettingFolders = function (dataGet) {
        if (dataGet.length > 1) { // if dataGet is array of folders
            showFolders(dataGet);
        } else { // if dataGet is a specific folder
            showFolders(dataGet.children);
            setFolderPath(dataGet);
            showBookmarks(dataGet);
        }
    }

    let successWhenSaveNewBookmark = function () {
        window.location.reload(true);
    }

    let doWhenSuccessCreatingNewFolder = function() {
        window.location.reload(true);
    }

    let errorWhenSaveNewBookmark = function (xhr, status, error) {
        alert("Error while adding new bookmark to db!");
        console.log(xhr.status);
    }

    let successWhenDeleteBookmark = function () {
        window.location.reload(true);
    }

    let successWhenDeleteFolder = function () {
        window.location.reload(true);
    }

    let errorWhenDeleteBookmark = function () {
        alert("Error while deleting bookmark from db!");
    }

    function init() {

        //testFunction();

        $("header").load("./header.html");
        $("footer").load("./footer.html");
        removeTestDivs();
        if (getActualFolderIdFromUrlParam() != null && getActualFolderIdFromUrlParam() !== undefined) {
            getFolder(getActualFolderIdFromUrlParam());
        } else {
            getFolders1stLevel();
        }

        setQuickBookmarkAddRow();
        setAddNewFolderButtonFunctionality();

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
        ajaxGet("/folders/1st-level", true, doWhenSuccessGettingFolders, "Error while getting 1st level folders!");
    }

    function getFolder(folderId) {
        ajaxGet("/folder/"+folderId, true, doWhenSuccessGettingFolders, "Error while getting the folder!");
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
            case "#button-url": {
                let buttonNewUrl = $("#button-url");
                let inputUrl = buttonNewUrl.prev();

                inputUrl.on("keyup", function (event){
                    if (event.keyCode === 13) { // pressed enter key
                        event.preventDefault();
                        buttonNewUrl.click();
                    }
                });

                buttonNewUrl.on("click", function (e) {
                    e.preventDefault();
                    let newUrlToSave = inputUrl.val();
                    saveNewUrl(newUrlToSave);
                });
                break;
            }
            case ".delete-bookmark-btn": {
                $(button).on("click", function(e) {
                    //console.log("click: "+$(this).attr());
                    if (confirm("Confirm bookmark deletion...")) {
                        console.log("bookmark id to delete: "+$(this).attr("id").slice(19));
                        deleteBookmark($(this).attr("id").slice(19));
                    }
                });
                break;
            }
            case ".btnDelFolder": {
                $(button).on("click", function () {
                   if (confirm("Confirm folder deletion (id: "+$(this).parent().parent().attr("id").slice(9)+")... (all sub-folders and bookmarks will be deleted also!)")) {
                       deleteFolder($(this).parent().parent().attr("id").slice(9));
                   }
                });
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
                ajaxGet("/folder/"+folderGet.parent, false, doWhenSuccessWhenGettingFolderToBuildPath, "Error while get folder to build folder path!");
            }
        }
        function buildFolderPath() {
            ajaxGet("/folder/"+folderId, false, doWhenSuccessWhenGettingFolderToBuildPath, "Error while get folder to build folder path!");
        }

        divToRefresh.empty();
        buildFolderPath();
        setButtonFunctionality(".btnPathGoTo");
    }

    function showFolders(folders) {
        let divToShowFolders = $("#menu-folders-tree div.content");
        divToShowFolders.html("");

        folders.forEach(function(element) {
           divToShowFolders.append(
               "<div class='row p-1' id='folderId-"+element.id+"'> "+
                   "<div class='col col-sm-1' style='font-size: 8px'>"+element.id+"</div>" +
                   "<div class='col col-sm-8'>"+element.name+"</div>" +
                   "<div class='col col-sm-1'><button class='btnGoTo btn btn-sm btn-outline-success'> >> </button></div>" +
                   "<div class='col col-sm-1'><button class='btnGoTo btn btn-sm btn-outline-primary'>E</button></div>" +
                   "<div class='col col-sm-1'><button class='btnDelFolder btn btn-sm btn-outline-danger'>X</button></div>" +
               "</div>"
           );
        });

        setButtonFunctionality(".btnGoTo");
        setButtonFunctionality(".btnDelFolder");

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

    function ajaxPost(url, dataToPost, success, error) {
        $.ajax({
            url: url,
            dataType: "JSON",
            type: "POST",
            data: {
                'url': dataToPost
            }
        }).done(function(){
            success();
        }).fail(function(xhr, status, error) {
            error();
        });
    }

    function ajaxPostNewFolderData(url, dataToPost, success, error) {
        $.ajax({
            url: url,
            dataType: "JSON",
            type: "POST",
            data: dataToPost,
        }).done(function(){
        }).done(function(){
            success();
        }).fail(function(xhr, status, error) {
            error();
        });
    }

    function ajaxDelete(url, success, error) {
            $.ajax({
                url: url,
                method: "DELETE"
            }).done(function () {
                success();
            }).fail(function () {
                error();
            }).always(function () {});
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
            setButtonFunctionality("#button-url");
        }

    }

    function showBookmarks(folder) {
        let divForBookmarks = $("#content-main div");


        function createBookmarkDiv(bookmark) {
            return "<div class='card card-bookmark'>"+
                "<div class='card-header'>" +
                "<div class='bookmark-name'>"+bookmark.name+"</div>" +
                "<div class='bookmark-buttons'>" +
                "<a href='#' class='d-inline-block pl-1 text-danger delete-bookmark-btn' id='delete-bookmark-btn"+bookmark.id+"'>DEL</a>" +
                "<a href='/bookmark-details/"+bookmark.id+"' class='d-inline-block text-primary pl-1'>EDIT</a>" +
                "<a href="+bookmark.url+" class='d-inline-block text-success pl-1'>OPEN</a>" +
                "</div> " +
                "</div>"+
                "<div class='card-body'>"+
                "<a href="+bookmark.url+" class='bookmarkUrl'>"+bookmark.url+"</a>" +
                "</div>" +
                "<div class='card-footer'>" +
                "<p>"+bookmark.description+"</p>"+
                "</div> " +
                "</div>"
        }

        folder.bookmarkList.forEach(function(el) {
            divForBookmarks.append(createBookmarkDiv(el));
        });

        setButtonFunctionality(".delete-bookmark-btn");

    }

    function saveNewUrl(newUrlToSave) {

        function cancelSave() {
            alert("Wrong url!")
        }

        function save(newUrlToSave) {
            ajaxPost(
                "/bookmark/quick-add-to-folder/"+getActualFolderIdFromUrlParam(),
                newUrlToSave,
                successWhenSaveNewBookmark,
                errorWhenSaveNewBookmark
            );
        }

        if (newUrlToSave.startsWith("https://") || newUrlToSave.startsWith("http://")) {
            save(newUrlToSave);
            return;
        }
        if (newUrlToSave.startsWith("www.")){
            save("https://"+newUrlToSave)
            return;
        }

        cancelSave();

    }

    function deleteBookmark(bookmarkId) {
        ajaxDelete(
            "/bookmarks/"+bookmarkId,
            successWhenDeleteBookmark,
            errorWhenDeleteBookmark
        );
    }

    function deleteFolder(folderId) {
        ajaxDelete(
            "/folder/"+folderId,
            successWhenDeleteFolder,
            null
        );
    }

    function setAddNewFolderButtonFunctionality() {
        let btnAddNewFolder = $("#btn-new-folder");

        // test
        //btnAddNewFolder.text("test"); //ok

        let actualFolderId = null;
        if (getActualFolderIdFromUrlParam() != null && getActualFolderIdFromUrlParam() !== undefined) {
            actualFolderId = getActualFolderIdFromUrlParam();
        }

        let newFolderName;

        btnAddNewFolder.on("click", function () {
            newFolderName = $("#input-new-folder-name").val();
            // test
            //alert("actual folder id: "+actualFolderId+"\nnew folder name: "+newFolderName); //ok
            ajaxPostNewFolderData("/folder", {'folderName': newFolderName, 'folderParentId': actualFolderId}, doWhenSuccessCreatingNewFolder, null);
        });

    }

    init();

});