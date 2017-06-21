<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<jsp:include page="../main/header.jsp"></jsp:include>
<jsp:include page="../main/left.jsp"></jsp:include>

<link href="static/util/iCheck/all.css" rel="stylesheet" type="text/css" />
<link href="static/dataupdate/css/addUpdateRecord.css" rel="stylesheet" type="text/css" />
<link href="static/util/tprompt/css/tprompt.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basepath%>static/util/layer/layer.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/laydate/laydate.js"></script>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="static/dataupdate/js/addUpdateRecord.js"></script>
<script type="text/javascript" src="static/util/tprompt/js/tprompt.js"></script>

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<div class="mainbox">
			<div class="box box-info" id="box_1" style="min-width:769px;">
				<div class="box-header with-border">
					<div class="pull-left">
						数据更新公告
					</div>
				</div>
				<div class="box-body">
					
					<c:forEach var="typeItems" items="${initInfo}">
					<table class="content-items">
						<tr>
							<td colspan="4" class="main-title">
								<input name="dataType" type="checkbox" checked value="${typeItems.value}" 
								id="dataType-${typeItems.id}" class="flat-grey-datatype" /> 
								<label class="item" for="dataType-${typeItems.id}">
									${typeItems.name}
								</label>
							</td>
						</tr>
						<c:if test="${typeItems.isMultipleCity == 1}">
						<tr class="alone">
							<td><span>数据更新至:</span></td>
							<td><input readonly id="lastTime-${typeItems.id}" data-format="${typeItems.updateCycle}"
							onclick="laydate({format:'YYYY年MM月DD日'})" 
							class="laydate-icon <c:if test="${typeItems.isMultipleCity != 1}">isNotMultiple</c:if>"> 
									<span class="apply-date">设置</span>
							</td>
							
						</tr>
						</c:if>
						<tr class="alone">
							<td>
									<span>城市:</span>
							</td>
							<td colspan="3" class="border-bottom-dotted">
								<ul class="checkbox-ul clearfix">
									<!-- <li class="m all" data-value=""><i></i>全部</li> -->
									<c:forEach var="items" items="${typeItems.annoList}">
									  <c:if test="${!empty items.cityId}">
										<li class="m selected" data-typeid="${typeItems.id}" 
										data-value="${items.cityId}" data-name="${items.cityName}">
										  <span><i></i>${items.cityName} </span>
										  <span class="silver">数据更新至</span>
										  <span>
											  <input onclick="laydate({format:'YYYY年MM月DD日'})" readonly
											  value="${items.dataUpdateTime}"
											  class="laydate-icon">
										  </span>
										</li>
									  </c:if>
									</c:forEach>
									
			                    </ul>
			                    <div class="addCity" data-value="${typeItems.id}" data-format="${typeItems.updateCycle}">
			                    	<span class="grf-plus">+</span><span>添加城市</span>
			                    </div>
							</td>
						</tr>
					</table>
					</c:forEach>
				</div>
				<div class="btn-area">
				<button type="submit" class="commit-btn">提交</button>
				</div>
			</div>

		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>