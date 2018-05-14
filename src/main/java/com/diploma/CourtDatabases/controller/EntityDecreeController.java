package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityDecreeAdm;
import com.diploma.CourtDatabases.service.EntityDecreeAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityDecreeController {
    @Autowired
    private EntityDecreeAdmService entityDecreeAdmService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/entitydecree/")
    public List<EntityDecreeAdm> findAllEntityDecree() {
        return entityDecreeAdmService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/entitydecree/{id}")
    public EntityDecreeAdm findEntityDecreeById(@NonNull @PathVariable("id") long id) {
        return entityDecreeAdmService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/entitydecree/")
    public EntityDecreeAdm saveEntityDecree(@NonNull @RequestBody EntityDecreeAdm entityDecreeAdm) {
        return entityDecreeAdmService.save(entityDecreeAdm);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/entitydecree/{id}")
    public void editEntityDecree(@NonNull @PathVariable("id") long id, @NonNull @RequestBody EntityDecreeAdm authorDocument) {
        EntityDecreeAdm currentEntityDecree = entityDecreeAdmService.findById(id);
        currentEntityDecree.setNameEntityDecreeAdm(authorDocument.getNameEntityDecreeAdm());
        currentEntityDecree.setPrim(authorDocument.getPrim());
        entityDecreeAdmService.update(currentEntityDecree);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/entitydecree/{id}")
    public void deleteEntityDecree(@NonNull @PathVariable("id") long id) {
        entityDecreeAdmService.delete(id);
    }


}
