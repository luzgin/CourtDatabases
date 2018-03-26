package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.AuthorDocument;

import java.util.List;

public interface AuthorDocumentService {
    AuthorDocument save(AuthorDocument authorDocument);
    AuthorDocument update(AuthorDocument authorDocument);
    void delete(long id);
    List<AuthorDocument> getAll();
    AuthorDocument findById(long id);
    AuthorDocument findByName(String name);
    List<AuthorDocument> findByOrganization_NameAndOrganization_TypeAndActivWork(String organizationName, int organizationType);
    List<AuthorDocument> findByOrganization_IdAndActivWork(long id);
}
