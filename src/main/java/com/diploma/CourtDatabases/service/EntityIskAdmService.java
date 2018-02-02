package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.EntityIskAdm;

import java.util.List;

public interface EntityIskAdmService {
    EntityIskAdm addEntityIskAdm(EntityIskAdm entityIskAdm);
    void delete (long id);
    EntityIskAdm editEntityIskAdm(EntityIskAdm entityIskAdm);
    List<EntityIskAdm> getAll();
    EntityIskAdm findById (Long id);
}
