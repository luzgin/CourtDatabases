package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Organization findByName(String name);
}
