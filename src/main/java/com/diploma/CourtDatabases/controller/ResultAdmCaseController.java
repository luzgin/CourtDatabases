package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ResultAdmCase;
import com.diploma.CourtDatabases.service.ResultAdmCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultAdmCaseController {
    @Autowired
    private ResultAdmCaseService resultAdmCaseService;

    @GetMapping(value = "/getResultAdmCaseList")
    public List<ResultAdmCase> findAllResultAdmCase(){
        return resultAdmCaseService.findAll();
    }
    @PostMapping(value = "/saveResultAdmCase")
    private ResultAdmCase saveResultAdmCase(@RequestBody ResultAdmCase resultAdmCase){
        return resultAdmCaseService.save(resultAdmCase);
    }

}
