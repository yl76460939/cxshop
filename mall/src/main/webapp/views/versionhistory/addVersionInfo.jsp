<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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
<script type="text/javascript" src="<%=basepath%>static/util/layer/layer.js"></script>
<script type="text/javascript" src="<%=basepath%>static/util/laydate/laydate.js"></script>
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/util/iCheck/all.css"/>
<script type="text/javascript" src="<%=basepath%>static/util/iCheck/icheck.js"></script>
<link type="text/css" rel="stylesheet" href="<%=basepath%>static/util/mcfiles/global/css/components.css"/>
<link rel="stylesheet" type="text/css" href="<%=basepath%>static/util/lte/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	var project_fullpath = "<%=path%>";
	var flagId = "";
	$(function(){
		$('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey')
		.iCheck({
			checkboxClass : 'icheckbox_minimal-blue',
			radioClass : 'iradio_minimal-blue'
		});
		
		laydate.skin('molv');
		laydate({elem: '#time',festival: true});
		
		$(".commit-btn").click(function(){
			var title = $("#title").val();
			var time = $("#time").val();
			var versionNum = $("#versionNum").val();
			var triggered = $('input[name="triggered"]:checked').val();
			var isPublish = $('input[name="isPublish"]:checked').val();
			var briefContents = $("#briefContents").val();
			var detailContents = $("#detailContents").val();
			
			var params = {
					id: flagId,
					title: title,
					time: time,
					versionNum: versionNum,
					triggered: triggered,
					isPublish: isPublish,
					briefContents: briefContents,
					detailContents: detailContents
			};
			var url = project_fullpath +"/feedbackCtrl/addVersionInfo";
			if(flagId){
				url = project_fullpath +"/feedbackCtrl/updateVersionInfo";
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

#detailInfo {
	width: 95%;
}

#title{
	border:0;
	border-bottom:1px solid #ccc;
	width:40%;
	outline:0;
	font-family: 'Microsoft yahei', 微软雅黑, Arial;
	font-size: 14px;
}

#versionNum{
	border:0;
	border-bottom:1px solid #ccc;
	width:20%;
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
.laydate_box, .laydate_box *,.laydate-icon {
        box-sizing:content-box;
}
.laydate-icon{
	background:url('../../static/util/laydate/skins/molv/icon.png');
	height: 24px;
    line-height: 24px;
    padding-right: 20px;
    border: 1px solid #d2d6de;
    background-repeat: no-repeat;
    background-position: right center;
    background-color: #fff;
    outline: 0;
    padding-left:10px;
    cursor:pointer;
}

#time{
	width:20% !important;
}
</style>
</head>
<body style="background-color:#fff;">
	<div style="padding-top:10px;margin:0">
		<table id="detailInfo">
			<tr class="alone">
				<td><span>标题:</span></td>
				<td colspan="3"><input type="text" class="form-contorl" id="title"></td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>版本号:</span></td>
				<td colspan="3">
					<input type="text" class="form-contorl" id="versionNum" >
				</td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>更新时间:</span></td>
				<td colspan="3">
					<input type="text" id="time" class="laydate-icon">
				</td>
			</tr>
			<tr class="alone">
				<td style="vertical-align:middle;"><span>首页提示:</span></td>
				<td colspan="3">
					<ul class="ul-inline">
						<li><input name="triggered" checked type="radio" value="0" class="flat-grey" id="triggered-n"> <label class="simple-label" for="triggered-n">否</label></li>
						<li><input name="triggered" type="radio" value="1" class="flat-grey" id="triggered-y"> <label class="simple-label" for="triggered-y">是</label></li>
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
				<td><span>首页提示内容:</span></td>
				<td colspan="3">
					<textarea id="briefContents" class="form-control" style="resize: none;" rows="3" cols="80%"></textarea>
				</td>
			</tr>
			<tr class="alone">
				<td><span>更新详细内容:</span></td>
				<td colspan="3">
					<textarea id="detailContents" class="form-control" style="resize: none;" rows="5" cols="80%"></textarea>
				</td>
			</tr>
			<tr class="alone">
				<td></td>
				<td colspan="3">
					<button type="submit" class="commit-btn">保存</button>
				</td>
			</tr>
		</table>

	</div>
</body>