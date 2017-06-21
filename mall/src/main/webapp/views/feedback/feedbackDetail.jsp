<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String id = request.getParameter("id");
%>
<!DOCTYPE html>
<html>
<head>
<link href="<%=basepath%>static/util/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/bootstrap.min.js"></script>
<!-- mcflies bigin -->
<link href="<%=basepath%>static/util/mcfiles/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/plugins/uniform/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/global/css/components.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/css/layout.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/theme/darkblue.css" rel="stylesheet" type="text/css" />
<link href="<%=basepath%>static/util/mcfiles/layout/css/custom.css" rel="stylesheet" type="text/css" />
<!-- mcflies end -->
<link rel="stylesheet" type="text/css" href="<%=basepath%>static/util/lte/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
<%-- swal start --%>
<script type="text/javascript" src="<%=basepath%>static/util/layer/layer.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/laydate/laydate.js"></script>
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/feedback/css/feedback.css" />
<script type="text/javascript">
	var project_fullpath = "<%=path%>";
	var id = '<%=id%>';
	$(function() {
		laydate.skin('molv');
		laydate({
			elem : '#lastTime',
			festival : true
		});
		
		$("#detailInfo").on("click", ".img", function(){
			var clone = $(this).clone();
			$('body').append(clone);
			// 宽高限制一下
			var _h = clone.height() > $(window).height() ? $(window).height()-30 : clone.height();
			var _w = clone.width() > $(window).width() ? $(window).width()-10 : clone.width();
			// 显示原图
			layer.open({
				  type: 1,
				  title: false,
				  closeBtn: 1,
				  area: [_w+'px', _h+'px'],
				  skin: 'layui-layer-nobg',
				  shadeClose: true,
				  content: clone
			});
		});
		
		$(".commit-btn").click(function(){
			// 提交
			var hander = $("#hander").val();
			var lastTime = $("#lastTime").val();
			var remark = $("#remark").val();
			var url = project_fullpath +"/feedbackCtrl/save";
			var params = {hander: hander, lastTime: lastTime, remark: remark, id: id};
			$.post(url,params,function(rtz){
				if(rtz == 1){
					layer.msg('操作成功!', {icon: 0,offset: ['102px']});
				}else{
					layer.msg('操作失败,请重试', {icon: 5,offset: ['102px']});
				}
			},"json")
		})
	})
</script>
<style type="text/css">
.background {
	background-color: #f0f0f0;
}

td {
	padding: 5px;
	line-height: 24px;
	white-space: normal;
	word-wrap:break-word;
	word-break:break-all;
	font-family: 'Microsoft yahei', 微软雅黑, Arial;
	font-size: 14px;
}

td:nth-child(1), td:nth-child(3) {
	width: 15%;
	color: #999;
	vertical-align: top;
	text-align: right;
}

td:nth-child(2), td:nth-child(4) {
	width: 35%
}

.alone td:first-child {
	width: 20%;
	color: #999;
	vertical-align: top;
	text-align: right;
}

.alone td:last-child {
	width: 80%
}

#hander {
	width: 185px;
}
#detailInfo{
	width:90%;
}

.imgsArea{
	list-style:none;
	padding:0;
	margin:0;
}

.imgsArea li{
	float:left;
	position: relative;
}

.imgsArea li>img{
	border: 1px solid #ddd;
	width: 80px;
	height: 80px;
	margin-right: 20px;
	margin-bottom: 2px;
}
</style>
</head>
<body style="background-color:#fff;">
	<div style="padding:20px;margin:0">
		<table id="detailInfo">
			<tr class="alone">
				<td><span>反馈内容:</span></td>
				<td colspan="3"><span id="feedback">${detailInfo.feedback}</span></td>
			</tr>
			<tr>
				<td><span>联系方式:</span></td>
				<td><span id="theme">${detailInfo.theme}</span></td>
				<td><span>手机:</span></td>
				<td><span id="phone">${detailInfo.phone}<c:if test="${empty detailInfo.phone}">非登录用户</c:if></span></td>
			</tr>
			<tr>
				<td><span>类型:</span></td>
				<td><span id="status">${detailInfo.type}</span></td>
				<td><span>反馈时间:</span></td>
				<td><span id="feedbackTime">${detailInfo.createTime}</span></td>
			</tr>
			<tr class="alone">
				<td><span>自定义参数:</span></td>
				<td colspan="3">${detailInfo.customstring}</td>
			</tr>
			<tr class="alone">
				<td><span>图片:</span></td>
				<c:if test="${!empty detailInfo.imgIds }">
					<c:set value="${ fn:split(detailInfo.imgIds, ',') }" var="imgs" />
				</c:if>
				<td colspan="3">
				 <ul class="imgsArea clearfix">
					<c:forEach var="item" items="${imgs}">
					  <li><img class="img" src="../fileUploadController/file?id=${item }" /></li>
					</c:forEach>
				 </ul>
				</td>
			</tr>
			<tr class="alone">
				<td><span>跟进状态:</span></td>
				<td colspan="3">${detailInfo.status}</td>
			</tr>
			<tr class="alone">
				<td><span>跟进人:</span></td>
				<td colspan="3"><input class="form-control input-sm" id="hander" value="${detailInfo.handler}"></td>
			</tr>
			<tr class="alone">
				<td><span>最后跟进时间:</span></td>
				<td colspan="3"><input id="lastTime" class="laydate-icon" value="${detailInfo.lastTime}"></td>
			</tr>
			<tr class="alone">
				<td><span>跟进描述:</span></td>
				<td colspan="3"><textarea id="remark" class="form-control" style="resize: none;" rows="5" cols="80%">${detailInfo.remark}</textarea></td>
			</tr>
			<tr class="alone">
				<td></td>
				<td colspan="3"><input type="hidden" id="feedbackId" value="${detailInfo.subId}">
					<button type="submit" class="commit-btn">提交</button></td>
			</tr>
		</table>

	</div>
</body>