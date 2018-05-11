package com.diploma.CourtDatabases.controller;

import com.diploma.CourtDatabases.entity.Role;
import com.diploma.CourtDatabases.entity.User;
import com.diploma.CourtDatabases.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(value = "/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exist");
        }
        List<Role> roles = new ArrayList<>();
        roles.add(Role.USER);
        user.setAuthorities(roles);
        return new ResponseEntity<User>(userService.save(user), HttpStatus.CREATED);
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password,
                                                     HttpServletResponse response) throws IOException {
        String token = null;
        User user = userService.findByUsername(username).get();
        Map<String, Object> tokenMap = new HashMap<String, Object>();
        if (user != null && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            token = Jwts.builder().setSubject(user.getUsername()).claim("roles", user.getAuthorities()).setIssuedAt(new Date())
                    .signWith(SignatureAlgorithm.HS256, "secretkey").compact();
            tokenMap.put("token", token);
            tokenMap.put("user", user);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
        } else {
            tokenMap.put("token", null);
            return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
        }

    }


}
