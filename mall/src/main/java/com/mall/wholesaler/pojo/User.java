package com.mall.wholesaler.pojo;

import java.sql.Date;

public class User {
    private int userId; // 用户ID

    private String userName; // 用户名

    private String userMobilePhone; // 联系电话

    private String userTelephone;// 座机

    private String userPwd;// 密码

    private int userType;// 用户类型 1商家2零售商3是后台管理员

    private String userAddress;// 联系地址

    private Date lastLoginDate;// 最后登录时间

    private Date createDate;// 创建日期

    public int getUerId() {
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

    public Date getLastLoginDate() {
	return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
	this.lastLoginDate = lastLoginDate;
    }

    public Date getCreateDate() {
	return createDate;
    }

    public void setCreateDate(Date createDate) {
	this.createDate = createDate;
    }
}
