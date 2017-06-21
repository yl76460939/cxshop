package com.mall.auth.service;

import java.util.List;
import java.util.Map;

/**
 * @author 33185 2016-3-15 14:33:17
 */
public interface AuthBiz {
	
	public List<Map<String, String>> queryRegUserInfo();
	
	public List<Map<String, String>> queryActiveCity();
	
	public Map<String, String> queryReportData();
	
	public List<Map<String, String>> queryAllUserAndRole();
	
	public String roleSettingDetails();
	
	public Integer saveRoleAuthSettings(String roleId,String menulistId,String cityInfo);

	/**
	 * 查询所有省市区信息
	 * 
	 * @return
	 */
	public Map<String, List<Map<String, String>>> searchProvInfo();

	/**
	 * 查询所有菜单信息
	 * 
	 * @return
	 */
	public List<Map<String, String>> searchMenuInfo();

	/**
	 * 查询所有角色信息
	 * 
	 * @return
	 */
	public List<Map<String, String>> searchRoleInfo();

}
