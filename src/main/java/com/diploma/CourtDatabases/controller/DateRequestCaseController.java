package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.DateRequestCase;
import com.diploma.CourtDatabases.service.DateRequestCaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DateRequestCaseController {
    @Autowired
    DateRequestCaseService dateRequestCaseService;

    @PostMapping("/requestCase/")
    public DateRequestCase save(@NonNull @RequestBody DateRequestCase dateRequestCase) {
        return dateRequestCaseService.save(dateRequestCase);
    }

    @PutMapping("/requestCase/{id}")
    public DateRequestCase update(@NonNull @PathVariable("id") long id, @NonNull @RequestBody DateRequestCase dateRequestCase) {
        DateRequestCase currentCase = dateRequestCaseService.findById(id);
        currentCase.setOrganization(dateRequestCase.getOrganization());
        currentCase.setDate(dateRequestCase.getDate());
        currentCase.setCardAdm(dateRequestCase.getCardAdm());
        return dateRequestCaseService.save(currentCase);
    }

    @DeleteMapping("/requestCase/{id}")
    public void delete(@NonNull @PathVariable("id") long id) {
        dateRequestCaseService.delete(id);
    }

    @GetMapping("/requestCase/{id}")
    public DateRequestCase findById(@NonNull @PathVariable("id") long id) {
        return dateRequestCaseService.findById(id);
    }

    @GetMapping("/requestCase/forCard/{id}")
    public List<DateRequestCase> findByCardAdm_Id(@NonNull @PathVariable("id") long id) {
        return dateRequestCaseService.findByCardAdm_Id(id);
    }
}
