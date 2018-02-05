package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import com.diploma.CourtDatabases.repository.AuthorDocumentRepository;
import com.diploma.CourtDatabases.service.AuthorDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("AuthorDocumentService")
@Transactional
public class AuthorDocumentServiceImpl implements AuthorDocumentService {

    @Autowired
    private AuthorDocumentRepository authorDocumentRepository;

    @Override
    public AuthorDocument save(AuthorDocument authorDocument) {
        return authorDocumentRepository.save(authorDocument);
    }

    @Override
    public void delete(long id) {
        authorDocumentRepository.delete(id);

    }

    @Override
    public List<AuthorDocument> getAll() {
        return authorDocumentRepository.findAll();
    }

    @Override
    public AuthorDocument findById(long id) {
        return authorDocumentRepository.findOne(id);
    }

    @Override
    public AuthorDocument findByName(String name) {
        return authorDocumentRepository.findByName(name);
    }
}
