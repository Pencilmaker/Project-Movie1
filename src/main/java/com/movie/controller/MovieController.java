package com.movie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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
		log.info("id: {}", movie.getId());
		log.info("movie: {}", movie);
		
		if(movieMapper.findId(movie.getId()) == null) {
			movieMapper.saveId(movie);
			log.info("등록했습니다.");
		} else {
			log.info("이미 등록된 id입니다.");
		}
		return ResponseEntity.ok("등록성공");
	}
	
}
