package com.movie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.movie.model.Cast;
import com.movie.model.Genre;
import com.movie.model.Movie;
import com.movie.model.MovieInfos;
import com.movie.model.member.Member;
import com.movie.model.reply.Reply;
import com.movie.repository.MovieMapper;
import com.movie.repository.ReplyMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("movie")
@Controller
public class MovieController {
	
	private final MovieMapper movieMapper;
	private final ReplyMapper replyMapper;
	
	@PostMapping("{movie_id}")
	public ResponseEntity<String> saveMovie(@RequestBody MovieInfos movieInfos) {
	    log.info("post에 movieInfos: {}", movieInfos);
	    log.info("genre 사이즈: {}", movieInfos.getGenre().size());
	    log.info("cast 사이즈: {}", movieInfos.getCast().size());
	    
		Movie movie = movieInfos.getMovie();
	    log.info("id: {}", movie.getMovie_id());
	    log.info("post에 movie: {}", movie);
	    
	    // movie의 중복 내용 확인
	    if (movieMapper.movieFindId(movie.getMovie_id()) == null) {
	    	
	    	// null일 경우 movie의 정보를 저장
	    	movieMapper.saveId(movie);
	    	
	        // genre의 정보를 for문으로 저장
	        for(int i = 0; i < movieInfos.getGenre().size(); i++) {
	        	log.info("{}", movieInfos.getGenre().get(i));
	        	movieMapper.saveGenre(movieInfos.getGenre().get(i));
	        }
	        log.info("genre의 정보를 등록했습니다.");
	        
	        // cast의 정보를 for문으로 저장
	        for(int i = 0; i < movieInfos.getCast().size(); i++) {
	        	log.info("{}", movieInfos.getCast().get(i));
	        	movieMapper.saveCast(movieInfos.getCast().get(i));
	        }
	        log.info("cast의 정보를 등록했습니다.");
	        
	    } else {
	        log.info("이미 등록된 id입니다.");
	    }
	    return ResponseEntity.ok("등록성공");
	}

	
	@GetMapping("{movie_id}")
	public String movieInfo(
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam Long movie_id, Model model) {
		log.info("getmapping /movie 시작");
		log.info("movie_id: {}", movie_id);
		
		// movie_id로 선택
		Movie movie = movieMapper.movieFindId(movie_id);
		log.info("movie: {}", movie);
		model.addAttribute("movie", movie);
		
		// movie_id에 맞는 장르들 검색
		List<Genre> genre = movieMapper.genreFindId(movie_id);
		log.info("get에 genre: {}", genre);
		
		// MovieAndGenre에 빈 껍데기 만들기
		MovieInfos mag = new MovieInfos();
		
		// MovieAndGenre에 집어넣기
		mag.setMovie(movie);
		mag.setGenre(genre);
		log.info("GET MAG:{}", mag);
		model.addAttribute("movieAndGenre", mag);
		
		// Reply 빈 껍데기 만들기
		Reply reply = new Reply();
		reply.setMovie_id(movie_id);
		reply.setMember_id(loginMember.getMember_id());
		
		// Reply에 집어넣기
		model.addAttribute("reply", reply);
		
		// Replies 가져오기
		List<Reply> replies = replyMapper.findReplies(movie_id);
		log.info("replies: {}", replies);
		
		// replies 집어넣기
		model.addAttribute("replies", replies);
		
		// movie_id로 Cast 찾기
		List<Cast> casts = movieMapper.castFindId(movie_id);
		log.info("casts: {}", casts);
		model.addAttribute("casts", casts);
		
		return "movie/movieinfocopy";
	}
	
}
