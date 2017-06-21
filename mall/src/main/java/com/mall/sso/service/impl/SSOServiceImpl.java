package com.mall.sso.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.sso.dao.SSODao;
import com.mall.sso.service.SSOService;

/**
 * 
 * @author 33185
 *
 */
@Service("ssoBiz")
public class SSOServiceImpl implements SSOService {

	@Resource
	private SSODao ssoDao;

	/**
	 * 查询密码
	 */
	@Override
	public String searchPsdByAccount(String account) {
		return ssoDao.selectUserPassword(account);
	}

}
