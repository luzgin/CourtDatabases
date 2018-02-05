package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.EntityDecreeAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityDecreeAdmRepository extends JpaRepository<EntityDecreeAdm, Long> {
}
