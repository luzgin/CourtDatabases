package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;

import java.util.List;

public interface ComplaintsAdmService {

    ComplaintsAdm save(ComplaintsAdm complaintsAdm);
    ComplaintsAdm update(ComplaintsAdm complaintsAdm);
    void delete(long id);
    List<ComplaintsAdm> findAll();
    ComplaintsAdm findById(long id);
}
