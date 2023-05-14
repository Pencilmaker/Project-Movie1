package com.movie.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.movie.model.member.Member;
import com.movie.model.reply.Reply;
import com.movie.model.reply.ReplyDTO;
import com.movie.repository.ReplyMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("reply")
@Controller
public class ReplyController {
	
	private final ReplyMapper replyMapper;
	
	// 리플 등록
	@PostMapping("{movie_id}")
	public String writeReply(
			@PathVariable Long movie_id,
			@ModelAttribute Reply reply,
			@SessionAttribute("loginMember") Member loginMember) {
		log.info("reply: {}", reply);
		reply.setMovie_id(movie_id);
		reply.setMember_id(loginMember.getMember_id());
		
		replyMapper.saveReply(reply);
		
		return "redirect:/movie/movie?movie_id=" + movie_id;
		
	}
	
	// 리플 삭제
	@PostMapping("remove/{reply_id}")
	public String removeReply(
	        @SessionAttribute("loginMember") Member loginMember,
	        @PathVariable Long reply_id) {
	    log.info("reply_id: {}", reply_id);
	    
	    Reply findreply = replyMapper.findReply(reply_id);
	    log.info("findreply: {}", findreply);
	    Long movie_id = findreply.getMovie_id();
	    if (findreply != null && findreply.getMember_id().equals(loginMember.getMember_id())) {
	        replyMapper.removeReply(reply_id);
	    } else {
	        // 리플이 존재하지 않는 경우 처리
	        // 예: 예외 던지기, 오류 메시지 표시 등
	    }
	    
	    return "redirect:/movie/movie?movie_id=" + movie_id;
	}

	
}
