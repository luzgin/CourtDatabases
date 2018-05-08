package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import com.diploma.CourtDatabases.service.AuthorDocumentService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthorDocumentController {
    @Autowired
    private AuthorDocumentService authorDocumentService;

    @GetMapping(value = "/author/")
    public List<AuthorDocument> findAllAuthorDocument() {
        return authorDocumentService.getAll();
    }

    @GetMapping(value = "/author/org/{id}")
    public List<AuthorDocument> findAuthorsForOrgaization(@NonNull @PathVariable("id") long id) {
        return authorDocumentService.findByOrganization_IdAndActivWork(id);
    }

    @GetMapping(value = "/author/forOrganization/{name}/{type}")
    public List<AuthorDocument> findAuthorForOrganization(@NonNull @PathVariable("name") String organizationName, @NonNull @PathVariable("type") int type) {
        return authorDocumentService.findByOrganization_NameAndOrganization_TypeAndActivWork(organizationName, type);
    }

    @GetMapping("/author/{id}")
    public AuthorDocument findAuthorById(@NonNull @PathVariable("id") long id) {
        return authorDocumentService.findById(id);
    }

    @PostMapping("/author/")
    public AuthorDocument saveAuthor(@NonNull @RequestBody AuthorDocument authorDocument) {
        return authorDocumentService.save(authorDocument);
    }

    @PutMapping("/author/{id}")
    public void editAuthor(@NonNull @PathVariable("id") long id, @NonNull @RequestBody AuthorDocument authorDocument) {
        AuthorDocument currentAuthorDocument = authorDocumentService.findById(id);
        currentAuthorDocument.setName(authorDocument.getName());
        currentAuthorDocument.setPosition(authorDocument.getPosition());
        currentAuthorDocument.setActivWork(authorDocument.isActivWork());
        currentAuthorDocument.setOrganization(authorDocument.getOrganization());
        authorDocumentService.update(currentAuthorDocument);
    }

    @DeleteMapping("/author/{id}")
    public void deleteEntity(@NonNull @PathVariable("id") long id) {
        authorDocumentService.delete(id);
    }


}
