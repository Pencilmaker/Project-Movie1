package com.movie.model.reply;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Reply {
	private Long reply_id;
	private Long movie_id;
	private String member_id;
	private String content;
	private LocalDateTime created_time;
}
