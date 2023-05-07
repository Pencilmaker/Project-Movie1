package com.movie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.movie.model.Movie;
import com.movie.model.MovieAndGenre;
import com.movie.repository.MovieMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("movie")
@Controller
public class MovieController {
	
	private final MovieMapper movieMapper;
	
	@PostMapping("{id}")
	public ResponseEntity<String> saveMovie(@RequestBody MovieAndGenre movieAndGenre) {
	    log.info("post에 movieAndGenre: {}", movieAndGenre);
	    log.info("genre 사이즈: {}", movieAndGenre.getGenre().size());
		Movie movie = movieAndGenre.getMovie();
	    log.info("id: {}", movie.getId());
	    log.info("post에 movie: {}", movie);

	    if (movieMapper.findId(movie.getId()) == null) {
	        movieMapper.saveId(movie);
	        for(int i = 0; i < movieAndGenre.getGenre().size(); i++) {
	        	log.info("{}", movieAndGenre.getGenre().get(i));
	        	movieMapper.saveGenre(movieAndGenre.getGenre().get(i));
	        }
//	        movieMapper.saveGenre(genres);
	        log.info("등록했습니다.");
	    } else {
	        log.info("이미 등록된 id입니다.");
	    }
	    return ResponseEntity.ok("등록성공");
	}

	
	@GetMapping("{id}")
	public String movieInfo(
			@RequestParam String id, Model model) {
		log.info("getmapping /movie 시작");
		log.info("id: {}", id);
		Movie movie = movieMapper.findId(id);
		log.info("movie: {}", movie);	
		
		model.addAttribute("movie", movie);
		  
		return "movie/movieinfo";
	}
	
}
