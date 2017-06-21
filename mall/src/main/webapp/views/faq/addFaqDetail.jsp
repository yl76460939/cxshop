<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	List<Map<String, String>> color = new ArrayList<Map<String, String>>();
	Map<String, String> map = new HashMap<String, String>();
	map.put("key", "1");
	map.put("value", "panel-default");
	color.add(map);
	map = new HashMap<String, String>();
	map.put("key", "2");
	map.put("value", "panel-success");
	color.add(map);
	map = new HashMap<String, String>();
	map.put("key", "3");
	map.put("value", "panel-warning");
	color.add(map);
	map = new HashMap<String, String>();
	map.put("key", "4");
	map.put("value", "panel-danger");
	color.add(map);
	request.setAttribute("color", color);
%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="<%=basepath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/layer/layer.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/laydate/laydate.js"></script>
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/util/iCheck/all.css"/>
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/util/mcfiles/global/css/components.css"/>

<script type="text/javascript" src="<%=basepath%>static/util/iCheck/icheck.js"></script>

<script type="text/javascript" charset="utf-8" src="<%=basepath%>static/util/baiduue/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=basepath%>static/util/baiduue/ueditor.all.js"> </script>
<script type="text/javascript" charset="utf-8" src="<%=basepath%>static/util/baiduue/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript">
	var project_fullpath = "<%=path%>";
	var project_fullbasepath = "<%=basepath%>";
	var flagId = "";
	$(function(){
		$('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey')
		.iCheck({
			checkboxClass : 'icheckbox_minimal-blue',
			radioClass : 'iradio_minimal-blue'
		});
	    var um = UE.getEditor('uedit');
		$(".theme-color li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		})
		
		$(".commit-btn").click(function(){
			var _this = $(this);
			var title = $("#title").val()
			if(!title){
				layer.msg('请填写FAQ标题(问题)!', {offset: 0,shift: 6});
				return;
			}
			var contents = um.getContent();
			console.log("content:\n"+contents);
			var ct = $(contents);
			ct.find("img").each(function(){
				var _src = this.src;
				var index = _src.indexOf("fileUploadController/");
				var newsrc = _src.substring(index);
				console.log(newsrc);
				this.src = newsrc;
				$(this).attr("onerror","imgLoadErr(this)");
			});
			var content = ct.prop("outerHTML");
			var colorClass = $(".theme-color li.active").attr("data-value");
			var isOpen = $('input[name="isOpen"]:checked').val();
			var fid = $('input[name="ftype"]:checked').val();
			var isPublish = $('input[name="isPublish"]:checked').val();
			
			var params = {
					id: flagId,
					content: content,
					title: title,
					colorClass: colorClass,
					isOpen: isOpen,
					fid: fid,
					isPublish: isPublish
			};
			console.log("params",params);
			var url = project_fullpath +"/feedbackCtrl/addFaqInfo";
			if(flagId){
				url = project_fullpath +"/feedbackCtrl/updateFaqInfo";
			}
			$.post(url,params,function(result){
				if(result){
					var msgIndex = layer.msg("保存成功!",{icon: 0,shift: 4,offset: '100px'});
					// 下次提交改为保存
					flagId = result;
				}else{
					var msgIndex = layer.msg("保存失败!",{icon: 0,shift: 4,offset: '100px'});
				}
			},"json");
		})
		
		
	})
	
	function imgLoadErr(_){
		var newImg =  _.src.replace("feedbackCtrl/",'');
		_.src = newImg;
		_.onerror = null;
	}
</script>
<style type="text/css">
.background {
	background-color: #f0f0f0;
}

#detailInfo td {
	padding: 5px;
	line-height: 24px;
	white-space: normal;
	font-family: 'Microsoft yahei', 微软雅黑, Arial;
	font-size: 14px;
}

#detailInfo td:nth-child(1),#detailInfo td:nth-child(3) {
	width: 15%;
	color: #999;
	vertical-align: top;
	text-align: right;
}

#detailInfo td:nth-child(2),#detailInfo td:nth-child(4) {
	width: 35%
}

#detailInfo .alone td:first-child {
	width: 20%;
	color: #999;
	vertical-align: top;
	text-align: right;
}

#detailInfo .alone td:last-child {
	width: 80%
}

#hander {
	width: 185px;
}

#detailInfo {
	width: 95%;
}

