package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorDocumentRepository extends JpaRepository<AuthorDocument, Long> {
    AuthorDocument findByName(String name);
    List<AuthorDocument> findByOrganization_NameAndOrganization_TypeAndActivWork(String organizationName, int organizationType, boolean activ);
    List<AuthorDocument> findByOrganization_IdAndActivWork(long id, boolean activ);
}
