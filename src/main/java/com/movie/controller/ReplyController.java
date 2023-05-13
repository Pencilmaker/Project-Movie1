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
	
//	@GetMapping("{movie_id}/{reply_id}")
//	public ResponseEntity<Reply> findReply(
//			@PathVariable Long movie_id,
//			@PathVariable Long Reply_id) {
//		Reply reply = null;
//		return ResponseEntity.ok(reply);
//	}
//	
//	@GetMapping("{movie_id}")
//	public ResponseEntity<List<ReplyDTO>> findReplies(
//			@SessionAttribute("loginMember") Member loginMember,
//			@PathVariable Long movie_id) {
//		List<Reply> replies = replyMapper.findRepiles(movie_id);
//		List<ReplyDTO> replyDTOs = new ArrayList<>();
//		if (replies != null && replies.size() > 0) {
//			for (Reply reply : replies) {
//				ReplyDTO replyDTO = Reply.toDTO(reply);
//				if (reply.getMember_id().equals(loginMember.getMember_id())) {
//					replyDTO.setWriter(true);
//				}
//				replyDTOs.add(replyDTO);
//			}
//		}
//		
//		return ResponseEntity.ok(replyDTOs);
//		
//	}
	
}
