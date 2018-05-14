package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;
import com.diploma.CourtDatabases.service.SecondInstanceAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SecondInstanceController {
    @Autowired
    private SecondInstanceAdmService secondInstanceAdmService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/secondInstance/")
    public List<SecondInstanceAdm> findAllSecondInstance() {
        return secondInstanceAdmService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/secondInstance/{id}")
    public SecondInstanceAdm findById(@NonNull @PathVariable("id") long id) {
        return secondInstanceAdmService.findById(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/secondInstance/")
    public SecondInstanceAdm save(@NonNull @RequestBody SecondInstanceAdm secondInstanceAdm) {
        return secondInstanceAdmService.save(secondInstanceAdm);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/secondInstance/{id}")
    public void edit(@NonNull @PathVariable("id") long id, @NonNull @RequestBody SecondInstanceAdm secondInstance) {
        SecondInstanceAdm currentSecondInstance = secondInstanceAdmService.findById(id);
        currentSecondInstance.setOrganization(secondInstance.getOrganization());
        currentSecondInstance.setAuthorDocument(secondInstance.getAuthorDocument());
        currentSecondInstance.setDecreeDate(secondInstance.getDecreeDate());
        secondInstanceAdmService.update(currentSecondInstance);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/secondInstance/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        secondInstanceAdmService.delete(id);
    }
}
