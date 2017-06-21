<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript">
	function renderLeftMenu(module, subid) {
		$('#module_' + module).addClass("active open").find("span:last")
				.addClass("open").after("<span class='selected'></span>");
		$('#li_' + subid).addClass("active");
	}
</script>

<div class="page-container">
	<div class="page-sidebar-wrapper">
		<div class="page-sidebar navbar-collapse collapse">
			<ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<li class="sidebar-toggler-wrapper">
					<div class="sidebar-toggler"></div>
				</li>
				
				<li id="module_monitor" class="open"><a href="<%=basePath%>views/main/monitor.jsp"> <i class="icon-home"></i> <span class="title">访问监控</span>
				</a></li>

				<li id="module_auth" class=""><a href="javascript:;"> <i class="icon-bar-chart"></i> <span class="title">权限管理</span> <span class="arrow"></span>
				</a>
					<ul class="sub-menu">
						<li id="li_role_settings"><a href="<%=basePath%>authController/roleInit"> 城市授权</a></li>
						<li id="li_user_role"><a href="<%=basePath%>authController/userRole"> 角色关系</a></li>
						<li id="li_user_astrict"><a href="<%=basePath%>views/main/astrict.jsp"> 受限解封</a></li>
						<li id="li_user_reg"><a href="<%=basePath%>views/main/reg.jsp"> 用户注册</a></li>
						<li id="li_user_operation"><a href="<%=basePath%>authController/keyInit"> KEY注册</a></li>
					</ul>
				</li>
				<%-- 帮助与反馈 --%>
				<li id="module_feedback" class=""><a href="javascript:;"> 
				<i class="icon-bar-chart"></i> <span class="title">帮助与反馈</span> <span class="arrow"></span>
				</a>
					<ul class="sub-menu">
						<li id="li_feedback_info"><a href="<%=basePath%>views/feedback/feedback.jsp">反馈处理</a></li>
						<li id="li_feedback_faq"><a href="<%=basePath%>views/faq/faq.jsp">FAQ管理</a></li>
						<li id="li_feedback_faqpreview"><a href="<%=basePath%>feedbackCtrl/initFAQInfo">FAQ预览</a></li>
						<li id="li_feedback_faqpreview"><a href="<%=basePath%>views/versionhistory/versionlist.jsp">版本记录</a></li>
					</ul>
				</li>
				<%-- 数据更新记录 --%>
				<li id="module_dataUpdate" class=""><a href="javascript:;"> 
				<i class="icon-bar-chart"></i> <span class="title">数据更新管理</span> <span class="arrow"></span>
				</a>
					<ul class="sub-menu">
					    <li id="li_dataUpdate_info"><a href="<%=basePath%>dataUpdate/init">更新公告管理</a></li>
					</ul>
				</li>


			</ul>
		</div>
	</div>
</div>
<!-- END SIDEBAR -->
