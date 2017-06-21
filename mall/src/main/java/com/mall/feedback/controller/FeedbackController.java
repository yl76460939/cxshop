package com.mall.feedback.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.feedback.biz.impl.FeedbackBizImpl;

/**
 * <p>Description:  用户反馈controller</p>
 * @author wliu 33185
 * @date 2016年7月5日 上午10:42:02
 */
@Controller
@RequestMapping("feedbackCtrl")
public class FeedbackController {
	
	private static Logger log = Logger.getLogger(FeedbackController.class);
	
	@Resource
	FeedbackBizImpl feedbackBiz;
	
	/**
	 * <p>Description: 查询版本记录 分页</p>
	 * @author wliu
	 * @date 2016年7月20日 上午11:13:04
	 */
	@RequestMapping("qeruyVersionHistory")
	@ResponseBody
	public String qeruyVersionHistory(HttpServletRequest request){
		String start = request.getParameter("start");
		String length = request.getParameter("length");
		long endRow = Long.parseLong(length) + Long.parseLong(start);
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("start", start);
		paramsMap.put("length", endRow);
		String result = feedbackBiz.qeruyVersionHistory(paramsMap);
		return result;
	}
	
	/**
	 * <p>Description: 初始化FAQ</p>
	 * @author wliu
	 * @date 2016年7月12日 下午5:32:15
	 */
	@RequestMapping("initFAQInfo")
	public ModelAndView initFAQInfo(){
		List<Map<String, String>> typeInfo = feedbackBiz.selectFaqType();
		// 给个默认值查询
		String isDefault = "0";
		for (Map<String, String> map : typeInfo) {
			String isDef = map.get("isDefault");
			if(isDef != null && !isDef.isEmpty()){
				isDefault = isDef;
				break;
			}
		}
		List<Map<String, String>> list = feedbackBiz.selectFaqInfoByFid(isDefault);
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("typeInfo", typeInfo);
		modelAndView.addObject("listInfo", list);
		modelAndView.setViewName("faq/faqpreview");
		return modelAndView;
	}
	
	/**
	 * <p>Description: 根据fid查询对应的FAQ list 返回json fid不能为空</p>
	 * @author wliu
	 * @return jsonString
	 * @date 2016年7月13日 上午9:01:17
	 */
	@RequestMapping("queryFAQInfo")
	@ResponseBody
	public String queryFAQContent(@RequestParam(value="fid",required = true)String fid){
		List<Map<String, String>> list = feedbackBiz.selectFaqInfoByFid(fid);
		return JSONObject.toJSONString(list,SerializerFeature.WriteMapNullValue);
	}
	
	@RequestMapping("queryFaqById")
	public ModelAndView queryFaqById(HttpServletRequest request){
		String id = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("detailInfo", feedbackBiz.queryFaqById(id));
		modelAndView.addObject("typeInfo", feedbackBiz.selectFaqType());
		modelAndView.setViewName("faq/faqDetail");
		return modelAndView;
	}
	
	@RequestMapping("queryVersionById")
	public ModelAndView queryVersionById(HttpServletRequest request){
		String id = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("detailInfo", feedbackBiz.queryVersionById(id));
		modelAndView.setViewName("versionhistory/versionInfo");
		return modelAndView;
	}
	
	@RequestMapping("initType")
	public ModelAndView initType(HttpServletRequest request){
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("typeInfo", feedbackBiz.selectFaqType());
		modelAndView.setViewName("faq/addFaqDetail");
		return modelAndView;
	}
	
	@RequestMapping("queryFaqInfo")
	@ResponseBody
	public String queryFaqInfo(HttpServletRequest request){
		String start = request.getParameter("start");
		String length = request.getParameter("length");
		long endRow = Long.parseLong(length) + Long.parseLong(start);
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("start", start);
		paramsMap.put("length", endRow);
		String result = feedbackBiz.queryFaqInfo(paramsMap);
		return result;
	}
	
	@RequestMapping("updateFaqInfo")
	@ResponseBody
	public String updateFaqInfo(HttpServletRequest request){
		String content = request.getParameter("content");
		String title = request.getParameter("title");
		String colorClass = request.getParameter("colorClass");
		String fid = request.getParameter("fid");
		String id = request.getParameter("id");
		String isOpen = request.getParameter("isOpen");
		String isPublish = request.getParameter("isPublish");
		String result = "0";
		if(id != null && !id.isEmpty()){
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("content", content);
			paramsMap.put("title", title);
			paramsMap.put("colorClass", colorClass);
			paramsMap.put("fid", fid);
			paramsMap.put("id", id);
			paramsMap.put("isOpen", isOpen);
			paramsMap.put("isPublish", isPublish);
			result = feedbackBiz.updateFaqItem(paramsMap);
		}
		return result;
	}
	
