<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<jsp:include page="../main/header.jsp"></jsp:include>
<jsp:include page="../main/left.jsp"></jsp:include>

<link type="text/css" rel="stylesheet" href="static/faq/css/faq.css" />
<script type="text/javascript" src="static/util/js/common.js"></script>
<script type="text/javascript" src="static/versionhistory/js/versionlist.js"></script>

<style>
.ellipsis-col {
    width: 360px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#addVersionContent{
	cursor:pointer;
}
</style>
<div class="page-content-wrapper">
	<div class="page-content">
 
		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="box box-solid" id="box_versionlisttable">
			<div class="box-header">
				<h2 class="page-header"><i class="fa fa-tag"></i>版本更新历史<span class="label label-info pull-right" id="addVersionContent">
							<i class="fa fa-plus" style="color:#fff;"></i>新增版本更新记录
						</span></h2>
				
			</div>
			<div class="box-body">
				<table id="versionlisttable" class="display" style="width:100%">
					
				</table>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>