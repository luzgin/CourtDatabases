package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DateReturnCase;

import java.util.List;

public interface DateReturnCaseService {
    DateReturnCase save(DateReturnCase dateReturnCase);
    void delete(long id);
    List<DateReturnCase> gelAll();
    DateReturnCase findById(long id);


}
