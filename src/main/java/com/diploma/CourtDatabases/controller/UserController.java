package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.service.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @GetMapping(value = "/users/")
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @PostMapping("/users/")
    public User saveUser(@NonNull @RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userService.save(user);
    }

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @PutMapping("/users/{id}")
    public User editUser(@NonNull @PathVariable("id") long id, @NonNull @RequestBody User user) {
        Optional<User> currentUser = userService.findById(id);
        currentUser.get().setName(user.getName());
        currentUser.get().setAuthorities(user.getAuthorities());
        currentUser.get().setEnabled(user.isEnabled());
        if (!currentUser.get().getPassword().equals(user.getPassword())){
           currentUser.get().setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        }
        return userService.update(currentUser.get());
    }

    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@NonNull @PathVariable("id") long id) {
        userService.delete(id);
    }
}
