package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.ArticleAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleAdmRepository extends JpaRepository<ArticleAdm, Long> {
}
