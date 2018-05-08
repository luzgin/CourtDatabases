package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.Vialator;
import com.diploma.CourtDatabases.repository.VialatorRepository;
import com.diploma.CourtDatabases.service.VialatorService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("VialatorService")
@Transactional
public class VialatorServiceImpl implements VialatorService {
    @Autowired
    private VialatorRepository vialatorRepository;
    @Override
    public Vialator save(@NonNull Vialator vialator) {
        return vialatorRepository.save(vialator);
    }

    @Override
    public Vialator update(@NonNull Vialator vialator) {
        return vialatorRepository.save(vialator);
    }

    @Override
    public void delete(@NonNull long id) {
        vialatorRepository.delete(id);
    }

    @Override
    public List<Vialator> findAll() {
        return vialatorRepository.findAll();
    }

    @Override
    public List<Vialator> findByTypeVialator(@NonNull Integer type) {
        return vialatorRepository.findByTypeVialator(type);
    }

    @Override
    public Vialator findById(@NonNull long id) {
        return vialatorRepository.findOne(id);
    }
}
