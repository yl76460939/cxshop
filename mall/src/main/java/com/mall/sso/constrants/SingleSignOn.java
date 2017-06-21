package com.mall.sso.constrants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
@Component("singleSignOn")
public class SingleSignOn {
	
	/**
	 * 微信发送公众号通知接口url
	 */
	@Value("${message.url}")
	private String messageUrl;
	
	/**
	 * 微信发送公众号通知接口秘钥
	 */
	@Value("${message.secret}")
	private String messageSecret;
	
	/**
	 * 配置上传文件,图片基础路径
	 */
	@Value("${fileUploadUrl}")
	private String fileUploadUrl;

	/**
	 * tospur数据平台首页
	 */
	@Value("${indexPage}")
	private String indexPage;
	
	/**
	 * tospur登录页
	 */
	@Value("${loginPage}")
	private String loginPage;
	
	/**
	 * 登录错误返回的页面(脉策index)
	 */
	@Value("${loginErrorPage}")
	private String loginErrorPage;
	
	/**
	 * 加减密key
	 */
	@Value("${secretKey}")
	private String secretKey;
	
	/**
	 * json验证的key
	 */
	@Value("${validateKey}")
	private String validateKey;
	
	public String getIndexPage() {
		return indexPage;
	}
	public String getLoginErrorPage() {
		return loginErrorPage;
	}
	public String getSecretKey() {
		return secretKey;
	}
	public String getValidateKey() {
		return validateKey;
	}
	public String getLoginPage() {
		return loginPage;
	}
	public String getFileUploadUrl() {
		return fileUploadUrl;
	}
	public String getMessageUrl() {
		return messageUrl;
	}
	public String getMessageSecret() {
		return messageSecret;
	}
	
	
}
