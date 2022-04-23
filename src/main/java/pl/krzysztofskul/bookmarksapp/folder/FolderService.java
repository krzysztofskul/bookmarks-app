package pl.krzysztofskul.bookmarksapp.folder;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.krzysztofskul.bookmarksapp.bookmark.Bookmark;
import pl.krzysztofskul.bookmarksapp.bookmark.BookmarkService;

import java.util.List;

@Service
@Transactional
public class FolderService {

    private FolderRepo folderRepo;
    private BookmarkService bookmarkService;

    @Autowired
    public FolderService(
            FolderRepo folderRepo,
            BookmarkService bookmarkService
    ) {
        this.folderRepo = folderRepo;
        this.bookmarkService = bookmarkService;
    }

    public Folder save(Folder folder) {
        return folderRepo.save(folder);
    }

    public List<Folder> loadAll() {
        List<Folder> folderList = folderRepo.findAll();
        return folderList;
    }

    public Folder loadById(Long id) {
        Folder folder = folderRepo.findById(id).get();
        return folder;
    }

    public void delete(Long folderId) {
        Folder folder = this.loadById(folderId);
        Hibernate.initialize(folder.getBookmarkList());
        Hibernate.initialize(folder.getChildren());
        if (folder.getChildren() != null & folder.getChildren().size() > 0) {
            for (Folder children : folder.getChildren()) {
                this.delete(children.getId());
            }
        }
//        if (folder.getBookmarkList() != null & folder.getBookmarkList().size() > 0) {
//            for (Bookmark bookmark : folder.getBookmarkList()) {
//                bookmarkService.delete(bookmark.getId());
//            }
//        }
        folderRepo.delete(folder);
    }
}
