package com.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.movie.model.reply.Reply;

@Mapper
public interface ReplyMapper {
	
	void saveReply(Reply reply);
	
	Reply findReply(Long reply_id);
	
	List<Reply> findReplies(Long movie_id);
	
	void updateReply(Reply reply);
	
	void removeReply(Long reply_id);


}
