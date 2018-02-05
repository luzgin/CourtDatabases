package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.DateRequestCase;
import com.diploma.CourtDatabases.repository.DateRequestCaseRepository;
import com.diploma.CourtDatabases.service.DateRequestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("DateRequestCaseService")
@Transactional
public class DateRequestCaseServiceImpl implements DateRequestCaseService {

    @Autowired
    private DateRequestCaseRepository dateRequestCaseRepository;

    @Override
    public DateRequestCase save(DateRequestCase dateRequestCase) {
        return dateRequestCaseRepository.save(dateRequestCase);
    }

    @Override
    public void delete(long id) {
        dateRequestCaseRepository.delete(id);
    }

    @Override
    public List<DateRequestCase> gelAll() {
        return dateRequestCaseRepository.findAll();
    }

    @Override
    public DateRequestCase findById(long id) {
        return dateRequestCaseRepository.findOne(id);
    }
}
