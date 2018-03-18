package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.DateRequestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DateRequestCaseRepository extends JpaRepository<DateRequestCase, Long> {
    List<DateRequestCase> findByCardAdm_Id(Long id);
}
