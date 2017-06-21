<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer" id="page-footer">
	<div class="page-footer-inner">
		
		<p>
			<!-- <a>使用条款</a> | -->
			<span>Copyright &copy; Tospur Ltd. 保留所有权利。</span><span>沪ICP备15037556号-1&nbsp;</span>
		</p>
	</div>
	<div class="scroll-to-top" style="display: block;">
		<i class="icon-arrow-up"></i>
	</div>
</div>

<script src="<%=basePath%>static/util/mcfiles/global/js/metronic.js?version=20160217044452"></script>
<script src="<%=basePath%>static/util/mcfiles/global/js/layout.js?version=20160217044452"></script>

<script>
	jQuery(document).ready(function() {
		Metronic.init(); // init metronic core componets
		Layout.init(); // init layout
	});
</script>
<!-- END FOOTER -->
</body>
</html>
