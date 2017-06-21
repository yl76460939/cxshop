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
<script type="text/javascript" src="static/feedback/js/feedback.js"></script>
<script type="text/javascript" src="static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>


<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="mainbox">
			<div class="box form-horizontal">
				<div class="box-body" style="margin-right:50px;padding-top:10px">

					<div class="form-group">
						<label class="col-sm-2 control-label">反馈时间：</label>
						<div class="col-sm-6">
							<input id="time1" type="text" class="laydate-icon"> <span class="from-to">至</span> <input id="time2" type="text" class="laydate-icon">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-2 control-label">跟进状态：</label>
						<div class="col-sm-6">
							<ul class="ul-inline">
								<li><input checked name="status" type="checkbox" value="0" class="flat-grey" id="status-0">
								<label class="simple-label" for="status-0">未处理</label></li>
								<li><input checked name="status" type="checkbox" value="2" class="flat-grey" id="status-2">
								<label class="simple-label" for="status-2">处理中</label></li>
								<li><input checked name="status" type="checkbox" value="1" class="flat-grey" id="status-1">
								<label class="simple-label" for="status-1">已处理</label></li>
							</ul>
						</div>
						<div class="col-sm-2">
							<button type="submit" class="search-btn">查询</button>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		<div class="box box-primary" id="box_feedbacktable">
			<div class="box-body">
				<table id="feedbacktable" class="display">
				</table>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>