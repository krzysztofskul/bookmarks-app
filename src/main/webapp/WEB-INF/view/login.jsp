<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
    <script src="/resources/static/js/login.js" type="text/javascript"></script>
    <%-- <script src="<c:url value="/js/login.js"/>" type="text/javascript"></script> --%>

</head>
<body>

    <div class="container-fluid">

        <header>
        	<jsp:include page="header.jsp"/>
        </header>

        <div id="content">
            <form name="login" action="/login" method="post">
            <div class="card w-50 ml-auto mr-auto">
                <div class="card-header text-center">
                    <h5>LOG IN FORM JSP</h5>
                </div>
                <div class="card-body ml-auto mr-auto">

                        <div class="row">
                            <div class="col-6">
                                <label for="username">USER:</label>
                            </div>
                            <div class="col-6">
                                <input id="username" type="text" name="username" placeholder="username"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <label for="password">PASSWORD:</label>
                            </div>
                            <div class="col-6">
                                <input id="password" type="password" name="password" placeholder=""/>
                            </div>
                        </div>

                </div>
                <div class="card-footer">
                    <input class="btn btn-outline-success float-right" id="login" name="submit" type="submit" value="LOGIN"/>
                </div>
                <div class="card-footer">
                    <button id="loginAsGuest" class="btn btn-outline-dark float-right"><span>Login as a guest</span></button>
                </div>
            </div>
            </form>
        </div>

        <footer></footer>

    </div>



</body>
</html>

