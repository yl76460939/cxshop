package com.mall.syslog.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.syslog.bean.OperationLogBean;

@Repository("logWriterDao")
public interface LogWriterDao {
	
	/**
	 * 插入数据库操作日志
	 * @param dblog
	 * @return
	 */
	public int insertDbOperLog(@Param("dblog")OperationLogBean dblog);
}
