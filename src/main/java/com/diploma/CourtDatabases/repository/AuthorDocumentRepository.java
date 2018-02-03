package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorDocumentRepository extends JpaRepository<AuthorDocument, Long> {
}
