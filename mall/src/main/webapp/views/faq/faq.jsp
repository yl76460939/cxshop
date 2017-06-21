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
<script type="text/javascript" src="static/faq/js/faq.js"></script>


<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="callout callout-info">
			<p>说明: 提供FAQ新增,修改.编辑页面可最大化,富文本编辑器也可以最大化.</p>
		</div>
		<div class="box box-solid" id="box_faq">
			<div class="box-header">
				<h2 class="page-header"><i class="fa fa-tag"></i>FAQ管理<span class="label label-info pull-right" id="addFaqContent">
							<i class="fa fa-plus" style="color:#fff;"></i>新增FAQ
						</span></h2>
				
			</div>
			<div class="box-body">
				<table id="faqtable" class="display">
					
				</table>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>