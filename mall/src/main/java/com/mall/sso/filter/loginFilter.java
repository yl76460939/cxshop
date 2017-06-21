package com.mall.sso.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mall.sso.constrants.SingleSignOn;
import com.mall.util.SpringContextHolder;

public class loginFilter extends OncePerRequestFilter {
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		
		// 请求的uri
		//String uri = request.getRequestURI();
		//HttpSession session = request.getSession();
		String contextPath = request.getContextPath();
		//UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		if (!StringUtils.isEmpty(contextPath)) {
			filterChain.doFilter(request, response);
		} else {
			String header = request.getHeader("X-Requested-With");
			// ajax request
			if (header != null && "XMLHttpRequest".equals(header)) {
				// 401
				response.sendError(HttpStatus.UNAUTHORIZED.value());
			} else {
				SingleSignOn sso = SpringContextHolder.getBean("singleSignOn");
				response.sendRedirect(contextPath+sso.getLoginErrorPage());
			}
		}

	}

	public static boolean isAjaxRequest(HttpServletRequest request) {
		String header = request.getHeader("X-Requested-With");
		if (header != null && "XMLHttpRequest".equals(header))
			return true;
		else
			return false;
	}

}
