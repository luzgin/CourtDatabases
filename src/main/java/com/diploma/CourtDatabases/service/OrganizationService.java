package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.Organization;

import java.util.List;

public interface OrganizationService {
    Organization save(Organization organization);
    Organization update(Organization organization);
    void delete(long id);
    List<Organization> gelAll();
    Organization findById(long id);

}
