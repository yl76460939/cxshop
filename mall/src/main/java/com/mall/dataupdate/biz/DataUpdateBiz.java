package com.mall.dataupdate.biz;

import java.util.List;
import java.util.Map;

import com.mall.dataupdate.bean.DataUpdateType;

public interface DataUpdateBiz {
	
	public Integer addUpdateRecord(List<Map<String, String>> params);

	public List<Map<String, String>> initDataTypeInfo();
	
	public List<Map<String, String>> initActiveCityInfo();
	
	public Integer updateRecord(List<Map<String, String>> params);
	
	public List<Map<String, String>> queryCityInfoByDataType(String typeId);
	
	public List<DataUpdateType> queryInitInfo();
	
	public List<Map<String, String>> queryActiveCityByDataType(String typeId);
	
}
