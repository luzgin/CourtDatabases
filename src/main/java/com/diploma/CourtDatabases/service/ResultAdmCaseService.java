package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.ResultAdmCase;

import java.util.List;

public interface ResultAdmCaseService {
    ResultAdmCase save(ResultAdmCase resultAdmCase);
    void delete (long id);
    List<ResultAdmCase> findAll();
    ResultAdmCase findById(long id);
    ResultAdmCase update(ResultAdmCase resultAdmCase);

}
