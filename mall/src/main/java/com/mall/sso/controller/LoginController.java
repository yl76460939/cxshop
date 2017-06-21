package com.mall.sso.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mall.sso.bean.UserInfo;
import com.mall.sso.service.impl.SSOServiceImpl;
import com.mall.syslog.bean.LogRecordParamsBean;
import com.mall.syslog.service.impl.LogWriter;
import com.mall.util.AESHelper;
import com.mall.util.MD5FileUtil;

/**
 * 登录
 * 
 * @author 33185 2016-3-10 13:25:30
 */
@Controller
@RequestMapping("login")
public class LoginController {

	@Resource
	private LogWriter logWriter;

	@Resource
	private SSOServiceImpl ssoBiz;

	// 记住密码的时候加减密的key
	private final static String STRKEY = "authority";

	/**
	 * 登录验证
	 * 
	 * @param request
	 * @param httpSession
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "login", method = RequestMethod.POST)
	@ResponseBody
	public String login(HttpServletRequest request,
			HttpSession httpSession, HttpServletResponse response,
			@RequestParam("loginAccount") String account,
			@RequestParam("loginPsd") String psd,
			@RequestParam("rememberPsd") String rememberPsd) {
		String oprstatus = "success";
		JSONObject returnJsonObject = new JSONObject();
		try {
			String md5PwdStr = ssoBiz.searchPsdByAccount(account);
			
			// 是否登录成功 0: 成功 1: 不存在用户 2: 密码错误 
			int status = 0;
			
			if(md5PwdStr != null && !md5PwdStr.isEmpty()){
				
				// 检查是否是加密过的psd
				try {
					JSONObject object = JSON.parseObject(psd);
					// 如果有key 则为密文
					if(object.get("k") != null){
						String ciphertext = (String)object.get("v");
						psd = AESHelper.decrypt(STRKEY, ciphertext);
					}
				} catch (Exception e) {
					// 明文
				}
				
				// 密码匹配成功
				if (MD5FileUtil.checkPassword(psd.trim(), md5PwdStr)) {
					// 登录成功 记录cookie
					JSONObject loginStr = new JSONObject();
					loginStr.put("loginAccount", account);
					if ("true".equals(rememberPsd)) {
						// 密码存成对象{k:28256, v:"123456"}
						JSONObject psdObj = new JSONObject();
						psdObj.put("k", true);
						psdObj.put("v", AESHelper.encrypt(STRKEY, psd.trim()));
						loginStr.put("loginPsd", psdObj.toString());
						
					} else {
						loginStr.put("loginPsd", "");
					}
					
					Cookie cookie = new Cookie("rmbPsd",
							loginStr.toString());
					cookie.setPath("/");
					// 记住30天
					cookie.setMaxAge(60 * 60 * 24 * 30);
					response.addCookie(cookie);

					UserInfo userInfo = new UserInfo();
					userInfo.setUserName(account);
					userInfo.setUserId(account);
					httpSession.setAttribute("userInfo", userInfo);
				} else {
					status = 2;
				}
				
			}else{
				status = 1;
			}
			
			returnJsonObject.put("status", status);
		} catch (Exception e) {
			oprstatus = "error";
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setNotHaveSql(true);
			logRecord.setLogType("登录");
			logRecord.setDescription(account);
			logRecord.setModuleId("login");
			logRecord.setModuleName("登录");
			logRecord.setOperateStatus(oprstatus);
			logWriter.log(logRecord);
		}

		return returnJsonObject.toString();
	}
}
