package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import com.diploma.CourtDatabases.service.DecreeAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ComplaintAdmController {
    @Autowired
    private ComplaintsAdmService complaintsAdmService;

    @GetMapping(value = "/complaint/")
    public List<ComplaintsAdm> getAllComplaints() {
        return complaintsAdmService.findAll();
    }

    @GetMapping(value = "/complaint/dec/{id}")
    public List<ComplaintsAdm> getComplaintsForDecree(@NonNull @PathVariable("id") long id) {
        return complaintsAdmService.findByDecreeAdm_Id(id);
    }

    @GetMapping("/complaint/{id}")
    public ComplaintsAdm findById(@NonNull @PathVariable("id") long id) {
        return complaintsAdmService.findById(id);
    }

    @PostMapping("/complaint/")
    public ComplaintsAdm save(@NonNull @RequestBody ComplaintsAdm complaintsAdm) {
        return complaintsAdmService.save(complaintsAdm);
    }

    @PutMapping("/complaint/{id}")
    public void edit(@NonNull @PathVariable("id") long id, @NonNull @RequestBody ComplaintsAdm complaintsAdm) {
        ComplaintsAdm currentComplaintsAdm = complaintsAdmService.findById(id);
        currentComplaintsAdm.setComplainDate(complaintsAdm.getComplainDate());
        currentComplaintsAdm.setEntityIskAdm(complaintsAdm.getEntityIskAdm());
        currentComplaintsAdm.setNameAuthorComplaint(complaintsAdm.getNameAuthorComplaint());
        currentComplaintsAdm.setActiv(complaintsAdm.isActiv());
        currentComplaintsAdm.setReinstatementOfTerm(complaintsAdm.isReinstatementOfTerm());
        currentComplaintsAdm.setDecreeAdm(complaintsAdm.getDecreeAdm());
        currentComplaintsAdm.setSummPoshlini(complaintsAdm.getSummPoshlini());
        currentComplaintsAdm.setCardAdm(complaintsAdm.getCardAdm());
        complaintsAdmService.update(currentComplaintsAdm);
    }

    @DeleteMapping("/complaint/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        complaintsAdmService.delete(id);
    }
}
