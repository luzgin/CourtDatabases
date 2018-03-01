package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.repository.ComplaintsAdmRepository;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("ComplaintsAdmService")
@Transactional
public class ComplaintsAdmServiceImpl implements ComplaintsAdmService {

    @Autowired
    private ComplaintsAdmRepository complaintsAdmRepository;

    @Override
    public ComplaintsAdm save(ComplaintsAdm complaintsAdm) {
        return complaintsAdmRepository.save(complaintsAdm);
    }

    @Override
    public ComplaintsAdm update(ComplaintsAdm complaintsAdm) {
        return complaintsAdmRepository.save(complaintsAdm);
    }
    @Override
    public void delete(long id) {
        complaintsAdmRepository.delete(id);
    }

    @Override
    public List<ComplaintsAdm> findAll() {
        return complaintsAdmRepository.findAll();
    }

    @Override
    public ComplaintsAdm findById(long id) {
        return complaintsAdmRepository.findOne(id);
    }
}
