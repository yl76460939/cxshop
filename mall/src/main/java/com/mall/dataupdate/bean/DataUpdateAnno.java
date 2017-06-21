package com.mall.dataupdate.bean;

/**
 * <p>Description: 数据更新公告bean</p>
 * @author wliu 33185
 * @date 2016年9月19日 下午2:06:34
 */
public class DataUpdateAnno {
	
	private String id;
	private String dataTypeId;
	private String cityId;
	private String cityName;
	private String isMultipleCity;
	private String createTime;
	private String createUserId;
	private String lastUpdateTime;
	private String lastUpdateUserId;
	private String isPublish;
	private String dataUpdateTime;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDataTypeId() {
		return dataTypeId;
	}
	public void setDataTypeId(String dataTypeId) {
		this.dataTypeId = dataTypeId;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getIsMultipleCity() {
		return isMultipleCity;
	}
	public void setIsMultipleCity(String isMultipleCity) {
		this.isMultipleCity = isMultipleCity;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getLastUpdateTime() {
		return lastUpdateTime;
	}
	public void setLastUpdateTime(String lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	public String getLastUpdateUserId() {
		return lastUpdateUserId;
	}
	public void setLastUpdateUserId(String lastUpdateUserId) {
		this.lastUpdateUserId = lastUpdateUserId;
	}
	public String getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(String isPublish) {
		this.isPublish = isPublish;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getDataUpdateTime() {
		return dataUpdateTime;
	}
	public void setDataUpdateTime(String dataUpdateTime) {
		this.dataUpdateTime = dataUpdateTime;
	}
	
}
