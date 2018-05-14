package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @GetMapping(value = "/users")
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }
}
