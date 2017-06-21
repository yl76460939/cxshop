<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!-- 顶部开始 -->
<jsp:include page="../main/header.jsp"></jsp:include>
<!-- 顶部 结束-->

<!-- 左边 开始 -->
<jsp:include page="../main/left.jsp"></jsp:include>
<!-- 左边结束 -->


<!-- 右边 开始 -->
<div class="content-wrapper">
	<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
	<section class="content">
		<div class="row">
		
          <div class="error-page">
            <h2 class="headline text-red">500</h2>
            <div class="error-content">
              <h3><i class="fa fa-warning text-red"></i> 哎呦! 出错了。</h3>
              <p>
                <%=request.getParameter("errorMsg") %> <a href="../../index.html">返回首页</a>
              </p>
             <!--  <form class="search-form">
                <div class="input-group">
                  <input type="text" name="search" class="form-control" placeholder="Search">
                  <div class="input-group-btn">
                    <button type="submit" name="submit" class="btn btn-danger btn-flat"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </form> /.input-group -->
            </div>
          </div>

		</div>
	</section>
</div>

<!-- 底部 结束 -->
<jsp:include page="../main/footer.jsp"></jsp:include>
<!-- 底部结束 -->
