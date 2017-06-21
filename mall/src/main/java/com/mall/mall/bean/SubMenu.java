package com.mall.mall.bean;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2017年6月18日上午10:59:02
 */
public class SubMenu {

	private int subMenuId;
	private String subMenuName;
	private int subParentId;
	private int subIsEnable;
	
	public int getSubMenuId() {
		return subMenuId;
	}
	public void setSubMenuId(int subMenuId) {
		this.subMenuId = subMenuId;
	}
	public String getSubMenuName() {
		return subMenuName;
	}
	public void setSubMenuName(String subMenuName) {
		this.subMenuName = subMenuName;
	}
	public int getSubParentId() {
		return subParentId;
	}
	public void setSubParentId(int subParentId) {
		this.subParentId = subParentId;
	}
	public int getSubIsEnable() {
		return subIsEnable;
	}
	public void setSubIsEnable(int subIsEnable) {
		this.subIsEnable = subIsEnable;
	}
	
	
}
