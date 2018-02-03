package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateReturnCaseRepository extends JpaRepository<DateReturnCase, Long> {
}
