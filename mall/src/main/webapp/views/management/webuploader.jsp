<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basepath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basepath%>">
    
    <title>My JSP 'webuploader.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css"  href="<%=basepath%>static/util/bootstrap/css/bootstrap.min.css" />
	<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/bootstrap.min.js"></script>
	<link href="<%=basepath%>static/util/mcfiles/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link  rel="stylesheet" type="text/css"  type="text/javascript" href="<%=basepath%>static/webuploader/demo.css" />
	<link  rel="stylesheet" type="text/css"  type="text/javascript" href="<%=basepath%>static/webuploader/webuploader.css" />
    <script type="text/javascript">
    var BASE_URL="<%=basepath%>";
    </script>
  </head>
  
  <body>
		<div id="uploader" class="wu-example">
		    <div class="queueList">
		        <div id="dndArea" class="placeholder">
		            <div id="filePicker" class="webuploader-container"><div class="webuploader-pick">点击选择图片</div><div id="rt_rt_1bivn6po915guqt6h921ff51kbc1" style="position: absolute; top: 0px; left: 448px; width: 168px; height: 44px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" multiple="multiple" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"></label></div></div>
		            <p>或将照片拖到这里，单次最多可选300张</p>
		        </div>
		    <ul class="filelist"></ul></div>
		    <div class="statusBar" style="display:none;">
		        <div class="progress" style="display: none;">
		            <span class="text">0%</span>
		            <span class="percentage" style="width: 0%;"></span>
		        </div><div class="info">共0张（0B），已上传0张</div>
		        <div class="btns">
		            <div id="filePicker2" class="webuploader-container"><div class="webuploader-pick">继续添加</div><div id="rt_rt_1bivn6podhlc10cch91v501av56" style="position: absolute; top: 0px; left: 0px; width: 1px; height: 1px; overflow: hidden;"><input type="file" name="file" class="webuploader-element-invisible" multiple="multiple" accept="image/*"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"></label></div></div><div class="uploadBtn state-pedding">开始上传</div>
		        </div>
		    </div>
		</div>
  </body>
  <script type="text/javascript" src="<%=basepath%>static/webuploader/webuploader.nolog.js"></script>
  <script type="text/javascript" src="<%=basepath%>static/webuploader/demo.js"></script>
 
</html>
