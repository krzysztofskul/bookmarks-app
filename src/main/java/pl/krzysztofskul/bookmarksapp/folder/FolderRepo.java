package pl.krzysztofskul.bookmarksapp.folder;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepo extends JpaRepository<Folder, Long> {
}
