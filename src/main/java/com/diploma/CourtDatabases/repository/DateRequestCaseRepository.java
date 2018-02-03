package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.DateRequestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateRequestCaseRepository extends JpaRepository<DateRequestCase, Long> {
}
