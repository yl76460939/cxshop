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
<link type="text/css" rel="stylesheet" href="static/authority/css/operationKey.css" />
<link type="text/css" rel="stylesheet" href="static/util/iCheck/all.css" />

<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="static/util/js/common.js"></script>
<script type="text/javascript" src="static/authority/js/operationKey.js"></script>
<script type="text/javascript" src="static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/main/js/modernizr.custom.js"></script>
<script type="text/javascript" src="static/main/js/classie.js"></script>
<script type="text/javascript" src="static/main/js/notificationFx.js"></script>

<script>
	var allKey = '${allKey}';
</script>

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<section class="invoice">
			<div class="row">
				<div class="col-md-12">
					<h2 class="page-header active" data-section="key-register">
						<i class="fa fa-key"></i> KEY注册 
					</h2>
					<h2 class="page-header" data-section="role-register">
						<i class="fa fa-user"></i> 角色注册 
					</h2>
				</div>
			</div>
			<div class="row invoice-info">
				<div class="col-md-12" id="key-register">
					<div class="col-md-4">
						<div class="col-md-12 input-item">
							<label>KEY:</label><span class="keyspan">
							<input readonly type="text" id="key" />
								<button class="org flushbutton">刷新</button> </span>
						</div>
						<div class="col-md-12 input-item">
							<label>名称:</label><input type="text" id="name" />
						</div>
	
						<div class="col-md-12 input-item">
							<label>区分城市:</label>
							<ul class="ul-inline clearfix">
								<li><input name="divisive" type="radio" value="1" class="flat-grey" id="divisive-y"> <label class="simple-label" for="divisive-y">是</label></li>
								<li><input name="divisive" checked type="radio" value="0" class="flat-grey" id="divisive-n"> <label class="simple-label" for="divisive-n">否</label></li>
							</ul>
						</div>
	
						<div class="col-md-12 input-item">
							<label>备注:</label><input type="text" id="remark" />
						</div>
	
						<div class="col-md-12 input-item" style="margin-top:20px;">
							<div class="col-md-1" style="width:60px;"></div>
							<div class="col-md-2 no-padding">
								<button type="button" style="width:200px;margin-left:5px" id="generate" class="btn btn-block btn-primary">生成</button>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<div class="col-md-12 prompt-title transition" style="opacity: 1;">
							<i></i><span><span class="count"> 已注册KEY明细 </span></span>
						</div>
						<div class="col-md-12">
							<div class="col-md-12 show-item-area">
								<table class="transition">
									<tbody>
										<tr>
											<th>KEY</th>
											<th>名称</th>
											<th>区分城市</th>
											<th>备注</th>
										</tr>
										<c:forEach var="item" varStatus="status" items="${allKey}">
											<tr>
												<td>${item.code }</td>
												<td>${item.name }</td>
												<td>${item.divisive }</td>
												<td>${item.remark }</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12" id="role-register">
					<div class="col-md-4">
						<div class="col-md-12 input-item">
							<label>角色名称:</label><input id="roleName" type="text" id="name" />
						</div>
	
						<div class="col-md-12 input-item">
							<label>备注:</label><input type="text" id="roleRemark" />
						</div>
	
						<div class="col-md-12 input-item" style="margin-top:20px;">
							<div class="col-md-1" style="width:60px;"></div>
							<div class="col-md-2 no-padding">
								<button type="button" style="width:200px;margin-left:5px" id="generate-role" class="btn btn-block btn-primary">添加角色</button>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<div class="col-md-12 prompt-title transition" style="opacity: 1;">
							<i></i><span><span class="count"> 角色明细 </span></span>
						</div>
						<div class="col-md-12">
							<div class="col-md-12 show-item-area">
								<table class="transition">
									<tbody>
										<tr>
											<th>角色名称</th>
											<th>备注</th>
										</tr>
										<c:forEach var="item" varStatus="status" items="${allRole}">
											<tr>
												<td>${item.roleName }</td>
												<td>${item.remark }</td>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>