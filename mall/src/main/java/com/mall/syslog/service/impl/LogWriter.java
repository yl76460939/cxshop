package com.mall.syslog.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.mall.sso.bean.UserInfo;
import com.mall.syslog.BaseDao;
import com.mall.syslog.SqlHelper;
import com.mall.syslog.bean.LogRecordParamsBean;
import com.mall.syslog.bean.OperationLogBean;
import com.mall.syslog.dao.LogWriterDao;
import com.mall.util.IpAddressUtil;

/**
 * 记录数据库操作日志
 * 
 * @author 33185 2016年1月15日10:28
 *
 */
@Service("logWriter")
public class LogWriter {
	
	private static Logger log = Logger.getLogger(LogWriter.class);
	
	@Resource
	private BaseDao sysLogBaseDao;
	
	@Resource
	private LogWriterDao logWriterDao;
	private final static String FULL_DATE = "yyyy-MM-dd HH:mm:ss";
	
	public final static String SUC = "SUCCESS";
	public final static String ERR = "ERROR";

	/**
	 * @param logRecord
	 * @param args
	 * @return
	 */
	public int log(LogRecordParamsBean logRecord, Object... args) {

		OperationLogBean logBean = new OperationLogBean();
		
		// execution of SQL
		if (!logRecord.isNotHaveSql()) {
			
			SqlSession sqlSession = sysLogBaseDao.getSqlSession();
			String classFullPath = logRecord.getClazz().getName() + "."
					+ logRecord.getMethodName();
			
			// 通过Mapper方法名获取sql
			String sql = SqlHelper
					.getMapperSql(sqlSession, classFullPath, args);
			
			log.debug("===============================");
			log.debug(sql);
			log.debug("===============================");
			
			// 发现mapper中的sql 有多余的空格空行 wliu 
			Pattern p = Pattern.compile("\\s+");
			Matcher m = p.matcher(sql);
			sql= m.replaceAll(" ");
			
			logBean.setSql(sql);
		}

		// userInfo
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		HttpSession session = request.getSession();
		UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");

		// ip
		String ipAddress = IpAddressUtil.getIpAddr(request);

		// createTime
		String createTime = new SimpleDateFormat(FULL_DATE).format(new Date());

		// insert database
		
		// 无登录 临时使用
		String userid, userName;
		if (userInfo == null) {
			userid = "33888";
			userName = "chenweidong";
		} else {
			userid = userInfo.getUserId();
			userName = userInfo.getUserName();
		}

		logBean.setUserId(userid);
		logBean.setUserName(userName);
		logBean.setIpAddress(ipAddress);
		logBean.setCreateTime(createTime);
		logBean.setDescription(logRecord.getDescription());
		logBean.setLogType(logRecord.getLogType());
		logBean.setModuleId(logRecord.getModuleId());
		logBean.setModuleName(logRecord.getModuleName());
		logBean.setOperateStatus(logRecord.getOperateStatus());

		// WORK_NO, CREATE_TIME, LOG_TYPE, DESCRIPTION, SQL,
		// IP_ADDRESS, MODULE_ID, MODULE_NAME, USER_NAME ,OPERATE_STATUS
		// int modifyRow = 1;
		int modifyRow = logWriterDao.insertDbOperLog(logBean);

		return modifyRow;
	}

}
