package com.movie.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.movie.model.Movie;

@Mapper
public interface MovieMapper {
	
	// 클릭 시 저장
	int saveId(Movie movie);
	
	// 클릭 시 중복 ID가 있는지 확인 용도
	Movie findId(String id);
}
