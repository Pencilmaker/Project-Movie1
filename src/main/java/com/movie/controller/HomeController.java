package com.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
public class HomeController {
		
    @GetMapping("")
    public String home() {
    	log.info("메인 페이지");
        return "main";
    }
   
    @GetMapping("movie_web")
    public String movie() {
    	log.info("movie_web");
    	return "movie/movie_web";
    }
    
    @GetMapping("movie_search")
    public String movieSearch() {
    	log.info("Movie_search");
    	return "movie/movie_search";
    }
    
    @GetMapping("movie_results")
    public String movieResults(@RequestParam("searchinput") String searchInput, Model model) {
        log.info("Movie_results");
        log.info("{}", searchInput);
        model.addAttribute("searchinput", searchInput);
        return "movie/movie_results";
    }



}