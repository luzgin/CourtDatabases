package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.DecreeAdm;
import com.diploma.CourtDatabases.service.DecreeAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DecreeAdmController {
    @Autowired
    private DecreeAdmService decreeAdmService;

    @GetMapping(value = "/decree/")
    public List<DecreeAdm> findAllDecree() {
        return decreeAdmService.findAll();
    }

    @GetMapping("/decree/{id}")
    public DecreeAdm findDecreeById(@NonNull @PathVariable("id") long id) {
        return decreeAdmService.findById(id);
    }

    @PostMapping("/decree/")
    public DecreeAdm saveDecree(@NonNull @RequestBody DecreeAdm decreeAdm) {
        return decreeAdmService.save(decreeAdm);
    }

    @PutMapping("/decree/{id}")
    public DecreeAdm editDecree(@NonNull @PathVariable("id") long id, @NonNull @RequestBody DecreeAdm decreeAdm) {
        DecreeAdm currentDecree = decreeAdmService.findById(id);
        currentDecree.setOrganization(decreeAdm.getOrganization());
        currentDecree.setAuthorDocument(decreeAdm.getAuthorDocument());
        currentDecree.setDecreeDate(decreeAdm.getDecreeDate());
        currentDecree.setEnteredIntoForce(decreeAdm.isEnteredIntoForce());
        currentDecree.setSecondInstanceAdm(decreeAdm.getSecondInstanceAdm());
        return decreeAdmService.update(currentDecree);
    }

    @DeleteMapping("/decree/{id}")
    public void deleteDecree(@NonNull @PathVariable("id") long id) {
        decreeAdmService.delete(id);
    }
}