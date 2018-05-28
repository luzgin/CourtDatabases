package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.report.ComplaintAdmReport;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import com.diploma.CourtDatabases.service.DecreeAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ComplaintAdmController {
    @Autowired
    private ComplaintsAdmService complaintsAdmService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/complaint/")
    public List<ComplaintsAdm> getAllComplaints() {
        return complaintsAdmService.findAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping(value = "/complaint/dec/{id}")
    public List<ComplaintsAdm> getComplaintsForDecree(@NonNull @PathVariable("id") long id) {
        return complaintsAdmService.findByDecreeAdm_Id(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/complaint/{id}")
    public ComplaintsAdm findById(@NonNull @PathVariable("id") long id) {
        return complaintsAdmService.findById(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/complaint/check")
    public List<ComplaintAdmReport> getComplaintsForCheck() {
        List<ComplaintsAdm> complaintsAdmListWhereActivFalse = complaintsAdmService.findByActiv(false);
        Date currentDate = new Date();
        List<ComplaintAdmReport> complaintAdmReportList = new ArrayList<ComplaintAdmReport>();
        for (int i = 0; i < complaintsAdmListWhereActivFalse.size(); i++) {
            if (((currentDate.getTime() - complaintsAdmListWhereActivFalse.get(i).getComplainDate().getTime()) / (1000 * 60 * 60 * 24)) > 25) {
                Calendar dateAnswer = Calendar.getInstance();
                dateAnswer.setTime(complaintsAdmListWhereActivFalse.get(i).getComplainDate());
                dateAnswer.add(Calendar.DATE, 30);
                ComplaintAdmReport complaintAdmReport = new ComplaintAdmReport();
                complaintAdmReport.setComplainDate(complaintsAdmListWhereActivFalse.get(i).getComplainDate());
                complaintAdmReport.setEntityIskAdm(complaintsAdmListWhereActivFalse.get(i).getEntityIskAdm());
                complaintAdmReport.setNameAuthorComplaint(complaintsAdmListWhereActivFalse.get(i).getNameAuthorComplaint());
                complaintAdmReport.setActiv(complaintsAdmListWhereActivFalse.get(i).isActiv());
                complaintAdmReport.setReinstatementOfTerm(complaintsAdmListWhereActivFalse.get(i).isReinstatementOfTerm());
                complaintAdmReport.setDecreeAdm(complaintsAdmListWhereActivFalse.get(i).getDecreeAdm());
                complaintAdmReport.setSummPoshlini(complaintsAdmListWhereActivFalse.get(i).getSummPoshlini());
                complaintAdmReport.setCardAdm(complaintsAdmListWhereActivFalse.get(i).getCardAdm());
                complaintAdmReport.setDateAnswer(dateAnswer.getTime());
                complaintAdmReportList.add(complaintAdmReport);
            }
        }
        return complaintAdmReportList;
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/complaint/")
    public ComplaintsAdm save(@NonNull @RequestBody ComplaintsAdm complaintsAdm) {
        return complaintsAdmService.save(complaintsAdm);
    }

    @PreAuthorize("hasAuthority('USER')")
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

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/complaint/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        complaintsAdmService.delete(id);
    }
}
