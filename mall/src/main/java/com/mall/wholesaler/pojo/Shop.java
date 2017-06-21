package com.mall.wholesaler.pojo;

public class Shop {
    private int shopId;// 商店ID

    private String shopKey; // 商店key

    private String shopName; // 商店名称

    private int userId; // 用户ID

    private String userName; // 联系人名称

    private String userTelephone; // 联系电话号码

    private String userAddress; // 联系地址

    private String mainAreas;// 主营范围

    private String logo;// logo

    private String photos;// 营业场所照片

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

    public int getUserId() {
	return userId;
    }

    public void setUserId(int userId) {
	this.userId = userId;
    }

    public String getUserName() {
	return userName;
    }

    public void setUserName(String userName) {
	this.userName = userName;
    }

    public String getUserTelephone() {
	return userTelephone;
    }

    public void setUserTelephone(String userTelephone) {
	this.userTelephone = userTelephone;
    }

    public String getUserAddress() {
	return userAddress;
    }

    public void setUserAddress(String userAddress) {
	this.userAddress = userAddress;
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
