package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;
import com.diploma.CourtDatabases.service.SecondInstanceAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SecondInstanceController {
    @Autowired
    private SecondInstanceAdmService secondInstanceAdmService;

    @GetMapping(value = "/secondInstance/")
    public List<SecondInstanceAdm> findAllSecondInstance() {
        return secondInstanceAdmService.findAll();
    }

    @GetMapping("/secondInstance/{id}")
    public SecondInstanceAdm findById(@NonNull @PathVariable("id") long id) {
        return secondInstanceAdmService.findById(id);
    }

    @PostMapping("/secondInstance/")
    public SecondInstanceAdm save(@NonNull @RequestBody SecondInstanceAdm secondInstanceAdm) {
        return secondInstanceAdmService.save(secondInstanceAdm);
    }

    @PutMapping("/secondInstance/{id}")
    public void edit(@NonNull @PathVariable("id") long id, @NonNull @RequestBody SecondInstanceAdm secondInstance) {
        SecondInstanceAdm currentSecondInstance = secondInstanceAdmService.findById(id);
        currentSecondInstance.setOrganization(secondInstance.getOrganization());
        currentSecondInstance.setAuthorDocument(secondInstance.getAuthorDocument());
        currentSecondInstance.setDecreeDate(secondInstance.getDecreeDate());
        secondInstanceAdmService.update(currentSecondInstance);
    }

    @DeleteMapping("/secondInstance/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        secondInstanceAdmService.delete(id);
    }
}
