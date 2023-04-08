package pl.krzysztofskul.bookmarksapp.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserControllerRest {

    @GetMapping("/user-logged-in")
    public String getUserLoggedIn(
            @AuthenticationPrincipal UserDetails userDetails
            ) {
        return userDetails.getUsername();
    }

}
