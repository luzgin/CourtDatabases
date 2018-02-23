package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.EntityIskAdm;

import java.util.List;

public interface EntityIskAdmService {
    EntityIskAdm save(EntityIskAdm entityIskAdm);

    EntityIskAdm update(EntityIskAdm entityIskAdm);

    void delete(long id);

    List<EntityIskAdm> findAll();

    EntityIskAdm findById(Long id);

    EntityIskAdm findByName(String name);
}
