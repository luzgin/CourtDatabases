package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.AuthorDocument;

import java.util.List;

public interface AuthorDocumentService {
    AuthorDocument save(AuthorDocument authorDocument);
    void delete(long id);
    List<AuthorDocument> getAll();
    AuthorDocument findById(long id);
    AuthorDocument findByName(String name);

}
