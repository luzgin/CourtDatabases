package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.DateRequestCase;
import com.diploma.CourtDatabases.repository.DateRequestCaseRepository;
import com.diploma.CourtDatabases.service.DateRequestCaseService;
import lombok.NonNull;
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
    public DateRequestCase save(@NonNull DateRequestCase dateRequestCase) {
        return dateRequestCaseRepository.save(dateRequestCase);
    }

    @Override
    public DateRequestCase update(@NonNull DateRequestCase dateRequestCase) {
        return dateRequestCaseRepository.save(dateRequestCase);
    }

    @Override
    public void delete(@NonNull long id) {
        dateRequestCaseRepository.delete(id);
    }

    @Override
    public DateRequestCase findById(@NonNull long id) {
        return dateRequestCaseRepository.findOne(id);
    }

    @Override
    public List<DateRequestCase> findByCardAdm_Id(@NonNull Long id) {
        return dateRequestCaseRepository.findByCardAdm_Id(id);
    }
}
