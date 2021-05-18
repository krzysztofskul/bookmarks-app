$(document).ready(function () {

    // alert("test div-id-content.js"); // ok

    let folderAll;
    let folder1stLeverList;
    let actualFolderId;
    let actualFolder;

    /**
     * functions' definitions
     */

    function init() {
        getUserLoggedIn();
        getAllFolders();
        get1stLevelFolders();
        recreateContentDiv();
        generateActualFolderDiv(null);
    }

    function getUserLoggedIn() {
        $.ajax({
            url: "/bookmarks-app/user-logged-in",
            data: {},
            type: "GET",
            dataType: "text"
        }).done(function(username) {
            console.log("User logged in: "+username);
        }).fail(function () {
            console.log("Not recognized who is logged in!");
        });
    }

    function getAllFolders() {
        $.ajax({
            url: "/bookmarks-app/folders/all",
            data: {},
            method: "GET",
            dataType: "JSON"
        }).done(function (folderList) {
            folderAll = folderList;

        }).fail(function () {
            alert("Error while loading folder list!");
        });
    }

    function generateActualFolderDivByFolderId(folderId) {

        if (folderId != null) {
            $.ajax({
                url: "/bookmarks-app/folder/" + folderId,
                data: {},
                method: "GET",
                dataType: "JSON"
            }).done(function (folderLoaded) {
                actualFolder = folderLoaded;
                actualFolderId = folderLoaded.id;
            }).fail(function () {
                alert("error while loading specific folder!");
                actualFolderId = 0;
                actualFolder = null;
            }).always(function(){
                $('#folder-actual-div').empty();
                createFolderHeader();
                showFolderPath(actualFolder);
                showSubfolders(actualFolder);
                showBookmarks(actualFolder);
            });
        } else {
            actualFolderId = 0;
            actualFolder = null;

            $('#folder-actual-div').empty();
            createFolderHeader();
            showFolderPath(folder);
            showSubfolders(folder);
            showBookmarks(folder);
        }
    }

    function createBookmarkDiv(bookmark) {
        return "<div class='card card-bookmark'>"+
            "<div class='card-header'>" +
            "<div class='bookmark-name'>"+bookmark.name+"</div>" +
            "<div class='bookmark-buttons'>" +
            "<a href='#' class='d-inline-block text-danger pl-1'>DEL</a>" +
            "<a href='/bookmarks-app/bookmark-details/"+bookmark.id+"' class='d-inline-block text-primary pl-1' target='_blank'>EDIT</a>" +
            "<a href='#' class='d-inline-block text-success pl-1'>OPEN</a>" +
            "</div> " +
            "</div>"+
            "<div class='card-body'>"+
            "<a href='#'>"+bookmark.url+"</a>" +
            "</div>" +
            "<div class='card-footer'>" +
            "<p>"+bookmark.description+"</p>"+
            "</div> " +
            "</div>"
    }

    function recreateContentDiv() {
        $("#content").empty().append(
            "<div class='row ml-1 mr-1'>" +
                "<div class='col-3 border p-0'>" +
                    "<div id='folders-tree' class=' m-0' style='min-height: 480px'>" +
                        "<h4 class='border-bottom border-top bg-light text-center'>ALL FOLDERS TREE</h4>" +
                        "<p class='border-bottom border-top bg-light text-center'>in progress ...</p>" +
                    "</div>" +
                "</div> " +
                "<div class='col-9 border p-0'>" +
                    "<div id='folder-actual-div' class='border-left m-0 p-3' style='min-height: 480px'>" +
                        "<h4 class='border-bottom border-top text-center bg-light'>FOLDER</h4>" +
                    "</div>" +
                "</div> " +
            "</div>"
        );

    }

    function showFoldersTree(folderList) {
        // alert("show folders tree function test ..."); // ok
        folderList.forEach(function (element) {
            $("#folders-tree").empty().append(
                "<p class='m-1'>ID: " + element.id + " | " + element.name
            );
        });
    }

    function goToFolderFunctionality() {
        $('.btn-go-to-folder').click("on", function() {
            // alert("test goToFolderFunctionality();"+this.innerHTML); // test ok

            // get folder id to show
            let folderIdToShow = this.parentElement.firstElementChild.innerHTML;

            // generate folder to show div
            generateActualFolderDiv(folderAll[folderIdToShow-1]);

        });
    }

    function generateFolderStructure(folderList) {
        folderList.forEach(function (e) {
            if (e.parent == null) {
                $('#folders-tree')
                    .append(
                        //'<p>'+e.id+' | '+e.name+'</p>'
                        "<div class='mt- border-top border-bottom' style='height: 35px'>" +
                            "<div class='d-inline-block' style='width: 35px'>"+e.id+"</div>" +
                            "<div class='d-inline-block'>"+e.name+"</div>" +
                            "<div class='btn btn-sm btn-outline-success d-inline-block float-right btn-go-to-folder'> >>> </div>" +
                        "</div>" +
                        "<br>"
                    );
                if (null != e.children && 0 < e.children.length) {
                    e.children.forEach(function (child) {
                        $("#folders-tree")
                            .append(
                                //"<div class='pl-1 m-1 d-block'>"+child.id+" | "+child.name+"<span class='ml-5 border'>>></span></div>"
                                "<div class='mt-1 border-top border-bottom' style='height: 35px'>" +
                                    "<div class='d-inline-block bg-light' style='width: 35px'>"+child.id+"</div>" +
                                    "<div class='d-inline-block'>"+child.name+"</div>" +
                                    "<div class='btn btn-sm btn-outline-success d-inline-block float-right btn-go-to-folder'> >>> </div>" +
                                "</div>" +
                                "<br>"
                            );
                    });
                }
                if (null != e.bookmarkList && 0 < e.bookmarkList.length) {
                    e.bookmarkList.forEach(function (bookmarkElement) {
                        $("#folders-tree")
                            .append(
                                "<a href='#' class='pl-1 m-1 d-block'>"+bookmarkElement.url+"</a>"
                            );
                    });
                }
            }
        });

    }

    function saveNewUrl(newUrlToSave) {
        $.ajax({
            url: "/bookmarks-app/bookmark/quick-add-to-folder/"+actualFolderId,
            dataType: "JSON",
            type: "POST",
            data: {
                'url': newUrlToSave
            }
        }).done(function(){
            generateActualFolderDiv(actualFolder);
        }).fail(function() {
            alert("Error while adding new bookmark to db!");
        });
    }

    function createFolderHeader() {

        $("#folder-actual-div").append(
            // folder path
            "<div class='row border-top border-bottom bg-light pl-1 pr-1 ml-0 mr-0'>" +
                "<div class='col-12 p-3' id='folderPathParagraph'>" +
                    "<p>root /</p>" +
                "</div>" +
            "</div>" +
            // quick bookmark add
            "<div class='input-group mb-3 pl-5 pr-5 pt-5'>" +
                "<input type='text' class='form-control' placeholder='paste or type url here ...' aria-label='URL' aria-describedby='button-url' id='input-url'>" +
                "<button class='btn btn-outline-success' type='button' id='button-url'>QUICK BOOKMARK ADD</button>" +
            "</div>"
        );

        let buttonNewUrl = $("#button-url");

        buttonNewUrl.on("click", function (e) {
            e.preventDefault();
            let newUrlToSave = $("#input-url").val();
            saveNewUrl(newUrlToSave);
        });

    }

    function showFolderPath(folder) {

        if (folder != null) {

            // generate folder path functionality
            let folderPath = " / " + folder.name;

            function generateFolderPath(folder) {
                if (folder.parent !== null) {
                    let folderObject = folderAll[folder.parent - 1];
                    folderPath = " / " + "<a href='#' class='folder-goto-path-button' id="+folderObject.id+">"+folderObject.name+"</a>" + folderPath;
                    generateFolderPath(folderObject);
                } else {
                    folderPath = "<a class='a-root-folder' href='#'>root</a>" + folderPath;
                }
            }

            generateFolderPath(folder);

            // append folder path string to the div
            $("#folderPathParagraph").empty().append(
                "<a href='#'>" + folderPath + "</a>"
            );

            $(".a-root-folder").on("click", function () {
                // alert("@test: click .a-root-folder"); // ok
                generateActualFolderDiv(null);
            });

            $(".folder-goto-path-button").on("click", function (element) {
                element.preventDefault();
                //alert("@test: goto folder from the path!"); //ok
                let folderId = $(this).attr('id');
                generateActualFolderDivByFolderId(folderId)
            })
        }

    }

    function btnEditFolderUpdate() {
        $('#folder-actual-div .btn-edit-bookmark').on("click", function (event) {
        });
    }

    function showSubfolders(folder) {
        // header
        $("#folder-actual-div").append(
            "<div class='row border-top border-bottom bg-light pl-1 pr-1 ml-0 mr-0 mt-5 mb-1 font-weight-bold'>" +
                "<div class='col-12'>" +
                    "<p>SUB-FOLDERS:</p>" +
                "</div>" +
            "</div>"
        );

        // sub-folder list
        if (folder == null) {

            folder1stLeverList.forEach(function (e) {
                $("#folder-actual-div").append(

                    "<div class='row p-1'>" +
                    "   <div class='col-3 border-right m-2 folder-id' style='width: 50px'>"+e.id+"</div> " +
                    "   <div class='col-6 m-2'>"+e.name+"</div> " +
                    "   <div class='col-1 btn text-success border-left folder-goto-button'> >>> </div> " +
                    "   <div class='col-1 btn text-primary border-left btn-edit-folder'>EDIT</div> " +
                    "   <div class='col-1 btn text-danger border-left border-right'>DEL</div> " +
                    "</div>"

                );
                $("#folder-actual-div .folder-goto-button").on("click", function (e) {
                    let folderId = this.parentElement.firstElementChild.innerHTML;
                    generateActualFolderDiv(folderAll[folderId-1]);
                });
            });
        } else {
            folder.children.forEach(function (e) {
                $("#folder-actual-div").append(

                    "<div class='row p-1'>" +
                    "   <div class='col-3 border-right m-2 folder-id' style='width: 50px'>"+e.id+"</div> " +
                    "   <div class='col-6 m-2'>"+e.name+"</div> " +
                    "   <div class='col-1 btn text-success border-left folder-goto-button'> >>> </div> " +
                    "   <div class='col-1 btn text-primary border-left btn-edit-folder'>EDIT</div> " +
                    "   <div class='col-1 btn text-danger border-left border-right'>DEL</div> " +
                    "</div>"

                );
                $("#folder-actual-div .folder-goto-button").on("click", function (e) {
                    let folderId = this.parentElement.firstElementChild.innerText;
                    generateActualFolderDiv(folderAll[folderId-1]);
                });
            });
        }

        //goto folder functionality
        $('.btn-go-to-folder').click("on", function() {
            alert("test goToFolderFunctionality();"+this.innerHTML); // test ok

            // get folder id to show
            let folderIdToShow = this.parentElement.firstElementChild.innerHTML;

            // generate folder to show div
            generateActualFolderDiv(folderAll[folderIdToShow-1]);

        });

        // edit bookmark
        btnEditFolderUpdate();

        // new folder button
        $("#folder-actual-div").append(
            "<div class='row p-1'>" +
            "   <div class='col-3 btn btn-outline-success ml-2' id='btn-new-folder'>+ NEW FOLDER</div> " +
            "</div>"
        );

        function btnNewFolderUpdate() {

                $("#btn-new-folder").on("click", function () {
                    $(this).before(
                        '<input type="text" class="form-control col-9 d-inline-block w-25" id="new-folder-name">'
                    );
                    $(this).unbind("click");
                    $(this).on("click", function() {
                        let folderParentId = null
                        if (actualFolder !== null) {
                            folderParentId = actualFolder.id;
                        }
                        $.ajax({
                            url: "/bookmarks-app/folder/",
                            dataType: "text",
                            type: "POST",
                            data: {
                                'folderName':  $("#new-folder-name").val(),
                                'folderParentId': folderParentId,
                            }
                        }).done(function(){
                            getAllFolders();
                            if (folderParentId == null) {
                                generateActualFolderDiv(null);
                            } else {
                                generateActualFolderDiv(actualFolder);
                            }
                        }).fail(function() {
                            alert("Error while adding new folder to db!");
                        });
                    });
                });
        }

        btnNewFolderUpdate();

    }

    function showBookmarks(folder) {

        function appendBookmarksHeaderDiv() {
            $("#folder-actual-div").append(
                "<div class='row border-top border-bottom bg-light pl-1 pr-1 ml-0 mr-0 mt-5 mb-1 font-weight-bold'>" +
                "<div class='col-12'>" +
                "<p>BOOKMARKS:</p>" +
                "</div>"
            );
        }

        function appendBookmarkDiv() {
            if (folder !== undefined && folder !== null) {
                folder.bookmarkList.forEach(function (e) {
                    $("#folder-actual-div").append(
                        createBookmarkDiv(e)
                    );
                });
            }
        }

        appendBookmarksHeaderDiv();
        appendBookmarkDiv();

    }

    function get1stLevelFolders() {
        $.ajax({
            url: "/bookmarks-app/folders/1st-level",
            data: {},
            method: "GET",
            dataType: "JSON"
        }).done(function (folderList) {
            folder1stLeverList = folderList;
            console.log(folder1stLeverList);
        }).fail(function() {
            alert("Error while loading 1st level folder list!");
        });
    }

    function generateActualFolderDiv(folder) {

        let url;

        if (folder != null) {
            url = "/bookmarks-app/folder/"+folder.id;
        } else if (folder == null) {
            url = "/bookmarks-app/folders/1st-level"
        }

        $.ajax({
            url: url,
            method: "GET",
            data: {},
            dataType: "JSON"
        }).done(function (dataGet) {
            if (folder != null) { // get folder
                actualFolder = dataGet;
                actualFolderId = dataGet.id;
            } else { // get folders list
                folder1stLeverList = dataGet;
                actualFolderId = 0;
                actualFolder = null;
            }
        }).fail(function () {
            if (folder != null) { // get folder
                alert("error while loading folder!");
            } else { // get folders list
                alert("error while loading folders!");
            }
            actualFolderId = 0;
            actualFolder = null;
        }).always(function () {
            $('#folder-actual-div').empty();
            createFolderHeader();
            showFolderPath(actualFolder);
            showSubfolders(actualFolder);
            showBookmarks(actualFolder);
            if (actualFolder == null) {
                $("#input-url").attr("disabled", true);
                $("#button-url").attr("disabled", true);
            }
        });

    }

    /**
     * end of functions' definitions
     */

    init();

});