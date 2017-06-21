package com.mall.auth.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.auth.service.impl.AuthBizImpl;

/**
 * @author 33185 2016-3-15 14:33:53
 */
@Controller
@RequestMapping("authController")
public class AuthController {

	@Resource
	AuthBizImpl authBiz;
	
	@RequestMapping("copyrole")
	@ResponseBody
	public String copyrole(String roleId,String roleIds) {
		List<String> list = JSONArray.parseArray(roleIds, String.class);
		int i = authBiz.copyrole(roleId,list);
		return String.valueOf(i);
	}
	
	/**
	 * <p>Description: 查询已经存在的roleInfo</p>
	 * @author wliu 33185
	 * @date 2017年6月8日下午2:54:07
	 */
	@RequestMapping("role")
	@ResponseBody
	public String role() {
		List<Map<String, String>> list = authBiz.searchRoleInfo();
		String result = JSONObject.toJSONString(list,
				SerializerFeature.WriteMapNullValue,
				SerializerFeature.WriteDateUseDateFormat);
		return result;
	}
	
	@RequestMapping("ready")
	@ResponseBody
	public String ready(String roleId) {
		String citys = authBiz.ready(roleId);
		return citys;
	}
	
	@RequestMapping("copy")
	@ResponseBody
	public String copy(String citys,Integer divisive,String roleId, String cityId) {
		@SuppressWarnings("rawtypes")
		List<Map> list = JSONArray.parseArray(citys, Map.class);
		int i = authBiz.copy(list,1,roleId,cityId);
		return String.valueOf(i);
	}
	
	@RequestMapping("save")
	@ResponseBody
	public String save(String prs,Integer divisive,String roleId, String cityId) {
		@SuppressWarnings("rawtypes")
		List<Map> list = JSONArray.parseArray(prs, Map.class);
		int i = authBiz.save(list,divisive,roleId,cityId);
		return String.valueOf(i);
	}
	
	/**
	 * <p>Description: 跟据操作key 角色id 查询不区分城市的权限信息</p>
	 * @author wliu 33185
	 * @date 2017年6月6日上午11:15:32
	 */
	@RequestMapping("normal")
	@ResponseBody
	public String queryNormalFunctionInfo(String key,String roleId) {
		String result = authBiz.queryNormalFunctionInfo(key,roleId);
		return result;
	}
	
	/**
	 * <p>Description: 根据角色id 和城市id 查询区分城市的已设置和未设置的权限信息</p>
	 * @author wliu 33185
	 * @date 2017年6月6日上午11:16:04
	 */
	@RequestMapping("divisive")
	@ResponseBody
	public String queryCityFunctionInfo(String roleId,String cityId,
			String cityName,String pinyin) {
		String result = authBiz.queryCityFunctionInfo(roleId, cityId);
		return result;
	}
	
	/**
	 * <p>Description: 查询激活的城市 </p>
	 * @author wliu 33185
	 * @date 2017年6月5日下午2:55:32
	 */
	@RequestMapping("queryCity")
	@ResponseBody
	public String queryActiveCityInfo(String roleId) {
		String result = authBiz.queryActiveCityInfo(roleId);
		return result;
	}

	@RequestMapping(value = "privilege")
	@ResponseBody
	public String privilegeDetail(String userId) {
		String result = authBiz.queryUserPrivilege(userId);
		return result;
	}

