package com.movie.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogInterceptor implements HandlerInterceptor {

   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
         throws Exception {
      log.info("preHandle 실행");
      String requestURI = request.getRequestURI();
      log.info("Loginterceptor: {}", requestURI);
      return true;
   }

   @Override
   public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
         ModelAndView modelAndView) throws Exception {
      // 컨트롤러에서 예외가 발생하면 postHandle 은 실행되지 않는다.
      log.info("postHandle 실행 {}", modelAndView);
   }

   @Override
   public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
         throws Exception {
      // 예외 발생 유무와 관계없이 항상 실행된다.
      if (ex != null) {
         log.info("afterCompletion 실행 {}", ex.getMessage());
      }
   }
}