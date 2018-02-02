package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EntityIskAdmController {
    @Autowired
    private EntityIskAdmService entityIskAdmService;

    @RequestMapping("/api/entitiesiskadm")
    public List<EntityIskAdm> getListOfEntityIskAdm() {
        return entityIskAdmService.getAll();
    }
}
