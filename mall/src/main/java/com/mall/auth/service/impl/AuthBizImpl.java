package com.mall.auth.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Resource;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.auth.bean.CityAndCountsBean;
import com.mall.auth.bean.MenuBean;
import com.mall.auth.bean.Province;
import com.mall.auth.dao.AuthDao;
import com.mall.auth.service.AuthBiz;
import com.mall.sso.constrants.SingleSignOn;
import com.mall.syslog.BaseDao;
import com.mall.syslog.SqlHelper;
import com.mall.util.AESHelper;
import com.mall.util.HttpClientHelper;

/**
 * @author 33185 wliu 2016-3-15 14:33:04
 */
@Service("authBiz")
public class AuthBizImpl implements AuthBiz {

	@Resource
	AuthDao authDao;

	@Resource
	private BaseDao sysLogBaseDao;

	@Resource
	private SingleSignOn singleSignOn;
	
	public Integer selectRoleByName(String roleId){
		return authDao.selectRoleByName(roleId);
	}
	
	public List<Map<String, String>> queryAllKey(){
		List<Map<String, String>> list = authDao.queryAllKey();
		return list;
	}
	
	@Transactional
	public int copyrole(String roleId, List<String> roleIds){
		
		int i = 0;
		List<Map<String, String>> prs = new ArrayList<Map<String, String>>();
		// 查 -> 删  -> 插
		List<Map<String, String>> list = authDao.selectConfigByRoleId(roleId);
		for (Map<String, String> map : list) {
			String usable = String.valueOf(map.get("usable"));
			String divisive = String.valueOf(map.get("divisive"));
			String type = String.valueOf(map.get("type"));
			String cityPinyin = map.get("cityPinyin");
			String cityNo = String.valueOf(map.get("cityNo"));
			String cityName = map.get("cityName");
			String operationKey = map.get("operationKey");
			String number = String.valueOf(map.get("number"));
			String expires = map.get("expires");
			for (String tempId : roleIds) {
				Map<String, String> obj = new HashMap<String, String>();
				obj.put("roleId", tempId);
				obj.put("usable", usable);
				obj.put("divisive", divisive);
				obj.put("type", type);
				obj.put("cityPinyin", cityPinyin);
				obj.put("cityNo", cityNo);
				obj.put("cityName", cityName);
				obj.put("operationKey", operationKey);
				obj.put("number", number);
				obj.put("expires", expires);
				prs.add(obj);
			}
		}
		authDao.delByRoleIds(roleIds);
		if(list.size() > 0){
			i = authDao.save2(prs);
		}
		
		return i;
	}
	
	public String ready(String roleId){
		List<Map<String, String>> list = authDao.ready(roleId);
		return JSONObject.toJSONString(list,SerializerFeature.WriteMapNullValue,SerializerFeature.WriteDateUseDateFormat);
	}
	
