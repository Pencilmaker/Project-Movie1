package com.movie.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {
   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
         throws Exception {
      String requestURI = request.getRequestURI();
      HttpSession session = request.getSession(false);
      log.info("requestURI: {}", requestURI);

      if (session == null || session.getAttribute("loginMember") == null) {
         log.info("로그인 하지 않은 사용자 요청");
         response.sendRedirect("/member/login?redirectURL=" + requestURI);
         return false;
      }
      return true;
   }

}