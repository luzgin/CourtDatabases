package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.NameEntityDecreeAdm;
import com.diploma.CourtDatabases.repository.NameEntityDecreeAdmRepository;
import com.diploma.CourtDatabases.service.NameEntityDecreeAdmService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("NameEntityDecreeAdmService")
@Transactional
public class NameEntityDecreeAdmServiceImpl  implements NameEntityDecreeAdmService{
    @Autowired
    private NameEntityDecreeAdmRepository nameEntityDecreeAdmRepository;

    @Override
    public NameEntityDecreeAdm save(@NonNull NameEntityDecreeAdm nameEntityDecreeAdm) {
        return nameEntityDecreeAdmRepository.save(nameEntityDecreeAdm);
    }

    @Override
    public NameEntityDecreeAdm update(@NonNull NameEntityDecreeAdm nameEntityDecreeAdm) {
        return nameEntityDecreeAdmRepository.save(nameEntityDecreeAdm);
    }

    @Override
    public void delete(@NonNull long id) {
        nameEntityDecreeAdmRepository.delete(id);
    }

    @Override
    public List<NameEntityDecreeAdm> findAll() {
        return nameEntityDecreeAdmRepository.findAll();
    }

    @Override
    public NameEntityDecreeAdm findById(@NonNull long id) {
        return nameEntityDecreeAdmRepository.findOne(id);
    }
}
