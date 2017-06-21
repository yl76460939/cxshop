package com.mall.fileupload.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.fileupload.bean.FileModel;

@Repository
public interface FileUploadDao {
	
	public Long insertFileInfo(@Param("fModel") FileModel fModel);
	
	public Map<String, String> selectFileInfo(@Param("id") String id);
}
