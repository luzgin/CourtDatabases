package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import com.diploma.CourtDatabases.service.DateReturnCaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DateReturnCaseController {
    @Autowired
    DateReturnCaseService dateReturnCaseService;

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/returnCase/")
    public DateReturnCase save(@NonNull @RequestBody DateReturnCase dateReturnCase) {
        return dateReturnCaseService.save(dateReturnCase);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/returnCase/{id}")
    public DateReturnCase update(@NonNull @PathVariable("id") long id, @NonNull @RequestBody DateReturnCase dateReturnCase) {
        DateReturnCase currentCase = dateReturnCaseService.findById(id);
        currentCase.setOrganization(dateReturnCase.getOrganization());
        currentCase.setDate(dateReturnCase.getDate());
        currentCase.setCardAdm(dateReturnCase.getCardAdm());
        return dateReturnCaseService.save(currentCase);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/returnCase/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        dateReturnCaseService.delete(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/returnCase/{id}")
    public DateReturnCase findById(@NonNull @PathVariable("id") long id) {
        return dateReturnCaseService.findById(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/returnCase/forCard/{id}")
    public List<DateReturnCase> findByCardAdm_Id(@NonNull @PathVariable("id") long id) {
        return dateReturnCaseService.findByCardAdm_Id(id);
    }
}
