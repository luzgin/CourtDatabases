package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.repository.EntityIskAdmRepository;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("EntityIskAdmService")
@Transactional
public class EntityIskAdmServiceImpl implements EntityIskAdmService{

    @Autowired
    private EntityIskAdmRepository entityIskAdmRepository;
    @Override
    public EntityIskAdm addEntityIskAdm(EntityIskAdm entityIskAdm) {
        EntityIskAdm iskAdm = entityIskAdmRepository.saveAndFlush(entityIskAdm);
        return iskAdm;
    }

    @Override
    public void delete(long id) {
        entityIskAdmRepository.delete(id);

    }

    @Override
    public EntityIskAdm editEntityIskAdm(EntityIskAdm entityIskAdm) {
        EntityIskAdm iskAdm = entityIskAdmRepository.saveAndFlush(entityIskAdm);
        return iskAdm;
    }

    @Override
    public List<EntityIskAdm> getAll() {
        return entityIskAdmRepository.findAll();
    }

    @Override
    public EntityIskAdm findById(Long id) {
        return entityIskAdmRepository.findOne(id);
    }



}
