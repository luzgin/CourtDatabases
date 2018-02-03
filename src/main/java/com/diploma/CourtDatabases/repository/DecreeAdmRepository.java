package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.DecreeAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecreeAdmRepository extends JpaRepository<DecreeAdm, Long> {
}
