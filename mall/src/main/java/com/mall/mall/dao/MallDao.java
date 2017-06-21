package com.mall.mall.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.mall.bean.MainMenu;
import com.mall.sso.bean.User;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午11:29:43
 */
@Repository("mallDao")
public interface MallDao {
	
	public Integer addSubMenu(@Param("prs")Map<String, Object> map);
	
	public Integer subRepeat(@Param("parentId")int parentId,
			@Param("menuName")String menuName);
	
	public Integer addMainMenu(@Param("prs")Map<String, Object> map);
	
	/**
	 * <p>Description: 主菜单是否重复</p>
	 * @author wliu 33185
	 * @date 2017年6月18日下午2:42:16
	 */
	public Integer mainRepeat(@Param("userId")int userId,
			@Param("menuName")String menuName);

	public User queryUserInfo(int id);
	
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
	public List<Map<String, String>> 
		queryGoodsByTypeAndShop(@Param("shopId")int shopId, 
				@Param("menuId")int menuId);
}
