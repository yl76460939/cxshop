<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<jsp:include page="../main/header.jsp"></jsp:include>
<jsp:include page="../main/left.jsp"></jsp:include>
<link href="<%=basePath%>static/faq/css/faqpreview.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath%>static/faq/js/faqpreview.js"></script>
<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="callout callout-info">
			<p>发布到生产前可以先看预览效果,FAQ预览为所有的FAQ包括已发布和未发布的,已发布的带有 <i class="fa">&#xf097;</i> 符号。</p>
		</div>
		<div class="row">
			<div class="col-md-3">
				<ul class="ver-inline-menu tabbable margin-bottom-10">
					<c:forEach var="info" items="${typeInfo}" varStatus="var">
						<c:if test="${info.isDefault == 1 }">
							<c:set var="currentTypeInfo" value="${info}" />
						</c:if>
						<li class="${info.isDefault == 1 ? 'active' : '' }">
						<a data-toggle="tab" href="#tab_${info.id}" 
						class="type-toggle" 
						data-value="${info.id }"
						aria-expanded="${info.isDefault == 1 ? true : false }"> 
						<i class="fa ${info.iconClass}"></i> ${info.title}
						</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="col-md-9">
				<div class="tab-content" id="tab-content">
					<div id="tab_${currentTypeInfo.id}" class="tab-pane active">
						<div id="accordion${currentTypeInfo.id}" class="panel-group">
							<c:forEach var="info" items="${listInfo}" varStatus="var">
								<c:choose> 
								  <c:when test="${info.colorClass == 2}"> 
								    <c:set var="colorClass" value="panel-success" />
								  </c:when> 
								  <c:when test="${info.colorClass == 3}"> 
								    <c:set var="colorClass" value="panel-warning" />
								  </c:when>
								  <c:when test="${info.colorClass == 4}"> 
								    <c:set var="colorClass" value="panel-danger" />
								  </c:when> 
								  <c:otherwise>   
									<c:set var="colorClass" value="panel-default" />
								  </c:otherwise> 
								</c:choose> 
								<div class="panel ${colorClass}">
									<div class="panel-heading">
										<h4 class="panel-title">
											<a class="accordion-toggle" data-toggle="collapse" 
											data-id="${info.id}" 
											data-parent="#accordion${currentTypeInfo.id}" 
											href="#accordion${currentTypeInfo.id}_${var.index}" 
											aria-expanded="${info.isOpen == 1 ? true : false}"> <span class="isNum">${var.count}</span>. ${info.title} </a>
											<i class="pull-right fa${info.isPublish == 1 ? ' fa-bookmark-o' : ''}"></i>
										</h4>
									</div>
									<div id="accordion${currentTypeInfo.id}_${var.index}" 
									class="panel-collapse collapse ${info.isOpen == 1 ? 'in' : ''}" 
									aria-expanded="${info.isOpen == 1 ? true : false}">
										<div class="panel-body">${info.content}</div>
									</div>
								</div>
							</c:forEach>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<jsp:include page="../main/footer.jsp"></jsp:include>
