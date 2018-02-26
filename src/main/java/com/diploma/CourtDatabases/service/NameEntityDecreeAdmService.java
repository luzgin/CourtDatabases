package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.NameEntityDecreeAdm;

import java.util.List;

public interface NameEntityDecreeAdmService {

    NameEntityDecreeAdm save(NameEntityDecreeAdm nameEntityDecreeAdm);
    NameEntityDecreeAdm update(NameEntityDecreeAdm nameEntityDecreeAdm);
    void delete(long id);
    List<NameEntityDecreeAdm> findAll();
    NameEntityDecreeAdm findById(long id);

}
