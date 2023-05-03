package com.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.movie.model.member.LoginForm;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
public class HomeController {
		
    @GetMapping("")
    public String home(@Validated @ModelAttribute("loginForm") LoginForm loginForm,
            BindingResult result) {
    	log.info("{} 아이디로 로그인",loginForm.getMember_id());
    	log.info("메인 페이지");
        return "index";
    }
   
    @GetMapping("movie_web")
    public String movie() {
    	log.info("Movie_web");
    	return "movie/movie_web";
    }
    
    @GetMapping("movie_search")
    public String movieSearch() {
    	log.info("Movie_search");
    	return "movie/movie_search";
    }


}