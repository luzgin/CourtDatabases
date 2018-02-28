package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DecreeAdm;

import java.util.List;

public interface DecreeAdmService {
    DecreeAdm save(DecreeAdm decreeAdm);

    DecreeAdm update(DecreeAdm decreeAdm);

    void delete(long id);

    List<DecreeAdm> findAll();

    DecreeAdm findById(long id);

}
