package com.diploma.CourtDatabases.service.impl;

import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.repository.UserRepository;
import com.diploma.CourtDatabases.service.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("UserService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

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
    public void delete(@NonNull long id) {
        userRepository.delete(id);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
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
