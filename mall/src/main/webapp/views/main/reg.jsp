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
<link type="text/css" rel="stylesheet" href="static/main/css/ns-default.css" />
<link type="text/css" rel="stylesheet" href="static/main/css/ns-style-other.css" />
<link type="text/css" rel="stylesheet" href="static/main/css/reg.css" />
<script type="text/javascript" src="static/util/js/common.js"></script>
<script type="text/javascript" src="static/main/js/reg.js"></script>
<script type="text/javascript" src="static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/main/js/modernizr.custom.js"></script>
<script type="text/javascript" src="static/main/js/classie.js"></script>
<script type="text/javascript" src="static/main/js/notificationFx.js"></script>

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<section class="invoice">
			<div class="row">
				<div class="col-md-12">
					<h2 class="page-header">
						<i class="fa fa-user"></i> 添加用户
						<span>
						<i class="fa fa-bullhorn" style="color:#f39c12"></i> 
                			请保证格式,手机号码和工号的正确性,谨慎操作
						</span>
					</h2>
				</div>
			</div>
			<div class="row invoice-info">
				<div class="col-md-12">
					<textarea placeholder="格式: 从excel中按顺序copy工号 手机号码2行数据(多个用户的话直接copy多行)" class="inputTxtArea" rows="5%" cols="100%"></textarea>
					<button class="org checkbutton"> 检查</button>
					
					<button class="floating-btn"><i class="icon-arrow"></i></button>
				</div>
				
				<div class="col-md-12 prompt-title transition">
					<i></i><span></span>
				</div>
				
				<div class="col-md-12 show-item-area">
				</div>
			</div>
		</section>

	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>