<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'test.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<style >
    *{
        padding: 0;
        margin: 0;
    }
    .wrapper{
        width: 320px;
        height: 50px;
        margin: 20px auto;
        position: relative;
        border: 1px solid #f0f0f0;
    }
    input{
        width: 100px;
        height: 30px;
    }
    button{
        position: absolute;
        cursor: pointer;
        pointer-events: none;
        width: 100px;
        height: 30px;
        left: 0;
        top: 0;
    }
    a{
        pointer-events: none;
    }
    .img{
        border: 1px solid #ccc;
        padding: 10px;
    }
</style >
   <script type="text/javascript">
       $(document).ready(function(){
		     document.getElementById( 'img').addEventListener( 'change', function () {
			     var reader = new FileReader();
			     reader.onload = function (e) {
			          //调用图片压缩方法：compress();
			     };
			     reader.readAsDataURL(this.files[0]);
			     console.log(this.files[0]);
			     var fileSize = Math.round( this.files[0].size/1024/1024) ; //以M为单位
			     //this.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：this.files[0].size;
			}, false);
	   });
	  
	  
	  
	  </script>
  </head>
  
  <body>
    <div class = "wrapper">
     <input type = "file" accept= "image/*" capture= "camera" id= "img" />
     <button >上传照片 </button >
</div >
  </body>
</html>
