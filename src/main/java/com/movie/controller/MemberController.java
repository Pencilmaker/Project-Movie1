package com.movie.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.movie.model.member.LoginForm;
import com.movie.model.member.Member;
import com.movie.model.member.MemberJoinForm;
import com.movie.repository.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("member")
@Controller
public class MemberController {
	
	private final MemberMapper memberMapper;
  
    @GetMapping("login")
    public String loginForm(Model model) {
    	log.info("login.html 실행");
    	
        // 로그인을 위한 빈 껍데기
        model.addAttribute("loginForm", new LoginForm());
        
        // 회원가입을 위한 빈 껍데기
        model.addAttribute("joinForm", new MemberJoinForm());
        
        // member/loginForm.html 페이지를 리턴한다.
        return "member/loginForm";
    }
    
    // 회원가입
    @PostMapping("join")
    public String join(@Validated @ModelAttribute("joinForm") MemberJoinForm joinForm,
                       BindingResult result) {
    	
        log.info("입력한 값: {}", joinForm);
        
        if (result.hasErrors()) {
            return "member/loginForm";
        }
        
        // 사용자로부터 입력받은 아이디로 데이터베이스에서 Member 를 검색한다.
        Member member = memberMapper.findMember(joinForm.getMember_id());
        // 사용자 정보가 존재하면
        if (member != null) {
            log.info("이미 가입된 아이디 입니다.");
            // BindingResult 객체에 GlobalError 를 추가한다.
            result.reject("idError", "이미 가입된 아이디 입니다.");
            // member/joinForm.html 페이지를 리턴한다.
            return "member/loginForm";
        }
        
        // MemberJoinForm 객체를 Member 타입으로 변환하여 데이터베이스에 저장한다.
        memberMapper.saveMember(MemberJoinForm.toMember(joinForm));
        // 메인 페이지로 리다이렉트한다.
        return "redirect:/";
    }
    
    @PostMapping("login")
    public String login(@Validated @ModelAttribute("loginForm") LoginForm loginForm,
            BindingResult result,
            HttpServletRequest request) {
        log.info("입력한 값: {}", loginForm);
        // validation 에 실패하면 member/loginForm 페이지로 돌아간다.
        if (result.hasErrors()) {
            return "member/loginForm";
        }
        // 사용자가 입력한 이이디에 해당하는 Member 정보를 데이터베이스에서 가져온다.
        Member member = memberMapper.findMember(loginForm.getMember_id());
        // Member 가 존재하지 않거나 패스워드가 다르면
        if (member == null || !member.getPassword().equals(loginForm.getPassword())) {
            // BindingResult 객체에 GlobalError 를 발생시킨다.
            result.reject("loginError", "아이디가 없거나 패스워드가 다릅니다.");
            // member/loginForm.html 페이지로 돌아간다.
            return "member/loginForm";
        }

        // Request 객체에서 Session 객체를 꺼내온다.
        HttpSession session = request.getSession();
        // Session 에 'loginMember' 라는 이름으로 Member 객체를 저장한다.
        session.setAttribute("loginMember", member);
        // 메인 페이지로 리다이렉트 한다.
        return "redirect:/";
    }

}
