package com.mall.sso.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mall.sso.bean.UserInfo;
import com.mall.sso.constrants.SingleSignOn;
import com.mall.sso.service.impl.SSOServiceImpl;
import com.mall.syslog.bean.LogRecordParamsBean;
import com.mall.syslog.service.impl.LogWriter;

/**
 * 登录登出controller
 * 
 * @author 33185
 *
 */
@Controller
@RequestMapping("loginCtrl")
public class SSOController {

	@Resource
	private LogWriter logWriter;

	@Resource
	private SSOServiceImpl ssoBiz;

	@Resource
	private SingleSignOn singleSignOn;
	
	/**
	 * 系统退出
	 * 
	 * @return
	 */
	@RequestMapping("logout")
	public String singleLogout(HttpSession httpSession) {
		if(httpSession != null){
			// 注销
			UserInfo userInfo = (UserInfo) httpSession.getAttribute("userInfo");
			if(userInfo != null){
				// -- 记录日志 --
				String userId = userInfo.getUserId();
				String userName = userInfo.getUserName();
				String description = userName + "(" +userId+")登出";
				LogRecordParamsBean logRecord = new LogRecordParamsBean();
				logRecord.setNotHaveSql(true);
				logRecord.setLogType("登出");
				logRecord.setDescription(description);
				logRecord.setModuleId("loginout");
				logRecord.setModuleName("登出");
				logWriter.log(logRecord);
			}
			
			httpSession.invalidate();
		}
		return "redirect:" + singleSignOn.getLoginErrorPage();
	}
}
