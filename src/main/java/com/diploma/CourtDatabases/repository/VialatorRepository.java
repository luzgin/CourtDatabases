package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.Vialator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VialatorRepository extends JpaRepository<Vialator, Long> {
    List<Vialator> findByTypeVialator(Integer type);
}
