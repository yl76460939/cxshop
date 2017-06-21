package com.mall.feedback.biz;

import java.util.List;
import java.util.Map;

/**
 * 
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2016年7月5日 上午10:46:36
 */
public interface FeedbackBiz {
	
	public List<Map<String, String>> selectFaqType();
	
	public Map<String, String> queryFaqById(String id);

	public String queryFeedbackInfo(Map<String, Object> map);
	
	public String save(Map<String, Object> map);
	
	public Map<String, String> queryDetail(String id);
	
	public String queryFaqInfo(Map<String, Object> map);
	
	public String addFaqItem(Map<String, Object> map);
	
	public String updateFaqItem(Map<String, Object> map);
	
}
