package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.DecreeAdm;

import java.util.List;

public interface ComplaintsAdmService {

    ComplaintsAdm save(ComplaintsAdm complaintsAdm);
    ComplaintsAdm update(ComplaintsAdm complaintsAdm);
    void delete(long id);
    List<ComplaintsAdm> findAll();
    List<ComplaintsAdm> findByDecreeAdm(Long id);
    ComplaintsAdm findById(long id);
}
