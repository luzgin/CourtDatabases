package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityDecreeAdm;
import com.diploma.CourtDatabases.service.EntityDecreeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityDecreeController {
    @Autowired
    private EntityDecreeAdmService entityDecreeAdmService;

    @GetMapping(value = "/entitydecree/")
    public List<EntityDecreeAdm> findAllEntityDecree (){
        return  entityDecreeAdmService.findAll();
    }

    @GetMapping("/entitydecree/{id}")
    public EntityDecreeAdm findEntityDecreeById(@PathVariable("id") long id) {
        return entityDecreeAdmService.findById(id);
    }

    @PostMapping("/entitydecree/")
    public EntityDecreeAdm saveEntityDecree(@RequestBody EntityDecreeAdm entityDecreeAdm) {
        return entityDecreeAdmService.save(entityDecreeAdm);
    }

    @PutMapping("/entitydecree/{id}")
    public void editEntityDecree(@PathVariable("id") long id, @RequestBody EntityDecreeAdm authorDocument) {
        EntityDecreeAdm currentEntityDecree = entityDecreeAdmService.findById(id);
        currentEntityDecree.setNameEntityDecreeAdm(authorDocument.getNameEntityDecreeAdm());
        currentEntityDecree.setPrim(authorDocument.getPrim());
        entityDecreeAdmService.update(currentEntityDecree);
    }

    @DeleteMapping("/entitydecree/{id}")
    public void deleteEntityDecree(@PathVariable("id") long id) {
        entityDecreeAdmService.delete(id);
    }




}
