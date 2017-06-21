package com.mall.sso.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository("ssoDao")
public interface SSODao {
	
	public String selectUserPassword(@Param("userName")String userName);
	
}
