package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.NameEntityDecreeAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NameEntityDecreeAdmRepository extends JpaRepository<NameEntityDecreeAdm, Long> {
}
