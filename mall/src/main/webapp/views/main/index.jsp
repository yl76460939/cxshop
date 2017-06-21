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

<!-- Echarts start-->
<script type="text/javascript" src="<%=basePath%>static/util/echarts/js/echarts-all.js?version=20160217044452"></script>
<!-- Echarts end -->
<script type="text/javascript" src="<%=basePath%>static/index/js/index.js?version=20160217044452"></script>
<!-- 选城市控件  start-->
<script type="text/javascript" src="<%=basePath%>static/util/switchCity/js/city_arr.js?version=20160217044452"></script>
<script type="text/javascript" src="<%=basePath%>static/util/switchCity/js/drag.js?version=20160217044452"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>static/util/switchCity/css/alpha.css">

<script type="text/javascript" src="<%=basePath%>static/util/switchCity/js/city_func.js?version=20160217044452"></script>
<!-- 选城市控件  end-->

<link rel="stylesheet" type="text/css" href="<%=basePath%>static/index/main.css">

<!-- 左边 开始 -->
<jsp:include page="../main/left.jsp"></jsp:include>
<!-- 左边结束 -->
<style>
.ellipsis-col {
	width: 380px !important;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

。ccc {
	width: 280px !important;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>

<!-- 右边 开始 -->

<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>
		<div class="row">
			<div class="col-md-12">
				<label style="width:80px">当前城市：</label>
				<!-- 选城市------- start -->
				<input id="btn_hukou" class="button orange" type="button" value="上海" onclick="hukouSelect('A')" /> <input id="cityNO" type="hidden" name="cityNO" value="SH" />

				<!-- alpha div -->
				<div id="maskLayer" style="display:none">
					<iframe id="maskLayer_iframe" frameBorder=0 scrolling=no style="filter:alpha(opacity=50)"></iframe>
					<div id="alphadiv" style="filter:alpha(opacity=50);-moz-opacity:0.0;opacity:0.0"></div>
					<div id="drag">
						<h3 id="drag_h"></h3>
						<div id="drag_con"></div>
						<!-- drag_con end -->
					</div>
				</div>
				<!-- maskLayer end -->
				<!-- 城市列表 -->
				<div id="sublist" style="display:none"></div>
			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-md-6">
				<!-- 城市1 -->
				<div class="box box-primary direct-chat direct-chat-warning">
					<div class="box-header with-border">
						<h3 class="box-title" id="city_volume">上海交易数据</h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<div style="height:260px;" class="cont_tblist">
							<div class="p20 clearfix" id="div_first"></div>
							<div style="height:1px; margin-bottom:0px;" class="linebox01"></div>
							<div class="p20 clearfix" id="div_second"></div>
						</div>
					</div>
					<!-- /.box-body -->
				</div>
				<!--/.direct-chat -->
			</div>
			<!-- /.col -->

			<div class="col-md-6">
				<!-- 城市2 -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title" id="city_trend">上海成交量价走势</h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body no-padding">
						<div id="div_bar" style="width:100%;height:260px;"></div>

					</div>
					<!-- /.box-body -->
				</div>
				<!--/.box -->
			</div>
			<!-- /.col -->

			<div class="col-md-6">
				<!-- 城市3 -->
				<div class="box box-primary direct-chat direct-chat-warning">
					<div class="box-header with-border">
						<h3 class="box-title" id="i_rankingList"></h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<div style="height:210px;">
							<div class="table-responsive">
								<table class="table no-margin" id="tbody_rankingList" style="border-spacing:0;border-collapse:collapse">
								</table>
							</div>

						</div>
					</div>
					<!-- /.box-body -->
				</div>
				<!--/.direct-chat -->
			</div>
			<!-- /.col -->

			<div class="col-md-6">
				<!-- 土地 -->
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title" id="city_topFive">上海最新成交住宅用地</h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body no-padding">
						<div style="height:210px;">
							<div class="table-responsive">
								<table class="table no-margin" id="TranTopFive" style="border-spacing:0;border-collapse:collapse">
								</table>
							</div>

						</div>
					</div>
					<!-- /.box-body -->
				</div>
				<!--/.box -->
			</div>
			<!-- /.col -->

			<div class="col-md-12">
				<!-- 城市5 -->
				<div class="box box-primary direct-chat direct-chat-warning">
					<div class="box-header with-border">
						<h3 class="box-title" id="box-title-landLeasing"></h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<div style="height:250px;" id="landchart"></div>
					</div>
					<!-- /.box-body -->
				</div>
				<!--/.direct-chat -->
			</div>
			<!-- /.col -->



		</div>
	</div>
</div>
<script type="text/javascript">
	$(function() {
		renderLeftMenu('index', '');
		var seCityNO = '${sessionScope.city.cityNO}';
		var seCityName = '${sessionScope.city.cityName}';
		if (seCityNO != '' && seCityName != '') {
			defualtCityNO = seCityNO;
			defualtCityName = seCityName;
			$('#btn_hukou').val('${sessionScope.city.cityName}');
			$('#cityNO').val('${sessionScope.city.cityNO}');
		}

		Defualtfunctions(defualtCityNO, defualtCityName);
	});
</script>

<!-- 底部 结束 -->
<jsp:include page="../main/footer.jsp"></jsp:include>
<!-- 底部结束 -->
