package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DateReturnCase;

import java.util.List;

public interface DateReturnCaseService {
    DateReturnCase save(DateReturnCase dateReturnCase);

    DateReturnCase update(DateReturnCase dateReturnCase);

    void delete(long id);

    DateReturnCase findById(long id);

    List<DateReturnCase> findByCardAdm_Id(Long id);


}
