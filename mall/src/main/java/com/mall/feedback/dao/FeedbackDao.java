package com.mall.feedback.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository("feedbackDao")
public interface FeedbackDao {
	
	public List<Map<String, String>> selectVersionHistory(@Param("map")Map<String, Object> map);
	
	public Integer selectVersionHistoryCount(@Param("map")Map<String, Object> map);
	
	public List<Map<String, String>> selectFaqInfoByFid(@Param("fid") String fid);
	
	public List<Map<String, String>> selectFaqType();
	
	public Map<String, String> selectFaqById(@Param("id") String id);
	
	public Map<String, String> selectVersionById(@Param("id") String id);
	
	public Integer updateFaqContent(@Param("map")Map<String, Object> map);
	
	public Integer updateVersionContent(@Param("map")Map<String, Object> map);
	
	public Integer selectFaqInfoCount(@Param("map")Map<String, Object> map);
	
	public Integer insertFaqContent(@Param("map")Map<String, Object> map);
	
	public Integer insertVersionContent(@Param("map")Map<String, Object> map);
	
	public List<Map<String, String>> selectFaqInfo(@Param("map")Map<String, Object> map);
	
	public Map<String, String> selectDetail(@Param("id") String id);
	
	public List<Map<String, String>> selectFeedback(@Param("map")Map<String, Object> map);
	
	public Integer insertSub(@Param("map")Map<String, Object> map);
	
	public Integer updateSub(@Param("map")Map<String, Object> map);
	
	public Integer selectFeedbackCount(@Param("map")Map<String, Object> map);
	
	public Integer deleteFaqInfoById(@Param("id") String id);
	
	
}
