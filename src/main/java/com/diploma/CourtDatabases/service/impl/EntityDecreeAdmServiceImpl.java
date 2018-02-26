package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.EntityDecreeAdm;
import com.diploma.CourtDatabases.repository.EntityDecreeAdmRepository;
import com.diploma.CourtDatabases.service.EntityDecreeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("EntityDecreeAdmService")
@Transactional
public class EntityDecreeAdmServiceImpl implements EntityDecreeAdmService {
    @Autowired
    private EntityDecreeAdmRepository entityDecreeAdmRepository;

    @Override
    public EntityDecreeAdm save(EntityDecreeAdm entityDecreeAdm) {
        return entityDecreeAdmRepository.save(entityDecreeAdm);
    }

    @Override
    public EntityDecreeAdm update(EntityDecreeAdm entityDecreeAdm) {
        return entityDecreeAdmRepository.save(entityDecreeAdm);
    }

    @Override
    public void delete(long id) {
        entityDecreeAdmRepository.delete(id);
    }

    @Override
    public List<EntityDecreeAdm> findAll() {
        return entityDecreeAdmRepository.findAll();
    }

    @Override
    public EntityDecreeAdm findById(long id) {
        return entityDecreeAdmRepository.findOne(id);
    }
}
