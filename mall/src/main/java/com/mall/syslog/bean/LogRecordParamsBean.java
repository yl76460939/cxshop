package com.mall.syslog.bean;

/**
 * 需要具体调用日志类的service 传递的bean 不包括sql的入参
 * @author 33185
 *
 */
public class LogRecordParamsBean {
	
	private Class<?> clazz;
	
	private boolean notHaveSql;
	
	private String methodName;
	
	private String description;
	
	private String logType;
	
	private String moduleId;
	
	private String moduleName;
	
	private String operateStatus;

	public String getOperateStatus() {
		return operateStatus;
	}

	public void setOperateStatus(String operateStatus) {
		this.operateStatus = operateStatus;
	}

	public Class<?> getClazz() {
		return clazz;
	}

	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
	}

	public boolean isNotHaveSql() {
		return notHaveSql;
	}

	public void setNotHaveSql(boolean notHaveSql) {
		this.notHaveSql = notHaveSql;
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	
	

}
