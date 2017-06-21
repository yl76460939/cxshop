package com.mall.wholesaler.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.mall.util.imgUtil;
import com.mall.wholesaler.pojo.Shop;
import com.mall.wholesaler.pojo.User;
import com.mall.wholesaler.serivceImp.WholesalerBizImpl;

/**
 * <p>
 * Description: 用户反馈action
 * </p>
 * 
 * @author wliu
 * @date 2016年6月29日 上午9:42:00
 */
@Controller
@RequestMapping("whl")
public class wholesalerController {

    @Resource
    WholesalerBizImpl wholesalerBizImpl;

    @RequestMapping("createUserAndWhl")
    @ResponseBody
    public String createUserAndWhl(HttpSession httpSession,
	    HttpServletRequest request) {
	User user = new User();

	// 电话号码/登录名
	String userMobilePhone = request.getParameter("userMobilePhone") != null ? request
		.getParameter("userMobilePhone").toString() : "";
	String userPwd = request.getParameter("userPwd") != null ? request
		.getParameter("userPwd").toString() : "";
	String userName = request.getParameter("userName") != null ? request
		.getParameter("userName").toString() : "";
	String userTelephone = request.getParameter("userTelephone") != null ? request
		.getParameter("userTelephone").toString() : "";
	String userAddress = request.getParameter("userAddress") != null ? request
		.getParameter("userAddress").toString() : "";
	user.setUserMobilePhone(userMobilePhone);
	user.setUserPwd(userPwd);
	user.setUserName(userName);
	user.setUserTelephone(userTelephone);
	user.setUserAddress(userAddress);
	user.setUserType(1);// 批发商
	Shop shop = new Shop();
	String shopKey = request.getParameter("shopKey") != null ? request
		.getParameter("shopKey").toString() : "";
	String shopName = request.getParameter("shopName") != null ? request
		.getParameter("shopName").toString() : "";
	String shopUserName = request.getParameter("shopUserName") != null ? request
		.getParameter("shopUserName").toString() : "";
	String shopUserTelephone = request.getParameter("shopUserTelephone") != null ? request
		.getParameter("shopUserTelephone").toString() : "";
	String shopUserAddress = request.getParameter("shopUserAddress") != null ? request
		.getParameter("shopUserAddress").toString() : "";
	String mainAreas = request.getParameter("mainAreas") != null ? request
		.getParameter("mainAreas").toString() : "";
	String logo = request.getParameter("logo") != null ? request
		.getParameter("logo").toString() : "";
	String photos = request.getParameter("photos") != null ? request
		.getParameter("photos").toString() : "";
	imgUtil.generateImage(logo, "E:\\logo\\" + shopKey + "_logo.jpg");
	String[] photosArr = photos.split(",");
	String _photos = "";
	for (int i = 0; i < photosArr.length; i++) {
	    imgUtil.generateImage(photos, "E:\\shop\\" + shopKey + "_" + i
		    + ".jpg");
	    if (i == 0) {
		_photos += shopKey + "_" + i + ".jpg";
	    } else {
		_photos += "," + shopKey + "_" + i + ".jpg";
	    }
	}
	shop.setShopKey(shopKey);
	shop.setShopName(shopName);
	shop.setUserTelephone(shopUserTelephone);
	shop.setUserAddress(shopUserAddress);
	shop.setMainAreas(mainAreas);
	shop.setLogo(shopKey + "_logo.jpg");
	shop.setPhotos(_photos);

	wholesalerBizImpl.createWholesaler(user, shop);

	int result = 0;
	return JSONObject.toJSONString(result,
		SerializerFeature.WriteMapNullValue,
		SerializerFeature.WriteDateUseDateFormat);
    }

}
