package pl.krzysztofskul.bookmarksapp.folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pl.krzysztofskul.bookmarksapp.user.User;
import pl.krzysztofskul.bookmarksapp.user.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/")
public class FolderControllerRest {

    private FolderService folderService;
    private UserService userService;
    
    @Autowired
    public FolderControllerRest(FolderService folderService, UserService userService) {
		super();
		this.folderService = folderService;
		this.userService = userService;
	}

    @GetMapping("/folders/all")
    public List<Folder> getFolderListAll() {
        List<Folder> folderList = folderService.loadAll();
        return folderList;
    }

	@GetMapping("/folders/1st-level")
    public List<Folder> getFolder1stLevel(Principal principal) {
		User user = userService.loadUserByUsername(principal.getName());
		List<Folder> folderList = getFolderListAll();
        folderList.removeIf(folder -> folder.getParent() != null);
        folderList.removeIf(folder -> folder.getUser() != user);
        
        return folderList;
    }

    @GetMapping("/folder/{id}")
    public Folder getFolderById(
            @PathVariable(name = "id") String id
    ) {
        if (!"undefined".equals(id)) {
            Long folderId = Long.parseLong(id);
            return folderService.loadById(folderId);
        } else return null;
    }

    @PostMapping("/folder")
    public Folder postFolder(
            @RequestParam(name = "folderName") String name,
            @RequestParam(name = "folderParentId", required = false) Long folderParentId,
            Principal principal
    ) {
        Folder folderParent = null;
        if (folderParentId != null) {
            folderParent = folderService.loadById(folderParentId);
        }
        User user = userService.loadUserByUsername(principal.getName());
        Folder folder = new Folder(folderParent, name, user);
        return folderService.save(folder);
    }

    @DeleteMapping("/folder/{id}")
    public void deleteFolderById(
            @PathVariable (name = "id") Long folderId
    ) {
        folderService.delete(folderId);
    }

}
