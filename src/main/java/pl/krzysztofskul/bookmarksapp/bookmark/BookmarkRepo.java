package pl.krzysztofskul.bookmarksapp.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepo extends JpaRepository<Bookmark, Long> {
}
