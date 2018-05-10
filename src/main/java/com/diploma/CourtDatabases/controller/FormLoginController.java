package com.diploma.CourtDatabases.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FormLoginController {
    @RequestMapping("/login")
    public String getFormLogin(){

        return "login";
    }
}
