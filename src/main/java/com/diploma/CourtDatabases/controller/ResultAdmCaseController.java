package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ResultAdmCase;
import com.diploma.CourtDatabases.service.ResultAdmCaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultAdmCaseController {
    @Autowired
    private ResultAdmCaseService resultAdmCaseService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/result/")
    public List<ResultAdmCase> findAllResultAdmCase() {
        return resultAdmCaseService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/result/")
    private ResultAdmCase saveResultAdmCase(@NonNull @RequestBody ResultAdmCase resultAdmCase) {
        return resultAdmCaseService.save(resultAdmCase);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/result/{id}")
    private void deleteResultAdmCase(@NonNull @PathVariable("id") long id) {
        resultAdmCaseService.delete(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/result/{id}")
    public ResultAdmCase findById(@NonNull @PathVariable("id") long id) {
        return resultAdmCaseService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/result/{id}")
    public void editResultAdmCase(@NonNull @PathVariable("id") long id, @NonNull @RequestBody ResultAdmCase resultAdmCase) {
        ResultAdmCase currentResultAdmCase = resultAdmCaseService.findById(id);
        currentResultAdmCase.setName(resultAdmCase.getName());
        resultAdmCaseService.update(currentResultAdmCase);
    }
}
