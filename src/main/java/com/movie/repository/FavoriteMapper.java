package com.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.Favorite;
import com.movie.model.JoinMovie;

@Mapper
public interface FavoriteMapper {

	void addFavorite(Favorite favorite);

	void removeFavorite(Favorite favorite);
	
	Favorite findFavorite(Favorite favorite);

	// 마이페이지에서 확인용도
	List<JoinMovie> findFavorites(String member_id);
}
