package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import com.diploma.CourtDatabases.repository.EntityIskAdmRepository;
import com.diploma.CourtDatabases.service.EntityIskAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("EntityIskAdmService")
@Transactional
public class EntityIskAdmServiceImpl implements EntityIskAdmService {

    @Autowired
    private EntityIskAdmRepository entityIskAdmRepository;


    @Override
    public EntityIskAdm save(@NonNull EntityIskAdm entityIskAdm) {
        return  entityIskAdmRepository.save(entityIskAdm);
    }

    @Override
    public EntityIskAdm update(@NonNull EntityIskAdm entityIskAdm) {
        return  entityIskAdmRepository.save(entityIskAdm);
    }

    @Override
    public void delete(@NonNull long id) {
        entityIskAdmRepository.delete(id);

    }

    @Override
    public List<EntityIskAdm> findAll() {
        return entityIskAdmRepository.findAll();
    }

    @Override
    public EntityIskAdm findById(@NonNull Long id) {
        return entityIskAdmRepository.findOne(id);
    }

    @Override
    public EntityIskAdm findByName(@NonNull String name) {
        return entityIskAdmRepository.findByName(name);
    }


}
