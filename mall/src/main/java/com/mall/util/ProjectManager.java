package com.mall.util;

public class ProjectManager {
    private int sell;// 预售证数量
    private int supply;// 供应数量
    private int volume;// 成交数量
    private int vendibility;// 可售数量
    private String projectId;
    private String projectName;// 项目名称

    public ProjectManager(int sell, int supply, int volume, int vendibility,
	    String projectId, String projectName) {
	super();
	this.sell = sell;
	this.supply = supply;
	this.volume = volume;
	this.vendibility = vendibility;
	this.projectId = projectId;
	this.projectName = projectName;
    }

    public int getVendibility() {
	return vendibility;
    }

    public void setVendibility(int vendibility) {
	this.vendibility = vendibility;
    }

    public int getSell() {
	return sell;
    }

    public void setSell(int sell) {
	this.sell = sell;
    }

    public int getSupply() {
	return supply;
    }

    public void setSupply(int supply) {
	this.supply = supply;
    }

    public int getVolume() {
	return volume;
    }

    public void setVolume(int volume) {
	this.volume = volume;
    }

    public String getProjectId() {
	return projectId;
    }

    public void setProjectId(String projectId) {
	this.projectId = projectId;
    }

    public String getProjectName() {
	return projectName;
    }

    public void setProjectName(String projectName) {
	this.projectName = projectName;
    }

}
