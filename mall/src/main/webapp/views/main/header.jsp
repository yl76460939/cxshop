<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>同策数据（权限管理）</title>
<meta content="" name="description">
<meta content="" name="author">
<link href="<%=basePath%>static/util/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/bootstrap.min.js"></script>
<!-- mcflies bigin -->
<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/lte/css/font-awesome.css">
<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/lte/css/ionicons.css">
<link href="<%=basePath%>static/util/mcfiles/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>static/util/mcfiles/plugins/uniform/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>static/util/mcfiles/global/css/components.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>static/util/mcfiles/layout/css/layout.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>static/util/mcfiles/layout/theme/darkblue.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>static/util/mcfiles/layout/css/custom.css" rel="stylesheet" type="text/css" />
<!-- mcflies end -->
<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/lte/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
<!-- END THEME STYLES -->
<!-- 控件相关的js和css begin -->
<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/dataTables/css/jquery.dataTables.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>static/util/dataTables/js/jquery.dataTables.js"></script>
<%-- swal start --%>
<script type="text/javascript" src="<%=basePath%>static/util/sweetalert/js/sweet-alert.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/layer/layer.js"></script>

<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/sweetalert/css/sweet-alert.css" rel="stylesheet" type="text/css" />
<%-- swal end --%>

</head>
<style type="text/css">
.page-content-wrapper>.page-content {
	padding-top: 0;
}

.page-content-wrapper>.page-content>.content-header {
	padding: 0;
	padding-top: 15px;
}

.fa-bar-chart {
	font-size: 20px !important;
}
</style>
<script type="text/javascript">
	var project_fullpath = "<%=path%>";
</script>
<body class="page-header-fixed page-quick-sidebar-over-content" style="min-width:1105px">
	<div class="page-header navbar navbar-fixed-top">
		<div class="page-header-inner">
			<div class="page-logo">
				<img src="<%=basePath%>static/main/images/logo.png" alt="logo" class="logo-default">
				<div class="menu-toggler sidebar-toggler hide"></div>
			</div>
			<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
			<div class="top-menu">
				<ul class="nav navbar-nav pull-right">

					<li class="dropdown dropdown-user"><a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"><span class="username username-hide-on-mobile" id="header_username">${userInfo.userName}</span> <i class="fa fa-angle-down"></i> </a>
						<ul class="dropdown-menu dropdown-menu-default">
							<li><a href="loginCtrl/logout" id="btn_logout"> <i class="icon-key"></i> 登 出
							</a></li>
						</ul></li>
				</ul>

			</div>
		</div>
	</div>
