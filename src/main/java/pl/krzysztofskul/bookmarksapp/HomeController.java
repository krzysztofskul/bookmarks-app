package pl.krzysztofskul.bookmarksapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import pl.krzysztofskul.bookmarksapp.folder.FolderService;

@Controller
public class HomeController {

    private final FolderService folderService;

    @Autowired
    public HomeController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/home")
    public String home(
    ) {
        return "home";
    }

}
