package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.DecreeAdm;
import com.diploma.CourtDatabases.repository.DecreeAdmRepository;
import com.diploma.CourtDatabases.service.DecreeAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("DecreeAdmService")
@Transactional
public class DecreeAdmServiceImpl implements DecreeAdmService {
    @Autowired
    private DecreeAdmRepository decreeAdmRepository;

    @Override
    public DecreeAdm save(DecreeAdm decreeAdm) {
        return decreeAdmRepository.save(decreeAdm);
    }

    @Override
    public DecreeAdm update(DecreeAdm decreeAdm) {
        return decreeAdmRepository.save(decreeAdm);
    }

    @Override
    public void delete(long id) {
        decreeAdmRepository.delete(id);
    }

    @Override
    public List<DecreeAdm> findAll() {
        return decreeAdmRepository.findAll();
    }

    @Override
    public DecreeAdm findById(long id) {
        return decreeAdmRepository.findOne(id);
    }
}