	@RequestMapping(value = "reg")
	@ResponseBody
	public String regUsers(HttpServletRequest request) {
		String iArr = request.getParameter("iArr");
		String uArr = request.getParameter("uArr");
		@SuppressWarnings("rawtypes")
		List<Map> ilist = JSONArray.parseArray(iArr, Map.class);
		@SuppressWarnings("rawtypes")
		List<Map> ulist = JSONArray.parseArray(uArr, Map.class);
		String opt = authBiz.regUsers(ilist, ulist);

		return opt;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "check")
	@ResponseBody
	public String checkUsers(HttpServletRequest request) {

		List<JSONObject> resultList = new ArrayList<JSONObject>();
		String users = request.getParameter("users");
		@SuppressWarnings("rawtypes")
		List<Map> list = JSONArray.parseArray(users, Map.class);
		if (!list.isEmpty() && list.size() > 0) {
			List<Map<String, String>> results = authBiz.check(list);

			for (Map<String, String> map : list) {
				String workNo = (String) map.get("workNo");
				String phoneNo = (String) map.get("phoneNo");
				boolean phoneNoFlag = false;
				boolean workNoFlag = false;
				boolean workNoAndPhoneNo = false;
				if (!results.isEmpty() && results.size() > 0) {
					for (Map<String, String> result : results) {
						String nickName = (String) result.get("NICKNAME");
						String userId = (String) result.get("USER_ID");
						/*
						 * System.out.println(phoneNo + " ====== " + userId);
						 * System.out.println(workNo + " ------ " + nickName);
						 */
						if (phoneNo.equals(userId) && workNo.equals(nickName)) {
							workNoAndPhoneNo = true;
							break;
						} else if (phoneNo.equals(userId)) {
							phoneNoFlag = true;
						} else if (workNo.equals(nickName)) {
							workNoFlag = true;
						}
					}
				}
				/*
				 * System.out.println("-----------------------");
				 * System.out.println(phoneNo + "  ----  " + workNo);
				 * System.out.println("workNoAndPhoneNo  ----  " +
				 * workNoAndPhoneNo); System.out.println("phoneNoFlag  ----  " +
				 * phoneNoFlag); System.out.println("workNoFlag  ----  " +
				 * workNoFlag);
				 */

				JSONObject result = new JSONObject();
				result.put("key", phoneNo);
				result.put("value", workNo);
				result.put("pass", true);
				// 0 插入id 和nickname
				// 1 修改nickname
				// 2 不需要处理
				// 3 不能处理 检查工号

				if (workNoAndPhoneNo) {
					// 已注册手机号码工号核对正确 pass
					result.put("msg", "已注册 手机号码工号核对正确");
					result.put("flag", 2);
				} else if (phoneNoFlag && !workNoFlag) {
					// 已注册 工号可用 pass
					result.put("msg", "已注册  工号可用");
					result.put("flag", 1);
				} else if (phoneNoFlag && workNoFlag) {
					// 已注册 工号被占用
					result.put("pass", false);
					result.put("msg", "已注册  工号被占用");
					result.put("flag", 3);
				} else if (!phoneNoFlag && workNoFlag) {
					// 未注册 工号被占用
					result.put("pass", false);
					result.put("msg", "未注册 工号被占用");
					result.put("flag", 3);
				} else if (!workNoAndPhoneNo && !phoneNoFlag && !workNoFlag) {
					// 未注册 工号可用
					result.put("msg", "未注册 工号可用");
					result.put("flag", 0);
				}
				resultList.add(result);

			}

		}

		resultList.sort((o1, o2) -> {
			String str1 = String.valueOf(o1.get("flag"));
			String str2 = String.valueOf(o2.get("flag"));
			return str1.compareTo(str2);
		});

		return JSONObject.toJSONString(resultList);
	}

	@RequestMapping(value = "astrictUsers")
	@ResponseBody
	public String queryAstrictUsers(HttpServletRequest request) {

		List<Map<String, String>> list = authBiz.queryAstrictUsers();
		JSONObject json = new JSONObject();
		json.put("data", list);
		return JSONObject.toJSONString(json,
				SerializerFeature.WriteMapNullValue);
	}

	@RequestMapping(value = "astrict", method = RequestMethod.POST)
	@ResponseBody
	public String astrict(HttpServletRequest request) {
		int result = 0;
		String userId = request.getParameter("userId");
		String nickName = request.getParameter("nickName");
		if (userId != null && !userId.isEmpty()) {
			result = authBiz.astrict(userId, nickName);
		}
		return String.valueOf(result);
	}

	@RequestMapping(value = "queryMonitorSub", method = RequestMethod.POST)
	@ResponseBody
	public String queryMonitorSub(HttpServletRequest request) {

		String userId = request.getParameter("userId");
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String status = request.getParameter("status");
		Map<String, String> map = new HashMap<String, String>();
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("userId", userId);
		map.put("status", status);
		List<Map<String, String>> list = authBiz.queryMonitorSub(map);

		return JSONObject.toJSONString(list,
				SerializerFeature.WriteMapNullValue);
	}

	@RequestMapping(value = "queryMonitor", method = RequestMethod.POST)
	@ResponseBody
	public String queryMonitorInfo(HttpServletRequest request) {

		// 排序字段
		String orderbyIndex = request.getParameter("order[0][column]");
		String orderbyStr = request.getParameter("columns[" + orderbyIndex
				+ "][name]");
		String dir = request.getParameter("order[0][dir]");
		String start = request.getParameter("start");
		String length = request.getParameter("length");
		String orderby = orderbyStr + " " + dir;
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		String status = request.getParameter("status");

		Map<String, String> map = new HashMap<String, String>();
		map.put("orderby", orderby);
		map.put("start", start);
		long endRow = Long.parseLong(length) + Long.parseLong(start);
		map.put("length", String.valueOf(endRow));
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("status", status);

		List<Map<String, String>> list = authBiz.queryMonitorInfo(map);
		int count = authBiz.queryMonitorCount(map);
		JSONObject json = new JSONObject();
		json.put("recordsTotal", count);
		json.put("recordsFiltered", count);
		json.put("data", list);
		return json.toJSONString();
	}

