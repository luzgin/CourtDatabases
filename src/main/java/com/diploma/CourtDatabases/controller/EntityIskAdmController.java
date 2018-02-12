package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityIskAdmController {
    @Autowired
    private EntityIskAdmService entityIskAdmService;

    @GetMapping(value = "/entitiesiskadm")
    public List<EntityIskAdm> getListOfEntityIskAdm() {
        return entityIskAdmService.getAll();
    }

    @RequestMapping(value="/save", method=RequestMethod.POST)
    public EntityIskAdm saveEntityIskAdm(@RequestBody EntityIskAdm entityIskAdm){
        return entityIskAdmService.save(entityIskAdm);
    }


}
