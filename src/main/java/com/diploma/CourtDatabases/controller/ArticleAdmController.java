package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ArticleAdm;
import com.diploma.CourtDatabases.service.ArticleAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleAdmController {
    @Autowired
    private ArticleAdmService articleAdmService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/article/")
    public List<ArticleAdm> getAllArticles() {
        return articleAdmService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/article/{id}")
    public ArticleAdm findArticleById(@NonNull @PathVariable("id") long id) {
        return articleAdmService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/article/")
    public ArticleAdm saveArticle(@NonNull @RequestBody ArticleAdm articleAdm) {
        return articleAdmService.save(articleAdm);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/article/{id}")
    public void editArticle(@NonNull @PathVariable("id") long id, @NonNull @RequestBody ArticleAdm articleAdm) {
        ArticleAdm currentArticleAdm = articleAdmService.findById(id);
        currentArticleAdm.setArticle(articleAdm.getArticle());
        currentArticleAdm.setPart(articleAdm.getPart());
        currentArticleAdm.setNote(articleAdm.getNote());
        articleAdmService.update(currentArticleAdm);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/article/{id}")
    public void deleteEntity(@NonNull @PathVariable("id") long id) {
        articleAdmService.delete(id);
    }
}