	/**
	 * <p>Description: 先删除  后插入</p>
	 * @author wliu 33185
	 * @date 2017年6月7日下午1:41:54
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public int copy(@SuppressWarnings("rawtypes") List<Map> idInfos,
			int divisivez,String roleId, String cityId){
		
		int i = 0;
		List<Map<String, String>> prs = new ArrayList<Map<String, String>>();
		// 查 -> 删  -> 插
		List<Map<String, String>> list = authDao.selectConfigByRoleIdAndCityId(roleId, cityId);
		for (Map<String, String> map : list) {
			String role = map.get("roleId");
			String usable = String.valueOf(map.get("usable"));
			String divisive = String.valueOf(map.get("divisive"));
			String type = String.valueOf(map.get("type"));
			String operationKey = map.get("operationKey");
			String number = String.valueOf(map.get("number"));
			String expires = map.get("expires");
			for (Map<String, String> cityInfo : idInfos) {
				String id = String.valueOf(cityInfo.get("cityId"));
				String name = cityInfo.get("cityName");
				String pinyin = cityInfo.get("pinyin");
				Map<String, String> obj = new HashMap<String, String>();
				obj.put("roleId", role);
				obj.put("usable", usable);
				obj.put("divisive", divisive);
				obj.put("type", type);
				obj.put("cityPinyin", pinyin);
				obj.put("cityNo", id);
				obj.put("cityName", name);
				obj.put("operationKey", operationKey);
				obj.put("number", number);
				obj.put("expires", expires);
				prs.add(obj);
			}
		}
		authDao.delByCitys(idInfos, roleId);
		if(list.size() > 0){
			i = authDao.save2(prs);
		}
		
		return i;
	}
	
	@Transactional
	public int save(@SuppressWarnings("rawtypes") List<Map> prs,
			int divisive,String roleId, String cityId){
		// 先删后插
		if(divisive == 0){
			authDao.delByNormal(roleId);
		}else{
			authDao.delByCity(roleId, cityId);
		}
		int i = authDao.save(prs);
		return i;
	}
	
	public String queryNormalFunctionInfo(String key,String roleId){
		List<Map<String, String>> list = authDao.queryNormalFunctionInfo(key,roleId);
		return JSONObject.toJSONString(list,SerializerFeature.WriteMapNullValue,SerializerFeature.WriteDateUseDateFormat);
	}
	
	public String queryCityFunctionInfo(String roleId,String cityId){
		List<Map<String, String>> list = authDao.queryCityFunctionInfo(roleId, cityId);
		return JSONObject.toJSONString(list,SerializerFeature.WriteMapNullValue,SerializerFeature.WriteDateUseDateFormat);
	}
	
	/**
	 * <p>Description: 查询激活的城市 </p>
	 * @author wliu 33185
	 * @date 2017年6月5日下午2:55:15
	 */
	public String queryActiveCityInfo(String roleId){
		List<Map<String, String>> list = authDao.selectActiveCityInfo(roleId);
		return JSONObject.toJSONString(list);
	}
	
	/**
	 * <p>Description: 查询不区分城市的功能 </p>
	 * @author wliu 33185
	 * @date 2017年6月5日下午1:50:07
	 */
	public List<Map<String, String>> queryNormalFunction(){
		List<Map<String, String>> list = authDao.queryNormalFunction();
		return list;
	}

	public String queryUserPrivilege(String userId) {
		List<Map<String, String>> list = authDao.selectUserPrivilege(userId);
		return JSONObject.toJSONString(list,
				SerializerFeature.WriteMapNullValue,
				SerializerFeature.WriteDateUseDateFormat);
	}

	// 在一个事务中处理
	@Transactional
	public String regUsers(@SuppressWarnings("rawtypes") List<Map> ilist,
			@SuppressWarnings("rawtypes") List<Map> ulist) {
		int i = 0;
		if (ilist.size() > 0) {

			i = authDao.iUsers(ilist);
			authDao.iPrivilege(ilist);
			SqlSession sqlSession = sysLogBaseDao.getSqlSession();
			String full = AuthDao.class.getName() + ".iUsers";
			String sql = SqlHelper.getMapperSql(sqlSession, full, ilist);
			System.out.println(sql);

		}

		if (ulist.size() > 0) {

			authDao.uUsers(ulist);
			SqlSession sqlSession = sysLogBaseDao.getSqlSession();
			String full = AuthDao.class.getName() + ".uUsers";
			String sql = SqlHelper.getMapperSql(sqlSession, full, ilist);
			System.out.println(sql);
		}

		JSONObject json = new JSONObject();
		json.put("i", ilist.size());
		json.put("u", ulist.size());
		json.put("s", i == ilist.size() ? 1 : 0);

		return json.toJSONString();
	}

	public List<Map<String, String>> check(
			@SuppressWarnings("rawtypes") List<Map> list) {

		SqlSession sqlSession = sysLogBaseDao.getSqlSession();
		String full = AuthDao.class.getName() + ".check";
		String sql = SqlHelper.getMapperSql(sqlSession, full, list);
		System.out.println(sql);

		return authDao.check(list);
	}

