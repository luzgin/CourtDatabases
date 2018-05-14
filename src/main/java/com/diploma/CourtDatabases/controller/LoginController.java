package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Role;
import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private UserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = "/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exist");
        }
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        user.setAuthorities(roles);
        return new ResponseEntity<User>(userService.save(user), HttpStatus.CREATED);
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<Map<String, Object>> login(@NonNull @RequestBody User userRequest,
                                                     HttpServletResponse response) throws IOException {
        String token = null;
        Optional<User> user = userService.findByUsername(userRequest.getUsername());
        Map<String, Object> tokenMap = new HashMap<String, Object>();
        if (user.isPresent() && new BCryptPasswordEncoder().matches(userRequest.getPassword(), user.get().getPassword())) {
            token = Jwts
                    .builder()
                    .setSubject(user.get().getUsername())
                    .claim("roles", user.get().getAuthorities()).setIssuedAt(new Date())
                        .signWith(SignatureAlgorithm.HS512, "secretkey")
                    .compact();
            tokenMap.put("token", token);
            tokenMap.put("user", user.get());
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
        } else {
            tokenMap.put("UNAUTHORIZED", null);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
        }

    }


}
