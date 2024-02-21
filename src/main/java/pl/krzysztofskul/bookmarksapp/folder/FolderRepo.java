package pl.krzysztofskul.bookmarksapp.folder;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepo extends JpaRepository<Folder, Long> {
	
//	List<Folder> findAllByUserId(Long userId);
//	List<Folder> findAllByUserUsername(String username);
	
}
