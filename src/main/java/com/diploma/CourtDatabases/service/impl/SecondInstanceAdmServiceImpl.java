package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;
import com.diploma.CourtDatabases.repository.SecondInstanceAdmRepository;
import com.diploma.CourtDatabases.service.SecondInstanceAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("SecondInstanceAdmService")
@Transactional
public class SecondInstanceAdmServiceImpl implements SecondInstanceAdmService {

    @Autowired
    private SecondInstanceAdmRepository secondInstanceAdmRepository;
    @Override
    public SecondInstanceAdm save(@NonNull SecondInstanceAdm secondInstanceAdm) {
        return secondInstanceAdmRepository.save(secondInstanceAdm);
    }

    @Override
    public SecondInstanceAdm update(@NonNull SecondInstanceAdm secondInstanceAdm) {
        return secondInstanceAdmRepository.save(secondInstanceAdm);
    }

    @Override
    public void delete(@NonNull long id) {
        secondInstanceAdmRepository.delete(id);
    }

    @Override
    public List<SecondInstanceAdm> findAll() {
        return secondInstanceAdmRepository.findAll();
    }

    @Override
    public SecondInstanceAdm findById(@NonNull long id) {
        return secondInstanceAdmRepository.findOne(id);
    }
}
