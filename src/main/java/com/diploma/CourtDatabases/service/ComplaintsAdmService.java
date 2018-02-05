package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;

import java.util.List;

public interface ComplaintsAdmService {

    ComplaintsAdm save(ComplaintsAdm complaintsAdm);
    void delete(long id);
    List<ComplaintsAdm> gelAll();
    ComplaintsAdm findById(long id);
}
