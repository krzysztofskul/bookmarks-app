<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<header class="bg-light">
    <div class="text-center">
		<!-- <svg id="logo-35" width="60px" height="60px" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg> -->
    	<img src="./pics/logoipsum-245.svg" alt="logo"/>
    	<span class="text-logo">bookmarksapp</span>
    </div>
    <menu>
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/home">HOME</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/test">INIT TEST DATA</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#">INIT DEMO DATA</a>
            </li>
            <li class="nav-item">
                <a id="btnMyAccount" class="nav-link" href="#">MY ACCOUNT</a>
            </li>
            <li class="nav-item">	
				<sec:authorize access="isAuthenticated()">
                <a id="btnLogOut" class="nav-link" href="/logout">LOGOUT</a>
                </sec:authorize>
            </li>
        </ul>
    </menu>
</header>