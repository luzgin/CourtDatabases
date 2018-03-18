package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.DateReturnCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DateReturnCaseRepository extends JpaRepository<DateReturnCase, Long> {
    List<DateReturnCase> findByCardAdm_Id(Long id);
}
