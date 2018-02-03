package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.ComplaintsAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintsAdmRepository extends JpaRepository<ComplaintsAdm, Long> {
}
