package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ResultAdmCase;
import com.diploma.CourtDatabases.service.ResultAdmCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultAdmCaseController {
    @Autowired
    private ResultAdmCaseService resultAdmCaseService;

    @GetMapping("/result/")
    public List<ResultAdmCase> findAllResultAdmCase() {
        return resultAdmCaseService.findAll();
    }

    @PostMapping("/result/")
    private ResultAdmCase saveResultAdmCase(@RequestBody ResultAdmCase resultAdmCase) {
        return resultAdmCaseService.save(resultAdmCase);
    }

    @DeleteMapping("/result/{id}")
    private void deleteResultAdmCase(@PathVariable("id") long id) {
        resultAdmCaseService.delete(id);
    }

    @GetMapping("/result/{id}")
    public ResultAdmCase findById(@PathVariable("id") long id) {
        return resultAdmCaseService.findById(id);
    }

    @PutMapping("/result/{id}")
    public void editResultAdmCase(@PathVariable("id") long id, @RequestBody ResultAdmCase resultAdmCase) {
        ResultAdmCase currentResultAdmCase = resultAdmCaseService.findById(id);
        currentResultAdmCase.setName(resultAdmCase.getName());
        resultAdmCaseService.update(currentResultAdmCase);
    }
}
