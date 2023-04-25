package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.movie.model.Movie;

@Mapper
public interface MovieMapper {
	int saveId(Movie movie);
	
	Movie findId(String id);
}
