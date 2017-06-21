package com.mall.auth.bean;

/**
 * 省份相关信息
 * @author 33185
 * 2016-3-15 14:24:45
 */
public class Province {
	
	private String id;
	private String prov;
	private String provId;
	private String city;
	private String cityId;
	
	public String getProvId() {
		return provId;
	}
	public void setProvId(String provId) {
		this.provId = provId;
	}
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProv() {
		return prov;
	}
	public void setProv(String prov) {
		this.prov = prov;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
}
