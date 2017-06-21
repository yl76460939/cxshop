package com.mall.mall.bean;

import com.alibaba.fastjson.JSONObject;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日下午1:59:06
 */
public class ResultModel {
	
	private boolean status;
	private String result;
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	
	public String string() {
		return "ResultModel [status=" + status + ", result=" + result + "]";
	}
	
	public String toString() {
		return JSONObject.toJSONString(this);
	}
	
	
}
