package pl.krzysztofskul.bookmarksapp.init;

import com.thedeanda.lorem.LoremIpsum;
import pl.krzysztofskul.bookmarksapp.bookmark.Bookmark;
import pl.krzysztofskul.bookmarksapp.folder.Folder;

import java.util.ArrayList;
import java.util.List;

public class InitDemo {

    private static InitDemo initDemo = null;

    private static List<Folder> demoFolderList = new ArrayList<>();
    private static List<Bookmark> demoBookmarkList = new ArrayList<>();

    private InitDemo() {
        initBookmarksApp();
        setDemoFolders();
        setDemoBookmarks();
        addDemoBookmarksToDemoFolders();
    }

    public static InitDemo getInstance() {
        if (InitDemo.initDemo == null) {
            InitDemo.initDemo = new InitDemo();
        }
        return initDemo;
    }

    public List<Folder> getDemoFolderList() throws NullPointerException {
        return InitDemo.demoFolderList;
    }

    private void initBookmarksApp() {
        Folder root = new Folder("root");
    }

    private void setDemoFolders() {
        List<Folder> demoFolderList = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            demoFolderList.add(new Folder(LoremIpsum.getInstance().getTitle(1)+" (demo folder 1st level)"));
        }

        for (Folder folder : demoFolderList) {
            for (int i = 0; i < 2; i++) {
                Folder children = new Folder(LoremIpsum.getInstance().getTitle(1)+" (demo folder 2nd level)");
                for(int j = 0; j < 3; j++) {
                    children.addChildren(new Folder(LoremIpsum.getInstance().getTitle(1)+" (demo folder 3rd level)"));
                }
                folder.addChildren(children);
            }
        }

        InitDemo.demoFolderList = demoFolderList;

    }

    private void setDemoBookmarks() {
        for (int i = 0; i < Math.pow(InitDemo.demoFolderList.size(), 2d); i++) {
            InitDemo.demoBookmarkList.add(new Bookmark(
                    LoremIpsum.getInstance().getTitle(1)+" (demo bookmark)",
                    LoremIpsum.getInstance().getUrl(),
                    LoremIpsum.getInstance().getWords(1, 5)
            ));
        }
    }

    private void addDemoBookmarksToDemoFolders() {
        int j = 0;
        if (null != InitDemo.demoFolderList && 0 < InitDemo.demoFolderList.size()) {
            for (Folder demoFolder : InitDemo.demoFolderList) {
                    if (null != InitDemo.demoBookmarkList && 0 < InitDemo.demoBookmarkList.size()) {
                        for (int i = 0; i <= 2 ; i++) {
                            if (null != InitDemo.demoBookmarkList.get(j)) {
                                demoFolder.addBookmark(InitDemo.demoBookmarkList.get(j));
                                j++;
                            }
                        }
                    }
            }
        }
    }

}