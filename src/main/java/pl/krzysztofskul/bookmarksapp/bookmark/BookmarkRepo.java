package pl.krzysztofskul.bookmarksapp.bookmark;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepo extends JpaRepository<Bookmark, Long> {
	
//	List<Bookmark> findAllByUserId(Long userId);
//	List<Bookmark> findAllByUserUsername(String username);
	
}
