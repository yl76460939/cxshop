package com.mall.mall.bean;

import java.util.List;


/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午10:56:59
 */
public class MainMenu {
	
	private int mainMenuId;
	private String mainMenuName;
	private int mainParentId;
	private int mainIsEnable;
	
	private List<SubMenu> subMenuList;
	
	public int getMainMenuId() {
		return mainMenuId;
	}

	public void setMainMenuId(int mainMenuId) {
		this.mainMenuId = mainMenuId;
	}

	public String getMainMenuName() {
		return mainMenuName;
	}

	public void setMainMenuName(String mainMenuName) {
		this.mainMenuName = mainMenuName;
	}

	public int getMainParentId() {
		return mainParentId;
	}

	public void setMainParentId(int mainParentId) {
		this.mainParentId = mainParentId;
	}

	public int getMainIsEnable() {
		return mainIsEnable;
	}

	public void setMainIsEnable(int mainIsEnable) {
		this.mainIsEnable = mainIsEnable;
	}

	public List<SubMenu> getSubMenuList() {
		return subMenuList;
	}

	public void setSubMenuList(List<SubMenu> subMenuList) {
		this.subMenuList = subMenuList;
	}
}
