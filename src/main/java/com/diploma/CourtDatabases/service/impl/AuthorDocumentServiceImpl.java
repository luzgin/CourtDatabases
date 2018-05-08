package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import com.diploma.CourtDatabases.repository.AuthorDocumentRepository;
import com.diploma.CourtDatabases.service.AuthorDocumentService;
import lombok.NonNull;
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
    public AuthorDocument save(@NonNull AuthorDocument authorDocument) {
        return authorDocumentRepository.save(authorDocument);
    }

    @Override
    public AuthorDocument update(@NonNull AuthorDocument authorDocument) {
        return authorDocumentRepository.save(authorDocument);
    }

    @Override
    public void delete(@NonNull long id) {
        authorDocumentRepository.delete(id);

    }

    @Override
    public List<AuthorDocument> getAll() {
        return authorDocumentRepository.findAll();
    }

    @Override
    public AuthorDocument findById(@NonNull long id) {
        return authorDocumentRepository.findOne(id);
    }

    @Override
    public AuthorDocument findByName(@NonNull String name) {
        return authorDocumentRepository.findByName(name);
    }

    @Override
    public List<AuthorDocument> findByOrganization_NameAndOrganization_TypeAndActivWork(@NonNull String organizationName, @NonNull int organizationType) {
        return authorDocumentRepository.findByOrganization_NameAndOrganization_TypeAndActivWork(organizationName,organizationType,true);
    }

    @Override
    public List<AuthorDocument> findByOrganization_IdAndActivWork(@NonNull long id) {
        return authorDocumentRepository.findByOrganization_IdAndActivWork(id, true);
    }


}
