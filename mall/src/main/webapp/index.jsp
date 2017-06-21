<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>
<script type="text/javascript">

  location.href="<%=basePath%>index/init";
</script>
</head>
<body>
<h2>Hello World!</h2>
</body>
</html>
