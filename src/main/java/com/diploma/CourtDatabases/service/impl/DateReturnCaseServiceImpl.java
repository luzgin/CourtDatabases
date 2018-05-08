package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import com.diploma.CourtDatabases.repository.DateReturnCaseRepository;
import com.diploma.CourtDatabases.service.DateReturnCaseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("DateReturnCaseService")
@Transactional
public class DateReturnCaseServiceImpl implements DateReturnCaseService {
    @Autowired
    private DateReturnCaseRepository dateReturnCaseRepository;

    @Override
    public DateReturnCase save(@NonNull DateReturnCase dateReturnCase) {
        return dateReturnCaseRepository.save(dateReturnCase);
    }

    @Override
    public DateReturnCase update(@NonNull DateReturnCase dateReturnCase) {
        return dateReturnCaseRepository.save(dateReturnCase);
    }

    @Override
    public void delete(@NonNull long id) {
        dateReturnCaseRepository.delete(id);
    }

    @Override
    public DateReturnCase findById(@NonNull long id) {
        return dateReturnCaseRepository.findOne(id);
    }

    @Override
    public List<DateReturnCase> findByCardAdm_Id(@NonNull Long id) {
        return dateReturnCaseRepository.findByCardAdm_Id(id);
    }
}