	public List<Map<String, String>> queryAstrictUsers() {
		return authDao.selectAstrictUsers();
	}

	public Integer astrict(String userId, String nickName) {
		int result = authDao.astrict(userId);

		if (1 == result) {
			invokeWxInterface(userId, nickName);
		}

		return result;
	}

	private void invokeWxInterface(String userId, String nickName) {
		ExecutorService singleThread = Executors.newSingleThreadExecutor();
		singleThread.execute(new Runnable() {
			public void run() {
				// 解封成功 调用订阅号通知接口 发送通知
				// 用户XXX（手机号XXX）已解除账户锁定。
				StringBuffer template = new StringBuffer();
				template.append("用户 ");
				template.append(nickName);
				template.append(" （手机号 ");
				template.append(userId);
				template.append(" ）已解除账户锁定。");
				String title = "账户访问异常解锁";
				
				SimpleDateFormat sdf = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				String times = sdf.format(new Date());

				JSONObject prs = new JSONObject();
				prs.put("key", "temp");
				prs.put("times", times);
				prs.put("title", title);
				prs.put("contents", template.toString());
				prs.put("types", 2);

				String params = "";
				String secret = singleSignOn.getMessageSecret();
				String url = singleSignOn.getMessageUrl();
				
				try {
					params = AESHelper.encrypt(secret, prs.toJSONString());
				} catch (Exception e) {
					e.printStackTrace();
				}

				List<NameValuePair> prsList = new ArrayList<NameValuePair>();
				prsList.add(new BasicNameValuePair("token", params));
				HttpClientHelper.post(url, prsList);
			}
		});
	}

	public List<Map<String, String>> queryMonitorSub(Map<String, String> map) {
		return authDao.selectMonitorSub(map);
	}

	public List<Map<String, String>> queryMonitorInfo(Map<String, String> map) {
		return authDao.selectMonitorInfo(map);
	}

	public int queryMonitorCount(Map<String, String> map) {
		return authDao.selectMonitorCount(map);
	}

	/**
	 * {name:"湖南省",item:"[{"name":"长沙市","value":"430124"}"]}
	 */
	@Override
	public Map<String, List<Map<String, String>>> searchProvInfo() {
		List<Province> list = authDao.selectProvDetails();
		Map<String, List<Map<String, String>>> cityMap = new LinkedHashMap<String, List<Map<String, String>>>();
		for (Province province : list) {
			String prov = province.getProv();
			String city = province.getCity();
			String provId = province.getProvId();
			String cityId = province.getCityId();

			// 处理市数据
			List<Map<String, String>> cityList = null;
			if (!cityMap.containsKey(prov)) {
				cityList = new ArrayList<Map<String, String>>();
				cityMap.put(prov, cityList);
				Map<String, String> cityBeanMap = new LinkedHashMap<String, String>();
				cityBeanMap.put("fid", provId);
				cityBeanMap.put("type", "city");
				cityBeanMap.put("name", city);
				cityBeanMap.put("value", cityId);
				cityList.add(cityBeanMap);
			} else {
				List<Map<String, String>> subList = cityMap.get(prov);
				boolean isExists = false;
				for (int i = subList.size() - 1; i >= 0; i--) {
					Map<String, String> map = subList.get(i);
					String tempValueString = map.get("value");
					if (tempValueString.equals(cityId)) {
						isExists = true;
						break;
					}
				}
				if (!isExists) {
					Map<String, String> cityBeanMap = new LinkedHashMap<String, String>();
					cityBeanMap.put("fid", provId);
					cityBeanMap.put("type", "city");
					cityBeanMap.put("name", city);
					cityBeanMap.put("value", cityId);
					subList.add(cityBeanMap);
				}
			}
		}
		return cityMap;
	}

	@Override
	public List<Map<String, String>> searchMenuInfo() {
		return authDao.selectMenuDetails();
	}

