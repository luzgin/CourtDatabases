package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.EntityIskAdm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntityIskAdmRepository extends JpaRepository<EntityIskAdm, Long>{
}
