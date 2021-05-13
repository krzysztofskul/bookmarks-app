package pl.krzysztofskul.bookmarksapp.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import pl.krzysztofskul.bookmarksapp.folder.Folder;
import pl.krzysztofskul.bookmarksapp.folder.FolderService;

@RestController
@RequestMapping("/bookmarks-app")
public class InitDemoController {

    private FolderService folderService;

    @Autowired
    public InitDemoController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/test")
    public ModelAndView test() {
        for (Folder folder : InitDemo.getInstance().getDemoFolderList()) {
            folderService.save(folder);
        }
        return new ModelAndView("redirect:/");
    }

}
