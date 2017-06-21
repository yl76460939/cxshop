package com.mall.dataupdate.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.dataupdate.bean.DataUpdateType;
import com.mall.dataupdate.biz.impl.DataUpdateBizImpl;
import com.mall.sso.bean.UserInfo;

/**
 * <p>Description: 数据更新公告</p>
 * @author wliu 33185
 * @date 2016年9月18日 上午9:25:17
 */
@Controller
@RequestMapping("dataUpdate")
public class DataUpdateController {
	
	@Resource
	private DataUpdateBizImpl biz;
	
	@RequestMapping("init")
	public ModelAndView initDataUpdateInfo(){
		ModelAndView modelAndView = new ModelAndView();
		// 数据类型 可选城市
		List<DataUpdateType> list = biz.queryInitInfo();
		modelAndView.addObject("initInfo", list);
		
		// 设置页面
		modelAndView.setViewName("dataupdate/addUpdateRecord");

		return modelAndView;
	}
	
	@RequestMapping("queryCityByType")
	@ResponseBody
	public String queryActiveCityByDataType(
			@RequestParam(value="dataTypeId",required = true)String dataTypeId){
		List<Map<String, String>> list = biz.queryActiveCityByDataType(dataTypeId);
		return JSONObject.toJSONString(list,
				SerializerFeature.WriteMapNullValue);
	}
	
	/**
	 * <p>Description: 添加版本更新记录</p>
	 * @author wliu
	 * @date 2016年9月18日 上午9:28:09
	 */
	@RequestMapping("add")
	@ResponseBody
	public String addUpdateRecord(HttpServletRequest request,
			HttpSession session){
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		String params = request.getParameter("params");
		JSONArray jarray = JSONObject.parseArray(params);
		List<Map<String, String>> paramsList = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:MM");
		String createTime = sdf.format(new Date());
		String timeString = createTime;
		for (Object object : jarray) {
			@SuppressWarnings("unchecked")
			Map<String, String> map = (Map<String, String>)object;
			
			String format = map.get("format");
			// format = format == null || format.isEmpty() ? "yyyy-MM-dd" : format;
			format = "yyyy年MM月dd日";
			//  dataTypeId ,cityId,isMultipleCity,createTime,createUserId
	        // ,lastUpdateTime,lastUpdateUserId,rowState,isPublish,dataUpdateTime
			String cityId = map.get("cityId");
			// String cityName = map.get("cityName");
			String dataTypeId = map.get("dataTypeId");
			SimpleDateFormat sdformat = new SimpleDateFormat(format);
			String dataUpdateTime = sdformat.format(new Date());
			timeString = dataUpdateTime;
			String isMultipleCity = "1";
			String createUserId = userInfo.getUserId();
			String rowState = "0";
			String isPublish = "1";
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("dataTypeId", dataTypeId);
			paramMap.put("cityId", cityId);
			paramMap.put("isMultipleCity", isMultipleCity);
			paramMap.put("createTime", createTime);
			paramMap.put("createUserId", createUserId);
			paramMap.put("lastUpdateTime", createTime);
			paramMap.put("lastUpdateUserId", createUserId);
			paramMap.put("rowState", rowState);
			paramMap.put("isPublish", isPublish);
			paramMap.put("dataUpdateTime", dataUpdateTime);
			paramsList.add(paramMap);
		}
		int result = biz.addUpdateRecord(paramsList);
		timeString = result > 0 ? timeString : "";
		JSONObject res = new JSONObject();
		res.put("result", timeString);
		return res.toJSONString();
	}
	
	/**
	 * <p>Description: 更新记录</p>
	 * @author wliu
	 * @date 2016年9月18日 上午9:28:09
	 */
	@RequestMapping("update")
	@ResponseBody
	public String updateRecord(HttpServletRequest request,
			HttpSession session){
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
		String params = request.getParameter("params");
		JSONArray jarray = JSONObject.parseArray(params);
		List<Map<String, String>> paramsList = new ArrayList<Map<String,String>>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:MM");
		String lastUpdateTime = sdf.format(new Date());
		for (Object object : jarray) {
			@SuppressWarnings("unchecked")
			Map<String, String> map = (Map<String, String>)object;
			
			String format = map.get("format");
			format = format == null || format.isEmpty() ? "yyyy-MM-dd" : format;
			//  dataTypeId ,cityId,isMultipleCity,createTime,createUserId
	        // ,lastUpdateTime,lastUpdateUserId,rowState,isPublish,dataUpdateTime
			String cityId = map.get("cityId");
			String dataUpdateTime = map.get("dataUpdateTime");
			String dataTypeId = map.get("dataTypeId");
			String lastUpdateUserId = userInfo.getUserId();
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("dataTypeId", dataTypeId);
			paramMap.put("cityId", cityId);
			paramMap.put("lastUpdateTime", lastUpdateTime);
			paramMap.put("lastUpdateUserId", lastUpdateUserId);
			paramMap.put("dataUpdateTime", dataUpdateTime);
			paramsList.add(paramMap);
		}
		int result = biz.updateRecord(paramsList);
		return String.valueOf(result);
	}
}
