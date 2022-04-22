<%@ taglib prefix="c" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: z0041nhm
  Date: 01.01.2022
  Time: 15:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">

    <title>BOOKMARKS APP</title>

    <!--Bootstrap-->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <!--CSS-->
    <link rel="stylesheet" href="css/style.css">
    <!--jQuery-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <!--JS files-->
    <script src="<c:url value="/js/index.js"/>" type="text/javascript"></script>
    <script src="<c:url value="/js/home.js"/>" type="text/javascript"></script>
</head>
<body>

    <header></header>

    <div id="container-main" class="container-fluid">

        <div class="row">
            <div class="col-12">
                <div id="folder-path-home" class="d-inline-block btn btn-outline-dark">home</div>
                <div id="folder-path-back" class="d-inline-block btn btn-outline-dark">back</div>
                <div id="folder-path" class="d-inline-block"></div>
            </div>
        </div>

        <div id="quickBookmarkAdd" class="disabled"></div>

        <div class="row">
            <div id="menu-folders-tree" class="col-3 text-center">
                <h4 class="title">
                    FOLDERS TREE
                </h4>
                <div class="menu">
                    <div class="input-group mb-3">
                        <input type="text" id="input-new-folder-name" class="form-control" placeholder="NEW FOLDER NAME" aria-label="folder's name" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-outline-success" type="button" id="btn-new-folder">+</button>
                        </div>
                    </div>
                </div>
                <div class="content">
                </div>
            </div>

            <div id="content-main" class="col-9 text-center">
                <h4 class="title">CONTENT</h4>
                <div></div>
            </div>
        </div>

    </div>

    <footer></footer>

</body>
</html>
