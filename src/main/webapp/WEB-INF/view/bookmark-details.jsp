<!DOCTYPE html>
<html lang="en">
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
    <script src="/js/index.js" type="text/javascript"></script>
    <script src="/js/views/bookmark-details.js" type="text/javascript"></script>

</head>
<body>

<div class="container-fluid">

    <header></header>

    <div id="content">
        <div id="test">
            <div id="bookmarkId">${bookmarkId}</div>
            <h1>@test: bookmark details page</h1>
            <p>@test: bookmark id from model: ${bookmark.id}</p>
            <p>@test: bookmark url from model: ${bookmark.url}</p>
        </div>
    </div>

    <footer></footer>

</div>


</body>
</html>