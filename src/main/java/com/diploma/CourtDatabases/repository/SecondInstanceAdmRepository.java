package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.SecondInstanceAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondInstanceAdmRepository extends JpaRepository<SecondInstanceAdm, Long> {
}
