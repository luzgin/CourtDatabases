package com.diploma.CourtDatabases.service;

import com.diploma.CourtDatabases.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> findById(long id);

    Optional<User> findByUsername(String username);

    User save(User user);

    User update(User user);

    void delete(long id);

    List<User> findAllUsers();

    boolean isUserExist(User user);
}
