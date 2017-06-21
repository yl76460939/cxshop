package com.mall.fileupload.bean;

/**
 * <p>
 * Description:
 * </p>
 * 
 * @author wliu 33185
 * @date 2016年7月7日 下午4:39:50
 */
public class FileModel {
	private long id;
	// 重命名之后的图片名称
	private String name;
	// 上传时的图片名称
	private String originalName;
	// 物理路径
	private String url;
	// 图片类型 .jpg
	private String type;
	// 图片大小
	private long size;
	// 上传时间
	private double uploadTime;
	// flag
	private int flag;
	// cost
	private double cost;
	// allowFiles
	private String allowFiles;
	// allowSize
	private String allowSize;

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getName() {
		return name;
	}

	public double getCost() {
		return cost;
	}

	public void setCost(double cost) {
		this.cost = cost;
	}

	public String getAllowFiles() {
		return allowFiles;
	}

	public void setAllowFiles(String allowFiles) {
		this.allowFiles = allowFiles;
	}

	public String getAllowSize() {
		return allowSize;
	}

	public void setAllowSize(String allowSize) {
		this.allowSize = allowSize;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOriginalName() {
		return originalName;
	}

	public void setOriginalName(String originalName) {
		this.originalName = originalName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public double getUploadTime() {
		return uploadTime;
	}

	public void setUploadTime(double uploadTime) {
		this.uploadTime = uploadTime;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
