package com.mall.mall.biz.impl;

import java.util.List;
import java.util.Map;

import com.mall.mall.bean.MainMenu;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午10:54:14
 */
public interface MallBiz {
	
	/**
	 * <p>Description: 根据用户Id 查询菜单</p>
	 * @author wliu 33185
	 * @date 2017年6月18日上午11:04:12
	 */
	public List<MainMenu> queryMenuByUserId(int id);
	
	/**
	 * <p>Description: 根据店铺ID和分类ID查询商品列表</p>
	 * @author wliu 33185
	 * @date 2017年6月18日上午11:28:59
	 */
	public List<Map<String, String>> queryGoodsByTypeAndShop(int shopId, int menuId);
}
