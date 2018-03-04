package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Vialator;
import com.diploma.CourtDatabases.service.VialatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VialatorController {

    @Autowired
    private VialatorService vialatorService;

    @GetMapping("/vialator/fiz")
    public List<Vialator> findAllVialatorsFiz() {
        return vialatorService.findByTypeVialator(1);
    }

    @GetMapping("/vialator/")
    public List<Vialator> findAllVialators() {
        return vialatorService.findAll();
    }

    @GetMapping("/vialator/org")
    public List<Vialator> findAllVialatorsOrg() {
        return vialatorService.findByTypeVialator(2);
    }

    @PostMapping("/vialator/")
    public void save(@RequestBody Vialator vialator) {
        vialatorService.save(vialator);
    }

    @DeleteMapping("/vialator/{id}")
    public void deleteVialator(@PathVariable("id") long id) {
        vialatorService.delete(id);
    }


    @GetMapping("/vialator/{id}")
    public Vialator findById(@PathVariable("id") long id) {
        return vialatorService.findById(id);
    }

    @PutMapping("/vialator/{id}")
    public void editVialator(@PathVariable("id") long id, @RequestBody Vialator vialator) {
        Vialator currentVialator = vialatorService.findById(id);
        if (vialator.getTypeVialator()==1){
            currentVialator.setFirstName(vialator.getFirstName());
            currentVialator.setSecondName(vialator.getSecondName());
            currentVialator.setLastName(vialator.getLastName());
            currentVialator.setTypeVialator(vialator.getTypeVialator());
            currentVialator.setPrivateNumber(vialator.getPrivateNumber());
            vialatorService.update(currentVialator);
        }else{
            currentVialator.setFirstName(vialator.getFirstName());
            currentVialator.setTypeVialator(vialator.getTypeVialator());
            currentVialator.setPrivateNumber(vialator.getPrivateNumber());
            vialatorService.update(currentVialator);
        }
    }
}
