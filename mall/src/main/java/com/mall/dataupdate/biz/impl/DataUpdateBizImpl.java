package com.mall.dataupdate.biz.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mall.dataupdate.bean.DataUpdateType;
import com.mall.dataupdate.biz.DataUpdateBiz;
import com.mall.dataupdate.dao.DataUpdateDao;
import com.mall.syslog.bean.LogRecordParamsBean;
import com.mall.syslog.service.impl.LogWriter;

/**
 * <p>Description: </p>
 * @author wliu 33185
 * @date 2016年9月18日 下午4:01:28
 */
@Service("biz")
public class DataUpdateBizImpl implements DataUpdateBiz {
	
	@Resource
	private DataUpdateDao dao;
	
	@Resource
	LogWriter logWriter;

	@Override
	public List<Map<String, String>> initDataTypeInfo() {
		// TODO Auto-generated method stub
		return dao.selectUpdateType();
	}

	@Override
	public List<Map<String, String>> initActiveCityInfo() {
		// TODO Auto-generated method stub
		return dao.selectActiveCity();
	}

	@Override
	public Integer updateRecord(List<Map<String, String>> params) {
		String oprStatus = LogWriter.SUC;
		int result = 0;
		try {
			result = dao.updateDataAnno(params);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(DataUpdateDao.class);
			logRecord.setLogType("更新");
			logRecord.setMethodName("updateDataAnno");
			logRecord.setDescription("更新数据公告");
			logRecord.setModuleId("DATAUPDATE_INFO");
			logRecord.setModuleName("数据公告更新记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, params);
		}
		return result;
	}

	@Override
	public List<Map<String, String>> queryCityInfoByDataType(String typeId) {
		return dao.selectCityInfoByDataType(typeId);
	}

	@Override
	public List<DataUpdateType> queryInitInfo() {
		// TODO Auto-generated method stub
		return dao.selectInitInfo();
	}

	@Override
	public List<Map<String, String>> queryActiveCityByDataType(String typeId) {
		// TODO Auto-generated method stub
		return dao.selectCityInfoByDataType(typeId);
	}

	@Override
	public Integer addUpdateRecord(List<Map<String, String>> params) {
		String oprStatus = LogWriter.SUC;
		int result = 0;
		try {
			result = dao.insertDataUpdateAnno(params);
		} catch (Exception e) {
			oprStatus = LogWriter.ERR;
			e.printStackTrace();
		} finally {
			// -- 记录日志 --
			LogRecordParamsBean logRecord = new LogRecordParamsBean();
			logRecord.setClazz(DataUpdateDao.class);
			logRecord.setLogType("新增");
			logRecord.setMethodName("insertDataUpdateAnno");
			logRecord.setDescription("新增数据公告");
			logRecord.setModuleId("DATAUPDATE_INFO");
			logRecord.setModuleName("数据公告更新记录");
			logRecord.setOperateStatus(oprStatus);
			logWriter.log(logRecord, params);
		}
		return result;
	}

}