	@RequestMapping("updateVersionInfo")
	@ResponseBody
	public String updateVersionInfo(HttpServletRequest request){
		String id = request.getParameter("id");
		String title = request.getParameter("title");
		String time = request.getParameter("time");
		String versionNum = request.getParameter("versionNum");
		String triggered = request.getParameter("triggered");
		String isPublish = request.getParameter("isPublish");
		String briefContents = request.getParameter("briefContents");
		String detailContents = request.getParameter("detailContents");
		String result = "0";
		if(id != null && !id.isEmpty()){
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("id", id);
			paramsMap.put("title", title);
			paramsMap.put("time", time);
			paramsMap.put("versionNum", versionNum);
			paramsMap.put("triggered", triggered);
			paramsMap.put("isPublish", isPublish);
			paramsMap.put("briefContents", briefContents);
			paramsMap.put("detailContents", detailContents);
			result = feedbackBiz.updateVersionItem(paramsMap);
		}
		return result;
	}
	
	@RequestMapping("addVersionInfo")
	@ResponseBody
	public String addVersionInfo(HttpServletRequest request){
		String title = request.getParameter("title");
		String time = request.getParameter("time");
		String versionNum = request.getParameter("versionNum");
		String triggered = request.getParameter("triggered");
		String isPublish = request.getParameter("isPublish");
		String briefContents = request.getParameter("briefContents");
		String detailContents = request.getParameter("detailContents");
		String result = "0";
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("title", title);
		paramsMap.put("time", time);
		paramsMap.put("versionNum", versionNum);
		paramsMap.put("triggered", triggered);
		paramsMap.put("isPublish", isPublish);
		paramsMap.put("briefContents", briefContents);
		paramsMap.put("detailContents", detailContents);
		result = feedbackBiz.addVersionItem(paramsMap);
		return result;
	}
	
	@RequestMapping("addFaqInfo")
	@ResponseBody
	public String addFaqInfo(HttpServletRequest request){
		String content = request.getParameter("content");
		String title = request.getParameter("title");
		String colorClass = request.getParameter("colorClass");
		String fid = request.getParameter("fid");
		String isOpen = request.getParameter("isOpen");
		String isPublish = request.getParameter("isPublish");
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("content", content);
		paramsMap.put("title", title);
		paramsMap.put("colorClass", colorClass);
		paramsMap.put("fid", fid);
		paramsMap.put("isOpen", isOpen);
		paramsMap.put("isPublish", isPublish);
		String result = feedbackBiz.addFaqItem(paramsMap);
		return result;
	}
	
	@RequestMapping("queryDetail")
	public ModelAndView queryDetail(HttpServletRequest request){
		String id = request.getParameter("id");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("detailInfo", feedbackBiz.queryDetail(id));
		modelAndView.setViewName("feedback/feedbackDetail");
		return modelAndView;
	}
	
	@RequestMapping("queryFeedback")
	@ResponseBody
	public String queryFeedbackInfo(HttpServletRequest request){
		String start = request.getParameter("start");
		String length = request.getParameter("length");
		String draw = request.getParameter("draw");
		String time1 = request.getParameter("time1");
		String time2 = request.getParameter("time2");
		String status = request.getParameter("status");
		long endRow = Long.parseLong(length) + Long.parseLong(start);
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("start", start);
		paramsMap.put("length", endRow);
		paramsMap.put("draw", draw);
		paramsMap.put("time1", time1);
		paramsMap.put("time2", time2);
		paramsMap.put("status", status);
		log.debug("time1:\r\n"+time1);
		log.debug("time2:\r\n"+time2);
		String result = feedbackBiz.queryFeedbackInfo(paramsMap);
		log.debug("result:\r\n"+result);
		return result;
	}
	
	@RequestMapping("save")
	@ResponseBody
	public String save(HttpServletRequest request){
		String id = request.getParameter("id");
		String handler = request.getParameter("hander");
		String remark = request.getParameter("remark");
		String lastTime = request.getParameter("lastTime");
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("id", id);
		paramsMap.put("handler", handler);
		paramsMap.put("remark", remark);
		paramsMap.put("lastTime", lastTime);
		return feedbackBiz.save(paramsMap);
	}
	
	@RequestMapping("delFaq")
	@ResponseBody
	public String delFaqInfo(HttpServletRequest request){
		String id = request.getParameter("id");
		return feedbackBiz.deleteFaqInfoById(id);
	}
	
}
