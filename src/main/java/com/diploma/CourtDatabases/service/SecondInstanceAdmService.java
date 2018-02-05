package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;

import java.util.List;

public interface SecondInstanceAdmService {

    SecondInstanceAdm save(SecondInstanceAdm secondInstanceAdm);
    void delete (long id);
    List<SecondInstanceAdm> findAll();
    SecondInstanceAdm findById(long id);

}
