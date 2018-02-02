package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/entitiesiskadm")
public class EntityIskAdmController {
    @Autowired
    private EntityIskAdmService entityIskAdmService;

    @RequestMapping
    public List<EntityIskAdm> getListOfEntityIskAdm(){

        return entityIskAdmService.getAll();
    }
}
