<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- 顶部开始 -->
<jsp:include page="header.jsp"></jsp:include>
<!-- 顶部 结束-->

<!-- 左边 开始 -->
<jsp:include page="left.jsp"></jsp:include>
<!-- 左边结束 -->

<!-- 右边 开始 -->
<div class="content-wrapper">
	<section class="content">
		<section class="content-header">
			<h1>
				<small></small>
			</h1>
			<ol class="breadcrumb">
				<li><a href="javascript:void(0);"><i
						class="fa fa-dashboard"></i> </a></li>
				<li class="active"></li>
			</ol>
		</section>
	</section>
</div>
<!-- 右边 结束 -->


<!-- 底部 结束 -->
<jsp:include page="footer.jsp"></jsp:include>
<!-- 底部结束 -->
