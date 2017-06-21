package com.mall.util;

import java.util.List;
import java.util.Map;

public class DataTablesInput {

	private Integer draw;// 请求次数

	private Integer start;// 起始记录位置

	private Integer length;// 长度

	private Map<SearchCriterias, String> search;

	private List<Map<ColumnCriterias, String>> columns;

	private List<Map<OrderCriterias, String>> order;

	public Integer getDraw() {
		return draw;
	}

	public void setDraw(Integer draw) {
		this.draw = draw;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLength() {
		return length;
	}

	public void setLength(Integer length) {
		this.length = length;
	}

	public Map<SearchCriterias, String> getSearch() {
		return search;
	}

	public void setSearch(Map<SearchCriterias, String> search) {
		this.search = search;
	}

	public List<Map<ColumnCriterias, String>> getColumns() {
		return columns;
	}

	public void setColumns(List<Map<ColumnCriterias, String>> columns) {
		this.columns = columns;
	}

	public List<Map<OrderCriterias, String>> getOrder() {
		return order;
	}

	public void setOrder(List<Map<OrderCriterias, String>> order) {
		this.order = order;
	}

	public enum SearchCriterias {
		value, regex
	}

	public enum OrderCriterias {
		column, dir
	}

	public enum ColumnCriterias {
		data, name, searchable, orderable, searchValue, searchRegex
	}
}
