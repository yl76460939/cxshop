package com.mall.feedback.biz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.feedback.biz.FeedbackBiz;
import com.mall.feedback.dao.FeedbackDao;
import com.mall.syslog.bean.LogRecordParamsBean;
import com.mall.syslog.service.impl.LogWriter;

/**
 * <p>
 * Description:
 * </p>
 * 
 * @author wliu 33185
 * @date 2016年7月5日 上午10:56:53
 */
@Service("feedbackBiz")
public class FeedbackBizImpl implements FeedbackBiz {

	@Resource
	FeedbackDao feedbackDao;

	@Resource
	LogWriter logWriter;
	
	public String deleteFaqInfoById(String id){
		int i = feedbackDao.deleteFaqInfoById(id);
		return String.valueOf(i);
	}
	
	public String qeruyVersionHistory(Map<String, Object> map) {
		String oprStatus = LogWriter.SUC;
		String parserStr = "";
		try {
			List<Map<String, String>> list = feedbackDao.selectVersionHistory(map);
			int count = feedbackDao.selectVersionHistoryCount(map);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("data", list);
			jsonObject.put("recordsTotal", count);
			jsonObject.put("recordsFiltered", count);

			parserStr = JSONObject.toJSONString(jsonObject,
					SerializerFeature.WriteDateUseDateFormat,
					SerializerFeature.WriteMapNullValue);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectVersionHistory");
			logRecord.setDescription("查询所有版本记录");
			logRecord.setModuleId("versionhistory");
			logRecord.setModuleName("版本记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}

		return parserStr;
	}
	
	public List<Map<String, String>> selectFaqInfoByFid(String fid) {
		// TODO Auto-generated method stub
		return feedbackDao.selectFaqInfoByFid(fid);
	}

	@Override
	public String queryFeedbackInfo(Map<String, Object> map) {
		// TODO Auto-generated method stub
		String oprStatus = LogWriter.SUC;
		String parserStr = "";
		try {
			List<Map<String, String>> list = feedbackDao.selectFeedback(map);
			int count = feedbackDao.selectFeedbackCount(map);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("draw", map.get("draw"));
			jsonObject.put("data", list);
			jsonObject.put("recordsTotal", count);
			jsonObject.put("recordsFiltered", count);

			parserStr = JSONObject.toJSONString(jsonObject,
					SerializerFeature.WriteDateUseDateFormat,
					SerializerFeature.WriteMapNullValue);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectFeedback");
			logRecord.setDescription("查询用户反馈意见");
			logRecord.setModuleId("feedback");
			logRecord.setModuleName("意见反馈");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}

		return parserStr;
	}

	@Override
	public Map<String, String> queryDetail(String id) {
		// TODO Auto-generated method stub
		String oprStatus = LogWriter.SUC;
		Map<String, String> result = null;
		try {
			result = feedbackDao.selectDetail(id);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectDetail");
			logRecord.setDescription("查询用户反馈意见");
			logRecord.setModuleId("feedback");
			logRecord.setModuleName("意见反馈");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, id);
		}
		return result;
	}

	@SuppressWarnings("static-access")
	@Override
	public synchronized String save(Map<String, Object> map) {
		int result = 0;
		String oprStatus = LogWriter.SUC;
		int opr = 0;
		try {
			String id = (String) map.get("id");
			Map<String, String> subMap = feedbackDao.selectDetail(id);
			String statusString = subMap.get("status");
			if ("未处理".equals(statusString)) {
				result = feedbackDao.insertSub(map);
			} else {
				opr = 1;
				result = feedbackDao.updateSub(map);
			}
		} catch (Exception e) {
			oprStatus = logWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName(opr == 0 ? "insertSub" : "updateSub");
			logRecord.setDescription("处理反馈意见");
			logRecord.setModuleId("feedback");
			logRecord.setModuleName("意见反馈处理");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}

		return String.valueOf(result);
	}

	@Override
	public String queryFaqInfo(Map<String, Object> map) {
		// TODO Auto-generated method stub
		String oprStatus = LogWriter.SUC;
		JSONObject jsonObject = new JSONObject();
		try {
			List<Map<String, String>> list = feedbackDao.selectFaqInfo(map);
			int count = feedbackDao.selectFaqInfoCount(map);
			jsonObject.put("draw", map.get("draw"));
			jsonObject.put("data", list);
			jsonObject.put("recordsTotal", count);
			jsonObject.put("recordsFiltered", count);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectFaqInfo");
			logRecord.setDescription("查询已经存在的faq");
			logRecord.setModuleId("faq");
			logRecord.setModuleName("faq");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}
		return JSONObject.toJSONString(jsonObject,
				SerializerFeature.WriteDateUseDateFormat,
				SerializerFeature.WriteMapNullValue);
	}

	@Override
	public String addFaqItem(Map<String, Object> map) {
		String oprStatus = LogWriter.SUC;
		try {
			feedbackDao.insertFaqContent(map);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("插入");
			logRecord.setMethodName("insertFaqContent");
			logRecord.setDescription("插入faq");
			logRecord.setModuleId("faq");
			logRecord.setModuleName("faq");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}
		return String.valueOf(map.get("id"));

	}

	@Override
	public String updateFaqItem(Map<String, Object> map) {
		String oprStatus = LogWriter.SUC;
		int row = 0;
		try {
			row = feedbackDao.updateFaqContent(map);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("更新");
			logRecord.setMethodName("updateFaqContent");
			logRecord.setDescription("更新faq");
			logRecord.setModuleId("faq");
			logRecord.setModuleName("faq");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}
		return String.valueOf(row);

	}
	
	public String updateVersionItem(Map<String, Object> map) {
		String oprStatus = LogWriter.SUC;
		int row = 0;
		try {
			row = feedbackDao.updateVersionContent(map);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("更新");
			logRecord.setMethodName("updateVersionContent");
			logRecord.setDescription("更新VersionContent");
			logRecord.setModuleId("VERSIONHISTORY");
			logRecord.setModuleName("版本记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}
		return String.valueOf(row);

	}
	
	public String addVersionItem(Map<String, Object> map) {
		String oprStatus = LogWriter.SUC;
		try {
			feedbackDao.insertVersionContent(map);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("插入");
			logRecord.setMethodName("insertVersionContent");
			logRecord.setDescription("插入版本记录");
			logRecord.setModuleId("VERSIONHISTORY");
			logRecord.setModuleName("版本记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, map);
		}
		return String.valueOf(map.get("id"));

	}
	
	@Override
	public Map<String, String> queryFaqById(String id) {
		// TODO Auto-generated method stub
		String oprStatus = LogWriter.SUC;
		Map<String, String> result = null;
		try {
			result = feedbackDao.selectFaqById(id);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectFaqById");
			logRecord.setDescription("根据id查询FAQ");
			logRecord.setModuleId("FAQ");
			logRecord.setModuleName("FAQ");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, id);
		}
		return result;
	}
	
	public Map<String, String> queryVersionById(String id) {
		// TODO Auto-generated method stub
		String oprStatus = LogWriter.SUC;
		Map<String, String> result = null;
		try {
			result = feedbackDao.selectVersionById(id);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(FeedbackDao.class);
			logRecord.setLogType("查询");
			logRecord.setMethodName("selectVersionById");
			logRecord.setDescription("根据id查询Version");
			logRecord.setModuleId("versionhistory");
			logRecord.setModuleName("版本记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, id);
		}
		return result;
	}

	@Override
	public List<Map<String, String>> selectFaqType() {
		// TODO Auto-generated method stub
		return feedbackDao.selectFaqType();
	}

}
