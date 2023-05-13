package com.movie.model;

import lombok.Data;

@Data
public class Cast {
	private Long movie_id;
	private Long actor_id;
	private String actor_name;
	private String profile_path;
	private String movie_character;
	private Long character_order;
}
