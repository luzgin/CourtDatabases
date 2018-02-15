package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.Vialator;

import java.util.List;

public interface VialatorService {

    Vialator save(Vialator vialator);
    void delete (long id);
    List<Vialator> findAll();
    List<Vialator> findByTypeVialator(Integer type);
    Vialator findById(long id);


}
