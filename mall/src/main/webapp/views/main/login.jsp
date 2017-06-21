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
<title>同策数据（权限管理）</title>
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, width=device-width" />
<script src="http://static.geetest.com/static/tools/gt.js"></script>
<link type="text/css" href="<%=basePath%>static/util/bootstrap/css/bootstrap.min.css" rel="stylesheet">

<link type="text/css" rel="stylesheet" href="<%=basePath%>static/util/lte/css/font-awesome.css">
<link type="text/css" rel="stylesheet" href="<%=basePath%>static/util/lte/css/ionicons.css">
<link type="text/css" rel="stylesheet" href="<%=basePath%>static/util/lte/css/AdminLTE.min.css">
<link type="text/css" rel="stylesheet" href="<%=basePath%>static/util/lte/css/skins/skin-blue.min.css">
<link type="text/css" rel="stylesheet" href="<%=basePath%>static/main/css/login.css" />
<link type="text/css" rel="stylesheet" href="<%=basePath%>static/util/iCheck/all.css" />
<link type="text/css" rel="stylesheet" rel="stylesheet" type="text/css" href="<%=basePath%>static/util/sweetalert/css/sweet-alert.css" />
<script type="text/javascript" src="<%=basePath%>static/util/sweetalert/js/sweet-alert.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="<%=basePath%>static/main/js/login.js"></script>
<script type="text/javascript" src="<%=basePath%>static/main/js/password-checker.js"></script>
<script type="text/javascript" src="<%=basePath%>static/util/layer/layer.js"></script>
</head>
<script type="text/javascript">
	var project_fullpath = "<%=path%>";
</script>
<body class="hold-transition layout-top-nav" style="background-color: #ecf0f5;">

				<div id="particles-js">
					<section class="content main nav-tabs-custom shadowtip">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#login" data-toggle="tab" aria-expanded="true">登录</a></li>
						</ul>
						<div class="tab-content no-padding ">

							<%-- 登录 --%>
							<div id="login" class="register tab-pane active">
								<div class=""></div>
								<div class="form-group">
									<input class="rl-input regphone" autocomplete="off" value="${loginAccount}" type="text" name="loginAccount" id="loginAccount" placeholder="帐号">
								</div>

								<div class="form-group">
									<input class="rl-input" id="loginPsd" autocomplete="off" name="loginPsd" type="password" placeholder="密码">
								</div>

								<div class="form-group">
									<button type="button" id="loginBtn" class="btn-login js-register-submit">登录</button>
								</div>

								<div class="form-group">
									<div class="col-md-12 no-padding">
										<input name="rememberPsd" type="checkbox" class="flat-grey" id="rememberPsd"> <label class="rembpsd-label" for="rememberPsd"><span class="remb-psd">记住密码</span></label>
										<span class="split"></span> <span class="remb-psd">dataln.com 后台管理 </span>
									</div>
								</div>
							</div>
						</div>
					</section>

				</div>
	<script type="text/javascript" src="<%=basePath%>static/util/particles/particles.js"></script>
	<script type="text/javascript" src="<%=basePath%>static/util/particles/app.js"></script>
</body>