package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.Vialator;

import java.util.List;

public interface VialatorService {
    Vialator save(Vialator vialator);
    void delete (long id);
    List<Vialator> findAll();
    Vialator findById(long id);

}
