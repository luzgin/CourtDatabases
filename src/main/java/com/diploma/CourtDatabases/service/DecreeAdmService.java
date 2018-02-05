package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DecreeAdm;

import java.util.List;

public interface DecreeAdmService {
    DecreeAdm save(DecreeAdm decreeAdm);
    void delete(long id);
    List<DecreeAdm> gelAll();
    DecreeAdm findById(long id);

}
