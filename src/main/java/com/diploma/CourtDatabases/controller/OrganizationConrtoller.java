package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Organization;
import com.diploma.CourtDatabases.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrganizationConrtoller {
    @Autowired
    private OrganizationService organizationService;

    @PostMapping("/saveOrganization")
    public Organization saveOrganization(@RequestBody Organization organization) {
        return organizationService.save(organization);
    }

    @GetMapping("/findAllOrganization")
    public List<Organization> findAllOrganization() {
        return organizationService.gelAll();
    }

    @PostMapping("/deleteOrganization")
    public void deleteOrganization(@RequestBody Organization organization) {
        organizationService.delete(organization.getId());
    }

    @PostMapping("/editOrganization")
    public void editOrganization(@RequestBody Organization organization) {
        organizationService.save(organization);
    }
}
