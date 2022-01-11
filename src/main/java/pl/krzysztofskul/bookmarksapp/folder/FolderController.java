package pl.krzysztofskul.bookmarksapp.folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/folders")
public class FolderController {

    private FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/{folderId}") // redirection for address with param. /folders?folderId=
    public String getFolderById(
            @PathVariable Long folderId
    ) {
        return "home";
    }

    @GetMapping()
    public String getFolderById(
    ) {
        return "home";
    }

}