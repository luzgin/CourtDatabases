package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import com.diploma.CourtDatabases.service.DateReturnCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")
public class DateReturnCaseController {
    @Autowired
    DateReturnCaseService dateReturnCaseService;

    @PostMapping("/returnCase/")
    public DateReturnCase save(@RequestBody DateReturnCase dateReturnCase) {
        return dateReturnCaseService.save(dateReturnCase);
    }

    @PutMapping("/returnCase/{id}")
    public DateReturnCase update(@PathVariable("id") long id, @RequestBody DateReturnCase dateReturnCase) {
        DateReturnCase currentCase = dateReturnCaseService.findById(id);
        currentCase.setOrganization(dateReturnCase.getOrganization());
        currentCase.setDate(dateReturnCase.getDate());
        currentCase.setCardAdm(dateReturnCase.getCardAdm());
        return dateReturnCaseService.save(currentCase);
    }

    @DeleteMapping("/returnCase/{id}")
    public void delete(@PathVariable("id") long id) {
        dateReturnCaseService.delete(id);
    }

    @GetMapping("/returnCase/{id}")
    public DateReturnCase findById(@PathVariable("id") long id) {
        return dateReturnCaseService.findById(id);
    }

    @GetMapping("/returnCase/forCard/{id}")
    public List<DateReturnCase> findByCardAdm_Id(@PathVariable("id") long id) {
        return dateReturnCaseService.findByCardAdm_Id(id);
    }
}