	/**
	 * 保存角色权限关系设置
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "saveRoleAuth", method = RequestMethod.POST)
	@ResponseBody
	public String saveRoleAuthSettings(HttpServletRequest request) {
		String ids = request.getParameter("ids");
		String menulistIds = request.getParameter("menulistIds");
		String cityInfo = request.getParameter("cityInfo");
		int saveResult = authBiz.saveRoleAuthSettings(ids, menulistIds,
				cityInfo);
		return String.valueOf(saveResult);
	}

	/**
	 * 查询角色设置页面的初始化信息
	 * 
	 * @return
	 */
	@RequestMapping("roleInit")
	public ModelAndView initializeRoleSettingsInfo() {

		ModelAndView modelAndView = new ModelAndView();

		// 省市
		// modelAndView.addObject("cityInfo", authBiz.searchProvInfo());
		// 菜单列表
		// modelAndView.addObject("menuInfo", authBiz.searchMenuInfo());
		// 市
		// modelAndView.addObject("cInfo", authBiz.queryActiveCity());
		// 注册用户信息
		// modelAndView.addObject("regUserInfo", authBiz.queryRegUserInfo());

		// 角色
		modelAndView.addObject("roleInfo", authBiz.searchRoleInfo());
		// 不区分城市的功能
		modelAndView.addObject("functionInfo", authBiz.queryNormalFunction());

		// 默认到期时间 当前时间+3 年
		Calendar cld = Calendar.getInstance();
		cld.add(Calendar.YEAR, 3);
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String dueTime = sdf.format(cld.getTime());
		modelAndView.addObject("dueTime", dueTime);

		// 角色权限设置页面
		modelAndView.setViewName("authority/rolesettings");

		return modelAndView;
	}

	@RequestMapping("roleSettingDetail")
	public ModelAndView roleSettingDetails() {
		ModelAndView modelAndView = new ModelAndView();

		modelAndView.addObject("detailsInfo", authBiz.roleSettingDetails());
		modelAndView.setViewName("authority/detailsInfo");
		return modelAndView;
	}

	@RequestMapping("userRole")
	public ModelAndView showUserRole() {
		ModelAndView modelAndView = new ModelAndView();
		String userRoleInfo = JSONObject.toJSONString(
				authBiz.queryAllUserAndRole(),
				SerializerFeature.WriteMapNullValue);
		modelAndView.addObject("userRoleInfo", userRoleInfo);
		modelAndView.addObject("reportData", authBiz.queryReportDataByRegs());
		modelAndView.addObject("roleInfo",
				JSON.toJSON(authBiz.searchRoleInfo()));
		modelAndView.setViewName("authority/userRole");
		return modelAndView;
	}

	/**
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "after", method = RequestMethod.POST)
	@ResponseBody
	public String after(HttpServletRequest request) {
		String result = JSONObject.toJSONString(authBiz.queryReportData(),
				SerializerFeature.WriteMapNullValue);
		return result;
	}
	
	private String createKey(){
		String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		StringBuffer letbuf = new StringBuffer("L");
		StringBuffer numbuf = new StringBuffer("1");
		for (int i = 0; i < 6; i++) {
			letbuf.append(letters.charAt(new Random().nextInt(26)));
			numbuf.append(new Random().nextInt(10));
		}
		String key = letbuf.toString() +"-"+ numbuf.toString();
		return key;
	}

	@RequestMapping(value = "key", method = RequestMethod.POST)
	@ResponseBody
	public String key(HttpServletRequest request) {
		return createKey();
	}
	
	@RequestMapping("keyInit")
	public ModelAndView keyInit() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("allKey", authBiz.queryAllKey());
		modelAndView.addObject("allRole", authBiz.searchRoleInfo());
		modelAndView.addObject("menuInfo", authBiz.searchMenuInfo());
		modelAndView.setViewName("authority/operationKey");
		return modelAndView;
	}

	@RequestMapping(value = "generate", method = RequestMethod.POST)
	@ResponseBody
	public String generateKey(String key, String name, String remark,
			String divisive, HttpServletRequest request) {
		int i = authBiz.generateKey(key, name, remark, divisive);
		return String.valueOf(i);
	}
	
	@RequestMapping(value = "addRole", method = RequestMethod.POST)
	@ResponseBody
	public String addRole(String name, String remark, HttpServletRequest request) {
		int i = authBiz.addRole(name, remark, createKey());
		return String.valueOf(i);
	}
	
	@RequestMapping(value = "allKey", method = RequestMethod.POST)
	@ResponseBody
	public String allKey(HttpServletRequest request) {
		String result = JSONObject.toJSONString(authBiz.queryAllKey(),
				SerializerFeature.WriteMapNullValue);
		return result;
	}
	
	@RequestMapping(value = "allRole", method = RequestMethod.POST)
	@ResponseBody
	public String allRole(HttpServletRequest request) {
		String result = JSONObject.toJSONString(authBiz.searchRoleInfo(),
				SerializerFeature.WriteMapNullValue);
		return result;
	}
	
	@RequestMapping(value = "selectRoleByName", method = RequestMethod.POST)
	@ResponseBody
	public String selectRoleByName(String roleName) {
		int result = authBiz.selectRoleByName(roleName);
		return String.valueOf(result);
	}
	
	@RequestMapping(value = "updateUserRole", method = RequestMethod.POST)
	@ResponseBody
	public String updateUserRole(String userId, String roleId, String prevRoleId) {
		int i = authBiz.updateUserRole(userId, roleId, prevRoleId);
		return String.valueOf(i);
	}
	
}
