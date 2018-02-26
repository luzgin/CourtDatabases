package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;
import com.diploma.CourtDatabases.service.SecondInstanceAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SecondInstanceController {
    @Autowired
    private SecondInstanceAdmService secondInstanceAdmService;

    @GetMapping("/secondinstance/")
    public List<SecondInstanceAdm> findAllSecondInstance() {
        return secondInstanceAdmService.findAll();
    }

    @PostMapping("/secondinstance/")
    private SecondInstanceAdm saveSecondInstanceAdm(@RequestBody SecondInstanceAdm secondInstanceAdm) {
        return secondInstanceAdmService.save(secondInstanceAdm);
    }

    @DeleteMapping("/secondinstance/{id}")
    private void deleteSecondInstanceAdm(@PathVariable("id") long id) {
        secondInstanceAdmService.delete(id);
    }

    @GetMapping("/secondinstance/{id}")
    public SecondInstanceAdm findById(@PathVariable("id") long id) {
        return secondInstanceAdmService.findById(id);
    }

    @PutMapping("/secondinstance/{id}")
    public void editSecondInstanceAdm(@PathVariable("id") long id, @RequestBody SecondInstanceAdm secondInstanceAdm) {
        SecondInstanceAdm currentSecondInstanceAdm = secondInstanceAdmService.findById(id);
        currentSecondInstanceAdm.setOrganization(secondInstanceAdm.getOrganization());
        currentSecondInstanceAdm.setAuthorDocument(secondInstanceAdm.getAuthorDocument());
        currentSecondInstanceAdm.setDecreeDate(secondInstanceAdm.getDecreeDate());
        secondInstanceAdmService.update(currentSecondInstanceAdm);
    }
}
