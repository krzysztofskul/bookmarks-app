package pl.krzysztofskul.bookmarksapp.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import pl.krzysztofskul.bookmarksapp.folder.Folder;
import pl.krzysztofskul.bookmarksapp.folder.FolderService;
import pl.krzysztofskul.bookmarksapp.user.User;
import pl.krzysztofskul.bookmarksapp.user.UserService;

@RestController
@RequestMapping("/")
public class InitDemoController {

    private FolderService folderService;
    private UserService userService;

    @Autowired
    public InitDemoController(FolderService folderService, UserService userService) {
    	this.userService = userService;
        this.folderService = folderService;
    }

    @GetMapping("/test")
    public ModelAndView test() {
    	User user = userService.loadUserByUsername("userguest");
    	if (folderService.loadAll().size() == 0) {
	        for (Folder folder : InitDemo.getInstance().getDemoFolderList()) {
	            //folder.setUser(user);
	            folder = setUserForAllFolderChildrens(folder, user);
	        	folderService.save(folder);
	            InitDemo.getInstance().reset();
	        }
    	}
        return new ModelAndView("redirect:/");
    }

    private Folder setUserForAllFolderChildrens(Folder folder, User user) {
    	while (folder.getChildren() != null & folder.getChildren().size() > 0 & folder.getUser() == null) {
    		for (Folder folderChildren : folder.getChildren()) {
				setUserForAllFolderChildrens(folderChildren, user);
				folderChildren.setUser(user);
    		}
    		folder.setUser(user);
    	}
    	return folder;
    }
    
}
