package com.diploma.CourtDatabases.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ElementCollection(targetClass=Role.class, fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name="roles")
    @Column(name="role")
    private List<Role> authorities;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "account_non_expired")
    private boolean accountNonExpired;
    @Column(name = "account_non_locked")
    private boolean accountNonLocked;
    @Column(name = "credentials_non_expired")
    private boolean credentialsNonExpired;
    @Column(name = "enabled")
    private boolean enabled;

}
