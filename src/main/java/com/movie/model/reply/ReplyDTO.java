package com.movie.model.reply;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReplyDTO {
	private Long reply_id;
	private Long movie_id;
	private String title;
	private String content;
	private String member_id;
	private LocalDateTime created_time;
}
