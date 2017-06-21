package com.mall.dataupdate.bean;

import java.util.List;

public class DataUpdateType {
	
	private String id;
	private String name;
	private String value;
	private String orderBy;
	private String createTime;
	private String rowState;
	private String updateCycle;
	private String isMultipleCity;
	private List<DataUpdateAnno> annoList;
	
	public List<DataUpdateAnno> getAnnoList() {
		return annoList;
	}
	public void setAnnoList(List<DataUpdateAnno> annoList) {
		this.annoList = annoList;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getRowState() {
		return rowState;
	}
	public void setRowState(String rowState) {
		this.rowState = rowState;
	}
	public String getUpdateCycle() {
		return updateCycle;
	}
	public void setUpdateCycle(String updateCycle) {
		this.updateCycle = updateCycle;
	}
	public String getIsMultipleCity() {
		return isMultipleCity;
	}
	public void setIsMultipleCity(String isMultipleCity) {
		this.isMultipleCity = isMultipleCity;
	}

}
