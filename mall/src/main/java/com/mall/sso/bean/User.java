package com.mall.sso.bean;

/**
 * <p>
 * Description:
 * </p>
 * 
 * @author wliu 33185
 * @date 2017年6月18日下午2:05:33
 */
public class User {
	// 用户信息
	private int userId;
	private String userName;
	private String userMobilePhone;
	private String userTelephone;
	private String userPwd;
	private int userType;
	private String userAddress;
	// 用户下的店铺信息 先默认一个用户下一个店铺  之后有1对多再修改
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
	public String getUserMobilePhone() {
		return userMobilePhone;
	}
	public void setUserMobilePhone(String userMobilePhone) {
		this.userMobilePhone = userMobilePhone;
	}
	public String getUserTelephone() {
		return userTelephone;
	}
	public void setUserTelephone(String userTelephone) {
		this.userTelephone = userTelephone;
	}
	public String getUserPwd() {
		return userPwd;
	}
	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}
	public int getUserType() {
		return userType;
	}
	public void setUserType(int userType) {
		this.userType = userType;
	}
	public String getUserAddress() {
		return userAddress;
	}
	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
	
}
