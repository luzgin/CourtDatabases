package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Organization;
import com.diploma.CourtDatabases.service.OrganizationService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrganizationConrtoller {
    @Autowired
    private OrganizationService organizationService;

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/organization/")
    public List<Organization> findAllOrganization() {
        return organizationService.gelAll();
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/organization/{id}")
    public Organization findOrganizationById(@NonNull @PathVariable("id") long id) {
        return organizationService.findById(id);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/organization/")
    public Organization saveOrganization(@NonNull @RequestBody Organization organization) {
        return organizationService.save(organization);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/organization/{id}")
    public void editOrganization(@NonNull @PathVariable("id") long id, @NonNull @RequestBody Organization organization) {
        Organization currentOrganization = organizationService.findById(id);
        currentOrganization.setName(organization.getName());
        currentOrganization.setType(organization.getType());
        organizationService.update(currentOrganization);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/organization/{id}")
    public void deleteOrganization(@NonNull @PathVariable("id") long id) {
        organizationService.delete(id);
    }


}
