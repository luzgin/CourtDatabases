package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.Organization;
import com.diploma.CourtDatabases.repository.OrganizationRepository;
import com.diploma.CourtDatabases.service.OrganizationService;
import lombok.NonNull;
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
    public Organization save(@NonNull Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public Organization update(@NonNull Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public void delete(@NonNull long id) {
        organizationRepository.delete(id);
    }

    @Override
    public List<Organization> gelAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findById(@NonNull long id) {
        return organizationRepository.findOne(id);
    }

    @Override
    public Organization findByName(@NonNull String name) {
        return organizationRepository.findByName(name);
    }
}
