package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.NameEntityDecreeAdm;
import com.diploma.CourtDatabases.service.NameEntityDecreeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NameEntityDecreeAdmController {
    @Autowired
    private NameEntityDecreeAdmService nameEntityDecreeAdmService;

    @GetMapping("/nameentitydecree/")
    public List<NameEntityDecreeAdm> findAllResultAdmCase() {
        return nameEntityDecreeAdmService.findAll();
    }

    @PostMapping("/nameentitydecree/")
    private NameEntityDecreeAdm saveNameEntityDecreeAdm(@RequestBody NameEntityDecreeAdm nameEntityDecreeAdm) {
        return nameEntityDecreeAdmService.save(nameEntityDecreeAdm);
    }

    @DeleteMapping("/nameentitydecree/{id}")
    private void deleteNameEntityDecreeAdm(@PathVariable("id") long id) {
        nameEntityDecreeAdmService.delete(id);
    }

    @GetMapping("/nameentitydecree/{id}")
    public NameEntityDecreeAdm findById(@PathVariable("id") long id) {
        return nameEntityDecreeAdmService.findById(id);
    }

    @PutMapping("/nameentitydecree/{id}")
    public void editNameEntityDecreeAdm(@PathVariable("id") long id, @RequestBody NameEntityDecreeAdm nameEntityDecreeAdm) {
        NameEntityDecreeAdm currentNameEntityDecreeAdm = nameEntityDecreeAdmService.findById(id);
        currentNameEntityDecreeAdm.setName(nameEntityDecreeAdm.getName());
        nameEntityDecreeAdmService.update(currentNameEntityDecreeAdm);
    }
}
