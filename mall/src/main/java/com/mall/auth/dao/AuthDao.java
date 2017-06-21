package com.mall.auth.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.auth.bean.CityAndCountsBean;
import com.mall.auth.bean.Province;

/**
 * @author 33185 2016-3-15 14:33:45
 */
@Repository("authDao")
public interface AuthDao {
	
	public Integer selectRoleByName(String roleName);
	
	public List<Map<String, String>> queryAllKey();
	
	public Integer delByRoleIds(@Param("roleIds") List<String> roleIds);
	
	public List<Map<String, String>> selectConfigByRoleId(@Param("roleId") String roleId);
	
	public List<Map<String, String>> ready(@Param("roleId") String roleId);
	
	public List<Map<String, String>> selectConfigByRoleIdAndCityId(
			@Param("roleId") String roleId, @Param("cityId") String cityId);
	
	// 删除多城市数据
	public Integer delByCitys(@SuppressWarnings("rawtypes") 
		@Param("idInfos") List<Map> idInfos,
			@Param("roleId") String roleId);

	public Integer delByNormal(@Param("roleId") String roleId);
	
	public Integer delByCity(@Param("roleId") String roleId,
			@Param("cityNo") String cityNo);
	
	public Integer save2(@Param("prs") List<Map<String, String>> list);
	
	public Integer save(
			@SuppressWarnings("rawtypes") @Param("prs") List<Map> list);

	public List<Map<String, String>> queryNormalFunctionInfo(
			@Param("key") String key, @Param("roleId") String roleId);

	public List<Map<String, String>> queryCityFunctionInfo(
			@Param("roleId") String roleId, @Param("cityId") String cityId);

	public List<Map<String, String>> selectActiveCityInfo(@Param("roleId")String roleId);

	public List<Map<String, String>> queryNormalFunction();

	public List<Map<String, String>> selectUserPrivilege(
			@Param("userId") String userId);

	public Integer iPrivilege(
			@SuppressWarnings("rawtypes") @Param("param") List<Map> list);

	public Integer uUsers(
			@SuppressWarnings("rawtypes") @Param("param") List<Map> list);

	public Integer iUsers(
			@SuppressWarnings("rawtypes") @Param("param") List<Map> list);

	public List<Map<String, String>> check(
			@SuppressWarnings("rawtypes") @Param("param") List<Map> list);

	public List<Map<String, String>> selectAstrictUsers();

	public Integer astrict(@Param("userId") String userId);

	public List<Map<String, String>> selectMonitorSub(
			@Param("param") Map<String, String> map);

	public List<Map<String, String>> selectMonitorInfo(
			@Param("param") Map<String, String> map);

	public Integer selectMonitorCount(@Param("param") Map<String, String> map);

	public Integer generateKey(@Param("key") String key,
			@Param("name") String name, @Param("remark") String remark,
			@Param("divisive") String divisive);
	
	public Integer addRole(@Param("prs") Map<String, String> map);
	
	public Integer updateUserRole(@Param("prs") Map<String, String> map);
	
	public Integer insertUserRole(@Param("prs") Map<String, String> map);
	
	public List<Map<String, String>> selectRegUserInfo();

	public List<Map<String, String>> selectActiveCity();

	public Map<String, String> selectReportDataByRegs();

	public Map<String, String> selectReportData();

	public List<Map<String, String>> selectAllUserAndRole();

	public List<Map<String, String>> selectRoleSettingInfo();

	public List<Province> selectProvDetails();

	public List<Map<String, String>> selectMenuDetails();

	public List<Map<String, String>> selectRoleDetails();

	public Integer deleteUserAuth(@Param("userIds") String[] userIds,
			@Param("cityInfos") List<CityAndCountsBean> cityInfos);

	public Integer insertUserAuth(
			@Param("info") List<HashMap<String, String>> info);
}
