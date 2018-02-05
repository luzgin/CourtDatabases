package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.NameEntityDecreeAdm;

import java.util.List;

public interface NameEntityDecreeAdmService {

    NameEntityDecreeAdm save(NameEntityDecreeAdm nameEntityDecreeAdm);
    void delete(long id);
    List<NameEntityDecreeAdm> gelAll();
    NameEntityDecreeAdm findById(long id);

}
