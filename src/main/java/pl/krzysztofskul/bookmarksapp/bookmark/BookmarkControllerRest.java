package pl.krzysztofskul.bookmarksapp.bookmark;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import pl.krzysztofskul.bookmarksapp.folder.FolderService;

@RestController
@RequestMapping("/bookmarks-app")
public class BookmarkControllerRest {

    private BookmarkService bookmarkService;
    private FolderService folderService;

    @Autowired
    public BookmarkControllerRest(
            BookmarkService bookmarkService,
            FolderService folderService
    ) {
        this.bookmarkService = bookmarkService;
        this.folderService = folderService;
    }

    @GetMapping("/bookmark/{id}")
    public Bookmark getBookmark(
            @PathVariable(name = "id") Long id
    ) {
        return bookmarkService.loadById(id);
    }

    @PostMapping
    @RequestMapping("/bookmark/quick-add-to-folder/{folderId}")
    public Bookmark addBookmarkToFolder(
            @PathVariable(name = "folderId") Long folderId,
            @RequestParam(name = "url") String bookmarkUrl
            //@RequestBody Bookmark newBookmarkToSave
    ) {
        Bookmark newBookmarkToSave = new Bookmark(bookmarkUrl);
        newBookmarkToSave.setFolder(folderService.loadById(folderId));
        return bookmarkService.save(newBookmarkToSave);
    }

    @PutMapping(value = "/bookmarks/{id}")
    public Bookmark putBookmark(
//            @RequestBody Bookmark bookmark
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String url,
            @RequestParam String description

    ) {
        Bookmark bookmark = bookmarkService.loadById(id);
        bookmark.setName(name);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        return bookmarkService.save(bookmark);
    }

    @DeleteMapping("/bookmark/{bookmarkId}")
    public void delete(
            @PathVariable Long bookmarkId
    ) {
        bookmarkService.delete(bookmarkId);
    }

}
