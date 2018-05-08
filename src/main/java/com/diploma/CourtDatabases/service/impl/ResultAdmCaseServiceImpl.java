package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.ResultAdmCase;
import com.diploma.CourtDatabases.repository.ResultAdmCaseRepository;
import com.diploma.CourtDatabases.service.ResultAdmCaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("ResultAdmCaseService")
@Transactional
public class ResultAdmCaseServiceImpl implements ResultAdmCaseService {
    @Autowired
    private ResultAdmCaseRepository resultAdmCaseRepository;
    @Override
    public ResultAdmCase save(@NonNull ResultAdmCase resultAdmCase) {
        return resultAdmCaseRepository.save(resultAdmCase);
    }

    @Override
    public void delete(@NonNull long id) {
        resultAdmCaseRepository.delete(id);
    }

    @Override
    public List<ResultAdmCase> findAll() {
        return resultAdmCaseRepository.findAll();
    }

    @Override
    public ResultAdmCase findById(@NonNull long id) {
        return resultAdmCaseRepository.findOne(id);
    }

    @Override
    public ResultAdmCase update(@NonNull ResultAdmCase resultAdmCase) {
        return resultAdmCaseRepository.save(resultAdmCase);
    }
}
