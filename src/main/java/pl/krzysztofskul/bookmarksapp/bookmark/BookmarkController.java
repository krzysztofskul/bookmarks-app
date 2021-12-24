package pl.krzysztofskul.bookmarksapp.bookmark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("/bookmarks-app")
public class BookmarkController {

    private BookmarkService bookmarkService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping("/bookmark-details/{bookmarkId}")
    public String getBookmarkDetails(
            @PathVariable(name = "bookmarkId") Long bookmarkId,
            Model model,
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) {
        model.addAttribute("bookmark", bookmarkService.loadById(bookmarkId));
        httpServletRequest.setAttribute("bookmarkId", bookmarkId);
        return "bookmark-details";
    }
}
