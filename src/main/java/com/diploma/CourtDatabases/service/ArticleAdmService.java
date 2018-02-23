package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.ArticleAdm;

import java.util.List;

public interface ArticleAdmService {
    ArticleAdm save(ArticleAdm articleAdm);
    ArticleAdm update(ArticleAdm articleAdm);
    void delete (long id);
    List<ArticleAdm> findAll();
    ArticleAdm findById(long id);
}
