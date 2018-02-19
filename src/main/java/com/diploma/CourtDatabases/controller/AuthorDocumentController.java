package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.AuthorDocument;
import com.diploma.CourtDatabases.service.AuthorDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthorDocumentController {
    @Autowired
    private AuthorDocumentService authorDocumentService;
    @GetMapping("/findAllAuthorDocument")
    public List<AuthorDocument> findAllAuthorDocument (){
        return  authorDocumentService.getAll();
    }
    @PostMapping("/saveAuthor")
    public AuthorDocument saveAuthor(@RequestBody AuthorDocument authorDocument) {
        return authorDocumentService.save(authorDocument);
    }
    @PostMapping("/deleteAuthor")
    public void deleteAuthor(@RequestBody AuthorDocument authorDocument) {
        authorDocumentService.delete(authorDocument.getId());
    }

}
