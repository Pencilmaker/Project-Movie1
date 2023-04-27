package com.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LoginController {
  
    @GetMapping("login")
    public String loginForm() {
    	log.info("loginForm");
    	return "login/login";
    }
    
    @GetMapping("signUp")
    public String signUpForm() {
    	log.info("signUpForm");
    	return "login/signUp";
    }
    
    @GetMapping("findfwd")
    public String findFwd() {
    	log.info("Login Form");
    	return "login/findfwd";
    }
    
    @GetMapping("findid")
    public String findId() {
    	log.info("Login Form");
    	return "login/findid";
    }
}
