package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.Genre;
import com.movie.model.Movie;

@Mapper
public interface MovieMapper {
	
	// 클릭 시 저장
	void saveId(Movie movie);
	void saveGenre(Genre genre);
	
	// 클릭 시 중복 ID가 있는지 확인 용도
	Movie findId(String id);


}
