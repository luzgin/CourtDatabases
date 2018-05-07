package com.diploma.CourtDatabases.entity;

import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
@Data
public class User implements UserDetails {
    private List<Role> authorities;
    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
}
