package pl.krzysztofskul.bookmarksapp.folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FolderService {

    private FolderRepo folderRepo;

    @Autowired
    public FolderService(FolderRepo folderRepo) {
        this.folderRepo = folderRepo;
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

}
