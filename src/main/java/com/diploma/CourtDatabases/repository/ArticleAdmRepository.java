package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.ArticleAdm;
import com.diploma.CourtDatabases.entity.EntityIskAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleAdmRepository extends JpaRepository<ArticleAdm, Long> {

}
