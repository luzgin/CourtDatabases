package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.DateRequestCase;


import java.util.List;

public interface DateRequestCaseService {

    DateRequestCase save(DateRequestCase dateRequestCase);
    void delete(long id);
    List<DateRequestCase> gelAll();
    DateRequestCase findById(long id);


}
