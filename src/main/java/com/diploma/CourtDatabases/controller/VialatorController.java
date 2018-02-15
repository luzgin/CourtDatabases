package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Vialator;
import com.diploma.CourtDatabases.service.VialatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VialatorController {

    @Autowired
    private VialatorService vialatorService;

    @GetMapping("/findAllVialatorsFiz")
    public List<Vialator> findAllVialatorsFiz(){
        return vialatorService.findByTypeVialator(1);
    }
    @GetMapping("/findAllVialators")
    public List<Vialator> findAllVialators(){
        return vialatorService.findAll();
    }
    @GetMapping("/findAllVialatorsOrg")
    public List<Vialator> findAllVialatorsOrg(){
        return vialatorService.findByTypeVialator(2);
    }

}
