package pl.krzysztofskul.bookmarksapp.folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FolderControllerRest {

    private FolderService folderService;

    @Autowired
    public FolderControllerRest(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folders/all")
    public List<Folder> getFolderListAll() {
        List<Folder> folderList = folderService.loadAll();
        return folderList;
    }

    @GetMapping("/folders/1st-level")
    public List<Folder> getFolder1stLevel() {
        List<Folder> folderList = getFolderListAll();
        folderList.removeIf(folder -> folder.getParent() != null);
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
            @RequestParam(name = "folderParentId", required = false) Long folderParentId
    ) {
        Folder folderParent = null;
        if (folderParentId != null) {
            folderParent = folderService.loadById(folderParentId);
        }
        Folder folder = new Folder(folderParent, name);
        return folderService.save(folder);
    }

    @DeleteMapping("/folder/{id}")
    public void deleteFolderById(
            @PathVariable (name = "id") Long folderId
    ) {
        folderService.delete(folderId);
    }

}
