package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.ArticleAdm;
import com.diploma.CourtDatabases.repository.ArticleAdmRepository;
import com.diploma.CourtDatabases.service.ArticleAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("ArticleAdmService")
@Transactional
public class ArticleAdmServiceImpl implements ArticleAdmService {
    @Autowired
    private ArticleAdmRepository articleAdmRepository;

    @Override
    public ArticleAdm save(@NonNull ArticleAdm articleAdm) {
        return articleAdmRepository.save(articleAdm);
    }

    @Override
    public ArticleAdm update(@NonNull ArticleAdm articleAdm) {
        return articleAdmRepository.save(articleAdm);
    }

    @Override
    public void delete(@NonNull long id) {
        articleAdmRepository.delete(id);
    }

    @Override
    public List<ArticleAdm> findAll() {
        return articleAdmRepository.findAll();
    }

    @Override
    public ArticleAdm findById(@NonNull long id) {
        return articleAdmRepository.findOne(id);
    }
}
