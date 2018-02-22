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

    @GetMapping("/organization/")
    public List<Organization> findAllOrganization() {
        return organizationService.gelAll();
    }

    @GetMapping("/organization/{id}")
    public Organization findOrganizationById(@PathVariable("id") long id) {
        return organizationService.findById(id);
    }

    @PostMapping("/organization/")
    public Organization saveOrganization(@RequestBody Organization organization) {
        return organizationService.save(organization);
    }

    @PutMapping("/organization/{id}")
    public void editOrganization(@PathVariable("id") long id, @RequestBody Organization organization) {
        Organization currentOrganization = organizationService.findById(id);
        currentOrganization.setName(organization.getName());
        currentOrganization.setType(organization.getType());
        organizationService.update(currentOrganization);
    }

    @DeleteMapping("/organization/{id}")
    public void deleteOrganization(@PathVariable("id") long id) {
        organizationService.delete(id);
    }


}
