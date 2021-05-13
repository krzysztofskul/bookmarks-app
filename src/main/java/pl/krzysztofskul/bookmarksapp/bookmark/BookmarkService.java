package pl.krzysztofskul.bookmarksapp.bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookmarkService {

    private BookmarkRepo bookmarkRepo;

    @Autowired
    public BookmarkService(BookmarkRepo bookmarkRepo) {
        this.bookmarkRepo = bookmarkRepo;
    }

    public Bookmark save(Bookmark bookmark) {
        return bookmarkRepo.save(bookmark);
    }

    public List<Bookmark> loadAll() {
        List<Bookmark> bookmarkList = bookmarkRepo.findAll();
        return bookmarkList;
    }

    public Bookmark loadById(Long id) {
        Bookmark bookmark = bookmarkRepo.findById(id).get();
        return bookmark;
    }

}
