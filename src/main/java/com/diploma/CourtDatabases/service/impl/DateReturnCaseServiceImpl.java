package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import com.diploma.CourtDatabases.repository.DateReturnCaseRepository;
import com.diploma.CourtDatabases.service.DateReturnCaseService;
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
    public DateReturnCase save(DateReturnCase dateReturnCase) {
        return dateReturnCaseRepository.save(dateReturnCase);
    }

    @Override
    public void delete(long id) {
        dateReturnCaseRepository.delete(id);
    }

    @Override
    public List<DateReturnCase> gelAll() {
        return dateReturnCaseRepository.findAll();
    }

    @Override
    public DateReturnCase findById(long id) {
        return dateReturnCaseRepository.findOne(id);
    }
}
