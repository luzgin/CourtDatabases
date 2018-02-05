package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.ResultAdmCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultAdmCaseRepository extends JpaRepository<ResultAdmCase, Long> {
}
