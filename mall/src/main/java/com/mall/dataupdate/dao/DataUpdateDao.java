package com.mall.dataupdate.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.dataupdate.bean.DataUpdateType;

@Repository("dao")
public interface DataUpdateDao {

	public List<Map<String, String>> selectUpdateType();
	
	public List<Map<String, String>> selectActiveCity();
	
	public List<DataUpdateType> selectInitInfo();
	
	public Integer updateDataAnno(@Param("params") List<Map<String, String>> params);
	
	public Integer insertDataUpdateAnno(@Param("paramList") List<Map<String, String>> params);
	
	public List<Map<String, String>> selectCityInfoByDataType(@Param("typeId") String typeId);
	
}
