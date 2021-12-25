package pl.krzysztofskul.bookmarksapp.bookmark;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.krzysztofskul.bookmarksapp.folder.Folder;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Bookmark implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    private String description;

    /**
     * parent folder
     */
    @ManyToOne
//    @JsonBackReference
    private Folder folder;

    // todo
    //private List<Tag> tagList;


    public Bookmark(String name, String url, String description) {
        this.name = name;
        this.url = url;
        this.description = description;
    }

    public Bookmark(String url) {
        this.name = url;
        this.url = url;
        this.description = "no description";
    }
}