	@Override
	public List<Map<String, String>> searchRoleInfo() {
		return authDao.selectRoleDetails();
	}

	/**
	 * 保存角色权限关系设置 删除和插入放入同一事务中
	 */
	@Override
	@Transactional
	public Integer saveRoleAuthSettings(String userIds, String menulistIds,
			String cityInfo) {
		List<HashMap<String, String>> authInfo = new ArrayList<HashMap<String, String>>();
		List<CityAndCountsBean> list = (List<CityAndCountsBean>) JSONArray
				.parseArray(cityInfo, CityAndCountsBean.class);
		List<MenuBean> menuList = (List<MenuBean>) JSONArray.parseArray(
				menulistIds, MenuBean.class);

		String[] userArray = userIds.split(",");
		// 用户id
		for (int i = 0; i < userArray.length; i++) {
			String userId = userArray[i];
			// 城市
			for (CityAndCountsBean ccb : list) {

				String downloadCounts = ccb.getDownloadCounts();
				String cityId = ccb.getCityId();
				String cityName = ccb.getCityName();
				String cityPy = ccb.getCityPy();
				String dueTime = ccb.getDueTime();
				if (cityId == null || cityId.isEmpty()
						|| downloadCounts == null || downloadCounts.isEmpty()
						|| userId == null || userId.isEmpty()) {
					continue;
				}

				// 菜单
				for (MenuBean menu : menuList) {

					HashMap<String, String> map = new HashMap<String, String>();
					String bigClassName = menu.getBigClassName();
					String menuId = menu.getMenuId();
					if (menuId == null || menuId.isEmpty()
							|| bigClassName == null || bigClassName.isEmpty()) {
						continue;
					}
					map.put("userId", userId);
					map.put("cityId", cityId);
					map.put("cityName", cityName);
					map.put("cityPy", cityPy);
					map.put("downloadCounts", downloadCounts);
					map.put("bigClassName", bigClassName);
					map.put("menuId", menuId);
					map.put("dueTime", dueTime);
					authInfo.add(map);
				}
			}
		}
		int result = 0;
		if (authInfo.size() != 0) {
			authDao.deleteUserAuth(userArray, list);
			result = authDao.insertUserAuth(authInfo);
		}
		return result;
	}

	@Override
	public String roleSettingDetails() {
		List<Map<String, String>> detailsList = authDao.selectRoleSettingInfo();
		return JSONObject.toJSONString(detailsList);
	}

	@Override
	public Map<String, String> queryReportData() {
		return authDao.selectReportData();
	}

	public Map<String, String> queryReportDataByRegs() {
		return authDao.selectReportDataByRegs();
	}

	@Override
	public List<Map<String, String>> queryAllUserAndRole() {
		return authDao.selectAllUserAndRole();
	}

	@Override
	public List<Map<String, String>> queryActiveCity() {
		// TODO Auto-generated method stub
		return authDao.selectActiveCity();
	}

	@Override
	public List<Map<String, String>> queryRegUserInfo() {
		// TODO Auto-generated method stub
		return authDao.selectRegUserInfo();
	}

	public int generateKey(String key,String name,String remark,String divisive){
		return authDao.generateKey(key, name, remark, divisive);
	}
	
	public int addRole(String name,String remark,String roleId){
		Map<String, String> map = new HashMap<String,String>();
		map.put("id", "");
		map.put("name", name);
		map.put("remark", remark);
		map.put("roleId", roleId);
		int i = authDao.addRole(map);
		return i;
	}
	
	public int updateUserRole(String userId,String roleId ,String prevRoleId){
		int i = 0;
		Map<String, String> map = new HashMap<String,String>();
		map.put("userId", userId);
		map.put("roleId", roleId);
		if(StringUtils.isEmpty(prevRoleId)){
			i = authDao.insertUserRole(map);
		}else{
			i = authDao.updateUserRole(map);
		}
		return i;
	}
	
	
}
