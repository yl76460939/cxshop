/**
 *  js 样例
 */
//每个列表对应的唯一ID 存DC_PRI_DOWNLOAD表中
var downLoadModuleId = 'LAND_TRAN_STA';

function exportToExcel(){
	var parmsObj = {};
	parmsObj.lDetailsSearchInfo = JSON.stringify(getQueryParams());
	parmsObj.exportBeanId = 'landDownLoadBiz';;
	parmsObj.moduleId = downLoadModuleId;
	parmsObj.fileName = $(".table-title").html();
	downLoadExcel(parmsObj);
}

后台继承类ExcelExportUtil
/**
 *  后台返回样例
 */
List<ExcelHeaderBean> headerList = new ArrayList<ExcelHeaderBean>();
for (int i = 0; i < headerParams.length; i++) {
	ExcelHeaderBean excelHeaderBean = new ExcelHeaderBean();
	excelHeaderBean.setShowName(headerParams[i]);
	headerList.add(excelHeaderBean);
}
downLoadInfo.setHeader(headerList);
downLoadInfo.setResultList(list);
//数据源是对象传Object，map传linkedHashMap
downLoadInfo.setResultType(Object.class);
return downLoadInfo;