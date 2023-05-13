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
	
	public static ReplyDTO toDTO(Reply reply) {
		ReplyDTO replyDTO = new ReplyDTO();
		replyDTO.setReply_id(reply.getReply_id());
		replyDTO.setMovie_id(reply.getMovie_id());
		replyDTO.setMember_id(reply.getMember_id());
		replyDTO.setContent(reply.getContent());
		replyDTO.setCreated_time(reply.getCreated_time());
		
		return replyDTO;
	}
}
