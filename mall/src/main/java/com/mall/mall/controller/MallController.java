package com.mall.mall.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.mall.mall.bean.MainMenu;
import com.mall.mall.bean.ResultModel;
import com.mall.mall.biz.impl.MallBizImpl;
import com.mall.sso.bean.User;

/**
 * <p>
 * Description: 商城首页
 * </p>
 * 
 * @author wliu 33185
 * @date 2017年6月17日下午5:06:53
 */
@Controller
@RequestMapping("malls")
public class MallController {

	@Resource
	MallBizImpl mallBiz;

	/**
	 * <p>
	 * Description: storeName 店铺名称
	 * </p>
	 * 
	 * @author wliu 33185
	 * @date 2017年6月17日下午5:06:58
	 */
	@RequestMapping("/{storeName}")
	public ModelAndView roleSettingDetails(String storeName, HttpSession session) {
		ModelAndView modelAndView = new ModelAndView();
		
		// 模拟登录 
		User user = mallBiz.queryUserInfo(1);
		session.setAttribute("user", user);
		int userId = user.getUserId();
		int shopId = user.getShopId();
		
		// 加载分类
		List<MainMenu> menulist = mallBiz.queryMenuByUserId(userId);
		// List<SubMenu> menu = menulist.get(0).getSubMenuList();
		// int menuId = menu.get(0).getSubMenuId();
		// 加载默认分类下的商品
		List<Map<String, String>> goodslist = mallBiz.
				queryGoodsByTypeAndShop(shopId,5);

		modelAndView.addObject("menulist", menulist);
		modelAndView.addObject("goodslist", goodslist);
		modelAndView.setViewName("mall/index");
		return modelAndView;
	}
	
	/**
	 * <p>Description: 当前店铺id下的菜单名称是否重复</p>
	 * @author wliu 33185
	 * @date 2017年6月18日下午2:02:11
	 */
	@RequestMapping("mainMenu")
	@ResponseBody
	public String addMainMenu(String mainMenuName,HttpSession session){
		ResultModel model = new ResultModel();
		User user = (User) session.getAttribute("user");
		int userId = user.getUserId();
		int shopId = user.getShopId();
		int i = mallBiz.mainRepeat(userId, mainMenuName);
		// 0 重复 1新增成功 2 新增失败
		if(i != 0){ // 重复
			model.setStatus(true);
			model.setResult(String.valueOf(0));
			return model.toString();
		}else{
			// 新增
			int row = mallBiz.addMainMenu(userId, shopId, mainMenuName);
			model.setStatus(true);
			model.setResult(row == 0 ? String.valueOf(2) : String.valueOf(row));
			String result = model.toString();
			return result;
		
		}
		
	}
	
	/**
	 * <p>Description: 当前店铺id下的菜单名称是否重复</p>
	 * @author wliu 33185
	 * @date 2017年6月18日下午2:02:11
	 */
	@RequestMapping("subMenu")
	@ResponseBody
	public String addSubMenu(String subMenuName,int parentId,HttpSession session){
		ResultModel model = new ResultModel();
		User user = (User) session.getAttribute("user");
		int userId = user.getUserId();
		int shopId = user.getShopId();
		int i = mallBiz.subRepeat(parentId, subMenuName);
		// 0 重复 1新增成功 2 新增失败
		if(i != 0){ // 重复
			model.setStatus(true);
			model.setResult(String.valueOf(0));
			return model.toString();
		}else{
			// 新增
			int row = mallBiz.addSubMenu(userId, shopId, parentId, subMenuName);
			model.setStatus(true);
			model.setResult(row == 0 ? String.valueOf(2) : String.valueOf(row));
			String result = model.toString();
			return result;
		
		}
		
	}
	
}
