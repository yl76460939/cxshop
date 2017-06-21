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

<link type="text/css" rel="stylesheet" href="static/authority/css/auth.css"/>
<link type="text/css" rel="stylesheet" href="static/authority/css/accordion.css"/>
<link type="text/css" rel="stylesheet" href="static/util/iCheck/all.css"/>
<link type="text/css" rel="stylesheet" href="static/main/css/ns-default.css" />
<link type="text/css" rel="stylesheet" href="static/main/css/ns-style-other.css" />
<link rel="stylesheet" type="text/css" href="static/util/tprompt/css/tprompt.css"/>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="static/authority/js/authority.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/main/js/modernizr.custom.js"></script>
<script type="text/javascript" src="static/main/js/classie.js"></script>
<script type="text/javascript" src="static/main/js/notificationFx.js"></script>
<script type="text/javascript" src="static/util/tprompt/js/tprompt.js"></script>
<script type="text/javascript" src="<%=basepath %>static/util/js/moment.js"></script>
<script type="text/javascript">
	var push_dueTime = '${dueTime}';
</script>
<div id="toolbar">
	<div style="cursor: pointer;">详细</div>
</div>

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<div class="mainbox">
			<div class="box box-info" id="box_1" style="min-width:769px;">
				<div class="box-header with-border">
					<div class="pull-left">
						用户城市授权设置
						<!-- <span class="icon-warn" id="useStep"></span> -->
					</div>
					
					<div class="pull-right land-tool-bar">
						<span class="label label-info" id="detailInfo">
							查看已设置详细列表
						</span>
					</div>
				</div>
				<div class="box-body">
					<!-- 添加clearfix 解决li浮动坍陷 -->
					<ul id="role-privilege-settings" class="clearfix">
						<li>
							<div class="hat role-tree-hat">角色</div>
							<div class="toolbar">
								<span class="search-area">
									<input class="like-query" placeholder="查询角色"/>
									<i class="button-area fa fa-search"></i>
								</span>
							</div>
							<ul class="role-list-ul checkbox-ul clearfix">
								<c:forEach var="item" varStatus="status" items="${roleInfo}">
									<li class="s <c:if test="${status.index == -2}">selected</c:if>" 
									data-name="userInfoList"
									 data-value="${item.roleId }"><i></i> 
									<label class="item">
									 ${item.roleName }
									</label>
									</li>
								</c:forEach>
							</ul>
						</li>
						
						<li>
							<div class="hat city-tree-hat">城市</div>
							<div class="toolbar">
								<span class="add-city">+添加城市</span>
								<span class="copyrole-settings">应用于其他角色</span>
							</div>
							<div class="city-title hide"></div>
							<div class="accordion city-tree"></div>
						</li>
						
						<li>
							<div class="hat menu-tree-hat">功能</div>
							<div class="toolbar">
								<span class="save-settings">保存设置</span>
								<span class="copy-settings disable">应用于其他城市</span>
							</div>
							<div class="function-title hide"></div>
							<div class="dueTime-area hide">
								<label class='item-item'>到期时间:</label>
								<input readonly onclick="laydate({format:'YYYY-MM-DD'})" 
								class='laydate-icon dueTime' value='${dueTime}'/>
							</div>
							<ul class="clearfix auth-menu-ul">
							</ul>
						</li>
						
					</ul>
				</div>
				<!-- <div class="box-footer text-left">
	                    <ul class="use-notice clearfix">
	                    	<li>角色权限设置: </li>
						    <li>
						    	<ul class="clearfix">
								    <li>1. 保存设置只保存已经勾选的城市</li>
								    <li>2. 保存设置将删除当前已选系统菜单下所有之前设置的城市及下载条数数据</li>
								    <li>3. 保存操作不能撤销，谨慎操作哟</li>
						    	</ul>
						    </li>
						</ul>
				</div> -->
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>