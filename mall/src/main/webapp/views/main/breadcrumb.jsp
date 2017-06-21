<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<section class="content-header">
          <ol class="breadcrumb" id="unifybreadcrumb">
           <%--  <li><a href="<%=basePath%>"><i class="fa fa-location-arrow"></i> 首页</a></li> --%>
          </ol>
</section>

<script type="text/javascript">

	function initbreadcrumb(cru){
		if(typeof cru === 'object'){
			var len = cru.length-1, _ = "";
			var arrow = "<i class='fa fa-location-arrow'></i>";
			$.each(cru,function(k,v){
				var locationArrow = _ == "" ? arrow : "";
				if(v.href){
					_ += "<li>"+locationArrow+"<a href='<%=basePath%>" + v.href+"'>"+ 
					v.text +"</a></li>";
				}else{
					_ += "<li style='color:#999;'>"+ locationArrow + v.text +"</li>";
				}
			})
			$("#unifybreadcrumb").append(_);
		}
	}
</script>