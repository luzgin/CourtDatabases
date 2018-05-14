package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Vialator;
import com.diploma.CourtDatabases.service.VialatorService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VialatorController {

    @Autowired
    private VialatorService vialatorService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/vialator/fiz")
    public List<Vialator> findAllVialatorsFiz() {
        return vialatorService.findByTypeVialator(1);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/vialator/")
    public List<Vialator> findAllVialators() {
        return vialatorService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/vialator/org")
    public List<Vialator> findAllVialatorsOrg() {
        return vialatorService.findByTypeVialator(2);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/vialator/")
    public Vialator save(@NonNull @RequestBody Vialator vialator) {
        return vialatorService.save(vialator);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/vialator/{id}")
    public void deleteVialator(@NonNull @PathVariable("id") long id) {
        vialatorService.delete(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/vialator/{id}")
    public Vialator findById(@NonNull @PathVariable("id") long id) {
        return vialatorService.findById(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/vialator/{id}")
    public void editVialator(@NonNull @PathVariable("id") long id, @NonNull @RequestBody Vialator vialator) {
        Vialator currentVialator = vialatorService.findById(id);
        if (vialator.getTypeVialator() == 1) {
            currentVialator.setFirstName(vialator.getFirstName());
            currentVialator.setSecondName(vialator.getSecondName());
            currentVialator.setLastName(vialator.getLastName());
            currentVialator.setTypeVialator(vialator.getTypeVialator());
            currentVialator.setPrivateNumber(vialator.getPrivateNumber());
            vialatorService.update(currentVialator);
        } else {
            currentVialator.setFirstName(vialator.getFirstName());
            currentVialator.setTypeVialator(vialator.getTypeVialator());
            currentVialator.setPrivateNumber(vialator.getPrivateNumber());
            vialatorService.update(currentVialator);
        }
    }
}
