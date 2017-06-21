package com.mall.mall.biz.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.mall.bean.MainMenu;
import com.mall.mall.dao.MallDao;
import com.mall.sso.bean.User;
/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午11:28:39
 */
/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午11:28:39
 */
@Service("mallBiz")
public class MallBizImpl implements MallBiz {

	@Resource
	MallDao mallDao;
	
	public int addSubMenu(int userId,int shopId,int parentId,String menuName){
		Map<String, Object> prs = new HashMap<String, Object>();
		prs.put("userId", userId);
		prs.put("shopId", shopId);
		prs.put("parentId", parentId);
		prs.put("menuName", menuName);
		prs.put("menuId", 0);
		mallDao.addSubMenu(prs);
		int id = (int) prs.get("menuId");
		return id;
	}
	
	public int addMainMenu(int userId,int shopId,String menuName){
		Map<String, Object> prs = new HashMap<String, Object>();
		prs.put("userId", userId);
		prs.put("shopId", shopId);
		prs.put("menuName", menuName);
		prs.put("menuId", 0);
		mallDao.addMainMenu(prs);
		int id = (int) prs.get("menuId");
		return id;
	}
	
	public int mainRepeat(int userId,String menuName){
		int i = mallDao.mainRepeat(userId, menuName);
		return i;
	}
	
	public int subRepeat(int parentId,String menuName){
		int i = mallDao.subRepeat(parentId, menuName);
		return i;
	}
	
	public User queryUserInfo(int id){
		return mallDao.queryUserInfo(id);
	}
	
	@Override
	public List<MainMenu> queryMenuByUserId(int id) {
		// TODO Auto-generated method stub
		return mallDao.queryMenuByUserId(id);
	}

	@Override
	public List<Map<String, String>> queryGoodsByTypeAndShop(
			int shopId, int menuId) {
		// TODO Auto-generated method stub
		return mallDao.queryGoodsByTypeAndShop(shopId,menuId);
	}

}
