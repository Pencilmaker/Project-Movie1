package com.movie.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.movie.model.Favorite;
import com.movie.model.JoinMovie;
import com.movie.model.member.Member;
import com.movie.model.reply.Reply;
import com.movie.model.reply.ReplyDTO;
import com.movie.repository.FavoriteMapper;
import com.movie.repository.ReplyMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RequestMapping("myPage")
@Slf4j
@RequiredArgsConstructor
@Controller
public class FavoriteController {
	
	private final FavoriteMapper favoriteMapper;
	private final ReplyMapper replyMapper;
	
	@PostMapping("{movie_id}")
	public String addFavorite(
	    @SessionAttribute("loginMember") Member loginMember,
	    @RequestBody Favorite favorite, HttpSession session) {
	    log.info("중복체크의 시작점");
	    
	    log.info("id: {}", loginMember.getMember_id());
	    log.info("웹에서 받는 favorite: {}", favorite);
	    
	    Favorite checkFavorite = favoriteMapper.findFavorite(favorite);
	    log.info("checkFavorite:{}", checkFavorite);
	    
	    // 중복 체크 후 등록
	    if(checkFavorite == null) {
	    	log.info("등록하겠습니다.");
	    	favoriteMapper.addFavorite(favorite);
	    	log.info("등록완료했습니다.");
		    return "member/myPage";
	    } else {
	    	log.info("등록이 이미 된 영화입니다.");
	    	favoriteMapper.removeFavorite(favorite);
	    	log.info("favorite를 삭제하겠습니다.");
	    }

	    return "member/myPage";
	}
	
    @GetMapping("")
    public String myFavorite(@SessionAttribute("loginMember") Member loginMember, HttpSession session, Model model) {
    	// 나의 즐겨찾기
        List<JoinMovie> joinMovies = favoriteMapper.findFavorites(loginMember.getMember_id());
        log.info("joinMovies: {}", joinMovies);
        model.addAttribute("joinMovies", joinMovies);
        
        // 나의 리뷰 목록
        List<Reply> myReplies = replyMapper.findMyReplies(loginMember.getMember_id());
        log.info("myReplies: {}", myReplies);
                
        model.addAttribute("myReplies", myReplies);
        
        return "member/myPage";
    }


}
