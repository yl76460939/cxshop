package com.mall.sso.bean;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日下午2:13:45
 */
public class Shop {
	
	private int shopId;
	private String shopKey;
	private String shopName;
	private String mainAreas;
	private String logo;
	private String photos;
	
	public int getShopId() {
		return shopId;
	}
	public void setShopId(int shopId) {
		this.shopId = shopId;
	}
	public String getShopKey() {
		return shopKey;
	}
	public void setShopKey(String shopKey) {
		this.shopKey = shopKey;
	}
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	public String getMainAreas() {
		return mainAreas;
	}
	public void setMainAreas(String mainAreas) {
		this.mainAreas = mainAreas;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public String getPhotos() {
		return photos;
	}
	public void setPhotos(String photos) {
		this.photos = photos;
	}
	
}
