package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityIskAdmController {
    @Autowired
    private EntityIskAdmService entityIskAdmService;

    @GetMapping(value = "/entitiesiskadm/")
    public List<EntityIskAdm> getListOfEntityIskAdm() {
        return entityIskAdmService.findAll();
    }

    @GetMapping("/entitiesiskadm/{id}")
    public EntityIskAdm findEntityById(@NonNull @PathVariable("id") long id) {
        return entityIskAdmService.findById(id);
    }

    @PostMapping("/entitiesiskadm/")
    public EntityIskAdm saveEntity(@NonNull @RequestBody EntityIskAdm entityIskAdm) {
        return entityIskAdmService.save(entityIskAdm);
    }

    @PutMapping("/entitiesiskadm/{id}")
    public void editOrganization(@NonNull @PathVariable("id") long id, @NonNull @RequestBody EntityIskAdm entityIskAdm) {
        EntityIskAdm currentEntityIskAdm = entityIskAdmService.findById(id);
        currentEntityIskAdm.setName(entityIskAdm.getName());
        entityIskAdmService.update(currentEntityIskAdm);
    }

    @DeleteMapping("/entitiesiskadm/{id}")
    public void deleteEntity(@NonNull @PathVariable("id") long id) {
        entityIskAdmService.delete(id);
    }
}
