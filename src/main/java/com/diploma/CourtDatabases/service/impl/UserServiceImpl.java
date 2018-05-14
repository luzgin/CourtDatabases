package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.Role;
import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.repository.UserRepository;
import com.diploma.CourtDatabases.service.UserService;
import com.google.common.collect.ImmutableList;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service("UserService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;


    @PostConstruct
    public void init() {
        if (!findByUsername("super_admin").isPresent()) {
            save(User.builder()
                    .username("super_admin")
                    .password(new BCryptPasswordEncoder().encode("password"))
                    .authorities(ImmutableList.of(Role.USER, Role.ADMIN, Role.SUPER_ADMIN))
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .enabled(true)
                    .build());
        }
        if (!findByUsername("admin").isPresent()) {
            save(User.builder()
                    .username("admin")
                    .password(new BCryptPasswordEncoder().encode("password"))
                    .authorities(ImmutableList.of(Role.USER, Role.ADMIN))
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .enabled(true)
                    .build());
        }
        if (!findByUsername("user").isPresent()) {
            save(User.builder()
                    .username("user")
                    .password(new BCryptPasswordEncoder().encode("password"))
                    .authorities(ImmutableList.of(Role.USER))
                    .accountNonExpired(true)
                    .accountNonLocked(true)
                    .credentialsNonExpired(true)
                    .enabled(true)
                    .build());
        }

    }

    @Override
    public Optional<User> findById(@NonNull long id) {
        return Optional.ofNullable(
                userRepository.findOne(id)
        );
    }

    @Override
    public Optional<User> findByUsername(@NonNull String username) {
        return Optional.ofNullable(
                userRepository.findByUsername(username)
        );
    }

    @Override
    public User save(@NonNull User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(@NonNull User user) {
        return userRepository.save(user);
    }

    @Override
    public User delete(@NonNull long id) {
        return null;
    }

    @Override
    public List<User> findAllUsers() {
        return null;
    }

    @Override
    public boolean isUserExist(@NonNull User user) {
        return userRepository.findByUsername(user.getUsername()) != null;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        return findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user " + username + "was not found"));
    }
}
