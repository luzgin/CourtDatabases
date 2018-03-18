package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DateRequestCase;


import java.util.List;

public interface DateRequestCaseService {

    DateRequestCase save(DateRequestCase dateRequestCase);

    DateRequestCase update(DateRequestCase dateRequestCase);

    void delete(long id);

    DateRequestCase findById(long id);

    List<DateRequestCase> findByCardAdm_Id(Long id);


}
