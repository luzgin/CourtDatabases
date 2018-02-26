package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.EntityDecreeAdm;

import java.util.List;

public interface EntityDecreeAdmService {
    EntityDecreeAdm save(EntityDecreeAdm entityDecreeAdm);

    EntityDecreeAdm update(EntityDecreeAdm entityDecreeAdm);

    void delete(long id);

    List<EntityDecreeAdm> findAll();

    EntityDecreeAdm findById(long id);
}
