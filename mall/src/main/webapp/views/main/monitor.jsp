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
<script type="text/javascript" src="static/main/js/monitor.js"></script>
<script type="text/javascript" src="static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>

<style type="text/css">
td.details-control {
    background: url('static/authority/images/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('static/authority/images/details_close.png') no-repeat center center;
}

td.loading{
    background: url('static/authority/images/loading-20.gif') no-repeat center center !important;
}

.sub-info{
	width: 30%;
	margin: 20px;
	text-align: center;
}

.sub-info th{
	text-align: center;
}

.sub-info td{
	border: 0 !important;
}

.control-label{
	padding-top: 4px !important;
	font-weight: bold;
}

</style>
<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="mainbox">
			<div class="box form-horizontal">
				<div class="box-body" style="margin-right:50px;padding-top:10px">

					<div class="form-group">
						<label class="col-sm-2 control-label"> 时间：</label>
						<div class="col-sm-6">
							<input id="time1" type="text" class="laydate-icon"> 
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label">用户类型：</label>
						<div class="col-sm-6">
							<ul class="ul-inline">
								<li><input checked name="status" type="radio" value="0" class="flat-grey" id="status-9">
								<label class="simple-label" for="status-9">全部</label></li>
								<li><input name="status" type="radio" value="visitor" class="flat-grey" id="status-0">
								<label class="simple-label" for="status-0">游客</label></li>
								<li><input name="status" type="radio" value="other" class="flat-grey" id="status-2">
								<label class="simple-label" for="status-2">注册用户</label></li>
							</ul>
						</div>
						<div class="col-sm-2">
							<button type="submit" class="search-btn">查询</button>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div class="box box-primary" id="box_monitor">
			<div class="box-body">
				<table id="monitor" class="stripe row-border order-column">
				</table>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>