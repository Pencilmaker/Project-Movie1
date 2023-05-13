package com.movie.model;

import lombok.Data;

@Data
public class JoinMovie {

	private String member_id;
	private Long movie_id;
	private String title;
	private String poster_path;
}
