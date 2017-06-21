package com.mall.fileupload.biz.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.fileupload.bean.FileModel;
import com.mall.fileupload.dao.FileUploadDao;

@Service
public class FileUploadBizImpl {
	
	@Resource
	FileUploadDao fileUploadDao;
	
	public long insertFileInfo(FileModel fModel){
		return fileUploadDao.insertFileInfo(fModel);
	}
	
	public Map<String, String> selectFileInfo(String id){
		return fileUploadDao.selectFileInfo(id);
	}
}
