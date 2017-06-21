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

<link href="static/util/iCheck/all.css" rel="stylesheet" type="text/css" />
<link href="static/faq/css/dataUpdateRecord.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="static/authority/js/dataUpdateRecord.js"></script>

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<div class="mainbox">
			<div class="box box-info" id="box_1" style="min-width:769px;">
				<div class="box-header with-border">
					<div class="pull-left">
						数据更新公告
					</div>
				</div>
				<div class="box-body">
					
				</div>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>