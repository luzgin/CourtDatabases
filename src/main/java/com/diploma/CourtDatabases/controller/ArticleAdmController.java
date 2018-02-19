package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ArticleAdm;
import com.diploma.CourtDatabases.service.ArticleAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleAdmController {
    @Autowired
    private ArticleAdmService articleAdmService;

    @PostMapping("/saveArticleAdm")
    public ArticleAdm saveArticleAdm(@RequestBody ArticleAdm articleAdm) {
        return articleAdmService.save(articleAdm);
    }

    @GetMapping("/findAllArticleAdm")
    public List<ArticleAdm> findAllArticleAdm() {
        return articleAdmService.findAll();
    }

    @PostMapping("/deleteArticleAdm")
    public void deleteArticleAdm(@RequestBody ArticleAdm articleAdm) {
        articleAdmService.delete(articleAdm.getId());
    }
}
