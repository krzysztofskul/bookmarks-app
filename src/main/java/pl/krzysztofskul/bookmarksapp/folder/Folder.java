package pl.krzysztofskul.bookmarksapp.folder;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.krzysztofskul.bookmarksapp.bookmark.Bookmark;


import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Table(name = "folders")
public class Folder implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    //@JsonBackReference
    @JsonIdentityInfo(
            generator = ObjectIdGenerators.PropertyGenerator.class,
            property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private Folder parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<Folder> children = new ArrayList<>();

    private String name;

    private String path;

    @OneToMany(mappedBy = "folder", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    @JsonManagedReference
    private List<Bookmark> bookmarkList = new ArrayList<>();

    public Folder(String name) {
        this.name = name;
    }

    public Folder(Folder parent, String name) {
        this.parent = parent;
        this.name = name;
    }

    public void addChildren(Folder folder) {
        this.children.add(folder);
        folder.setParent(this);
    }

    public void removeChildren(Folder folder) {
        this.children.remove(folder);
        folder.setParent(null);
    }
    
    public void addBookmark(Bookmark bookmark) {
        this.getBookmarkList().add(bookmark);
        bookmark.setFolder(this);
    }

    public void removeBookmark(Bookmark bookmark) {
        this.getBookmarkList().remove(bookmark);
        bookmark.setFolder(null);
    }

}
