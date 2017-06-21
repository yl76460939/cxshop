<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<link href="<%=basepath%>static/util/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/bootstrap.min.js"></script>
<!-- mcflies bigin -->
<link href="<%=basepath%>static/util/mcfiles/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/plugins/uniform/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/global/css/components.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/css/layout.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/theme/darkblue.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/css/custom.css" rel="stylesheet" type="text/css" />
<!-- mcflies end -->
<link rel="stylesheet" type="text/css" href="<%=basepath%>static/util/lte/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
<!-- END THEME STYLES -->
<!-- 控件相关的js和css begin -->
<link rel="stylesheet" type="text/css" href="<%=basepath%>static/util/dataTables/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basepath%>static/util/dataTables/js/jquery.dataTables.js"></script>
<%-- swal start --%>
<script type="text/javascript" src="<%=basepath%>static/util/sweetalert/js/sweet-alert.min.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/layer/layer.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basepath%>static/util/sweetalert/css/sweet-alert.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/authority/css/auth.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/authority/css/accordion.css" rel="stylesheet" type="text/css" />
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/util/iCheck/all.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basepath%>static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="<%=basepath%>static/authority/js/detailsInfo.js"></script>
<script type="text/javascript">
	var details = '${detailsInfo}';
</script>
<style type="text/css">
td.details-control {
    background: url('<%=basepath%>static/authority/images/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('<%=basepath%>static/authority/images/details_close.png') no-repeat center center;
}
.detailSubContent{
	border:1px dotted #ccc;
	padding:10px;
	margin:40px 0 40px 10px;
}

input[aria-controls]{
	border:1px solid #ccc;
	outline:0;
}
</style>
</head>
<body style="background-color:#fff;">
			<div class="box box-solid" id="box_1" style="padding:20px;margin:0">
				<div class="box-body">
					<table id="detailsInfo" class="stripe row-border order-column">
						<thead>
							<tr>
								<th>角色名称</th>
								<th>角色描述</th>
								<th>菜单名称</th>
								<th></th>
							</tr>
						</thead>
					</table>
				</div>
				
			</div>
</body>