package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityIskAdmController {
    @Autowired
    private EntityIskAdmService entityIskAdmService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/entitiesiskadm/")
    public List<EntityIskAdm> getListOfEntityIskAdm() {
        return entityIskAdmService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/entitiesiskadm/{id}")
    public EntityIskAdm findEntityById(@NonNull @PathVariable("id") long id) {
        return entityIskAdmService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/entitiesiskadm/")
    public EntityIskAdm saveEntity(@NonNull @RequestBody EntityIskAdm entityIskAdm) {
        return entityIskAdmService.save(entityIskAdm);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/entitiesiskadm/{id}")
    public void editOrganization(@NonNull @PathVariable("id") long id, @NonNull @RequestBody EntityIskAdm entityIskAdm) {
        EntityIskAdm currentEntityIskAdm = entityIskAdmService.findById(id);
        currentEntityIskAdm.setName(entityIskAdm.getName());
        entityIskAdmService.update(currentEntityIskAdm);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/entitiesiskadm/{id}")
    public void deleteEntity(@NonNull @PathVariable("id") long id) {
        entityIskAdmService.delete(id);
    }
}
