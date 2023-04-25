package com.movie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.model.Movie;
import com.movie.repository.MovieMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("movie")
@RestController
public class MovieController {
	
	private final MovieMapper movieMapper;
	
	@PostMapping("{id}")
	public ResponseEntity<String> saveMovie(
			@RequestBody Movie movie) {
		log.info("movie.id: {}", movie);
		
		movieMapper.saveId(movie);
		
		return ResponseEntity.ok("등록성공");
	}
	
}
