package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.Organization;
import com.diploma.CourtDatabases.repository.OrganizationRepository;
import com.diploma.CourtDatabases.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service("OrganizationService")
@Transactional
public class OrganizationServiceImpl implements OrganizationService {
    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public Organization update(Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public void delete(long id) {
        organizationRepository.delete(id);
    }

    @Override
    public List<Organization> gelAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findById(long id) {
        return organizationRepository.findOne(id);
    }
}
