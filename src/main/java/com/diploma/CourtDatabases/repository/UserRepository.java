package com.diploma.CourtDatabases.repository;

import com.diploma.CourtDatabases.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
}