.theme-color{
	margin:0;
	padding:0;
}
.theme-color li.active {
    height: 22px;
    margin-top: 0;
}
.theme-color li{
	list-style: none;
    position: relative;
    float: left;
    width: 16px;
    height: 18px;
    margin: 2px 2px 0 0;
    cursor: pointer;
}

.panel-default{
	background-color: #f9f9f9;
	border:1px solid #e0e0e0;
}

.panel-success{
	background-color: #dff0d8;
	border: 1px solid #d6e9c6;
}

.panel-warning{
	background-color: #fcf8e3;
	border: 1px solid #faebcc;
}

.panel-danger{
	background-color: #f2dede;
	border: 1px solid #ebccd1;
}

#title{
	border:0;
	border-bottom:1px solid #ccc;
	width:40%;
	outline:0;
	font-family: 'Microsoft yahei', 微软雅黑, Arial;
	font-size: 14px;
}

.transition {
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -ms-transition: all .2s ease-out;
    -o-transition: all .2s ease-out;
    transition: all .2s ease-out;
}

.commit-btn{
	font-size:16px;
    width: 150px;
    margin-bottom: 5px;
    padding: 5px 10px;
    background-color: #1CAAEC;
    border: 2px solid #1CAAEC;
    border-radius: 2px !important;
    color:#fff;
    cursor: pointer;
}
.edui-dialog-image ,.edui-image-upload1,.edui-image-icon{
	cursor: pointer;
}
</style>
</head>
<body style="background-color:#fff;">
	<div style="padding-top:10px;margin:0">
		<table id="detailInfo">
			<tr class="alone">
				<td><span>FAQ标题(问题):</span></td>
				<td colspan="3"><input type="text" id="title" ></td>
			</tr>
			<tr class="alone">
				<td><span>主题颜色:</span></td>
				<td colspan="3"><ul class="theme-color no-padding">
					<c:forEach var="info" items="${color}" varStatus="var">
						<c:if test="${var.index == 0 }">
							<li class="${info.value} transition active"
							data-value="${info.key}"></li>
						</c:if>
						<c:if test="${var.index != 0 }">
							<li class="${info.value} transition"
							data-value="${info.key}"></li>
						</c:if>
							
					</c:forEach>
					</ul>
				<span id="colorClass"></span>
				</td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>是否默认展开:</span></td>
				<td colspan="3">
					<ul class="ul-inline">
						<li><input name="isOpen" checked type="radio" value="0" class="flat-grey" id="isOpen-n"> <label class="simple-label" for="isOpen-n">否</label></li>
						<li><input name="isOpen" type="radio" value="1" class="flat-grey" id="isOpen-y"> <label class="simple-label" for="isOpen-y">是</label></li>
					</ul>
				</td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>是否发布:</span></td>
				<td colspan="3">
					<ul class="ul-inline">
						<li><input name="isPublish" checked type="radio" value="0" class="flat-grey" id="isPublish-n"> <label class="simple-label" for="isPublish-n">否</label></li>
						<li><input name="isPublish" type="radio" value="1" class="flat-grey" id="isPublish-y"> <label class="simple-label" for="isPublish-y">是</label></li>
					</ul>
				</td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>分类:</span></td>
				<td colspan="3">
					<ul class="ul-inline">
						<c:forEach var="info" items="${typeInfo}" varStatus="var">
						<c:if test="${var.index == 0}">
							<li><input checked name="ftype" type="radio" value="${info.id}" class="flat-grey" id="ftype-${info.id}"> 
							<label class="simple-label" for="ftype-${info.id}">${info.title}</label></li>
						</c:if>
						<c:if test="${var.index != 0}">
							<li><input name="ftype" type="radio" value="${info.id}" class="flat-grey" id="ftype-${info.id}"> 
							<label class="simple-label" for="ftype-${info.id}">${info.title}</label></li>
						</c:if>
							
					</c:forEach>
					</ul>
				</td>
			</tr>
			<tr class="alone">
				<td><span>内容:</span></td>
				<td colspan="3">
					<div id="uedit" style="width:100%;height: 230px;"></div>
				</td>
			</tr>
			<tr class="alone">
				<td></td>
				<td colspan="3">
					<button type="submit" class="commit-btn">提交</button></td>
			</tr>
		</table>

	</div>
</body>
