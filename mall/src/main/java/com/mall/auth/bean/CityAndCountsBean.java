package com.mall.auth.bean;

/**
 * 
 * @author 33185
 * 2016-3-16 15:39:04
 */
public class CityAndCountsBean {
	
	private String cityId;
	private String cityName;
	private String cityPy;
	private String downloadCounts;
	private String dueTime;
	
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getDownloadCounts() {
		return downloadCounts;
	}
	public void setDownloadCounts(String downloadCounts) {
		this.downloadCounts = downloadCounts;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getCityPy() {
		return cityPy;
	}
	public void setCityPy(String cityPy) {
		this.cityPy = cityPy;
	}
	public String getDueTime() {
		return dueTime;
	}
	public void setDueTime(String dueTime) {
		this.dueTime = dueTime;
	}
	
	
}
