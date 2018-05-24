package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import com.diploma.CourtDatabases.entity.DecreeAdm;
import com.diploma.CourtDatabases.repository.ComplaintsAdmRepository;
import com.diploma.CourtDatabases.service.ComplaintsAdmService;
import lombok.NonNull;
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
    public ComplaintsAdm save(@NonNull ComplaintsAdm complaintsAdm) {
        return complaintsAdmRepository.save(complaintsAdm);
    }

    @Override
    public ComplaintsAdm update(@NonNull ComplaintsAdm complaintsAdm) {
        return complaintsAdmRepository.save(complaintsAdm);
    }
    @Override
    public void delete(@NonNull long id) {
        complaintsAdmRepository.delete(id);
    }

    @Override
    public List<ComplaintsAdm> findAll() {
        return complaintsAdmRepository.findAll();
    }

    @Override
    public List<ComplaintsAdm> findByDecreeAdm_Id(@NonNull Long id) {
        return complaintsAdmRepository.findByDecreeAdm_Id(id);
    }

    @Override
    public List<ComplaintsAdm> findByDecreeAdm(@NonNull DecreeAdm decreeAdm) {
        return complaintsAdmRepository.findByDecreeAdm(decreeAdm);
    }

    @Override
    public List<ComplaintsAdm> findByActiv(@NonNull Boolean active) {
        return complaintsAdmRepository.findByActiv(active);
    }

    @Override
    public ComplaintsAdm findById(@NonNull long id) {
        return complaintsAdmRepository.findOne(id);
    }
}
