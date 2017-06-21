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

<link type="text/css" rel="stylesheet" href="static/feedback/css/feedback.css" />
<link type="text/css" rel="stylesheet" href="static/util/iCheck/all.css"/>
<script type="text/javascript" src="static/util/js/common.js"></script>
<script type="text/javascript" src="<%=basepath %>static/util/js/moment.js"></script>
<script type="text/javascript" src="static/main/js/astrict.js"></script>
<script type="text/javascript" src="static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>

<style>
input[aria-controls]{
		border:1px solid #ccc;
		outline:0;
}
</style>
<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="box box-primary" id="box_astrict">
			<div class="box-body">
				<table id="astrict" class="stripe row-border order-column">
				</table>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>