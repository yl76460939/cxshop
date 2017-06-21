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

<link type="text/css" rel="stylesheet" href="static/authority/css/userRole.css"/>
<link type="text/css" rel="stylesheet" href="static/authority/css/accordion.css"/>
<link type="text/css" rel="stylesheet" href="static/util/iCheck/all.css"/>
<link type="text/css" rel="stylesheet" href="static/authority/css/select-lw.css"/>
<link rel="stylesheet" type="text/css" href="static/util/tprompt/css/tprompt.css"/>

<script type="text/javascript" src="static/util/tprompt/js/tprompt.js"></script>
<script type="text/javascript" src="static/util/iCheck/icheck.js"></script>
<script type="text/javascript" src="static/authority/js/select-lw.js"></script>
<script type="text/javascript" src="static/authority/js/userRole.js"></script>
<div class="page-content-wrapper">
	<div class="page-content">

		<jsp:include page="../main/breadcrumb.jsp"></jsp:include>

		<div class="mainbox">
		
			<div class="row">
            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3>${reportData.register}</h3>
                  <p>总注册人数</p>
                </div>
                <div class="icon new-icon">
                  <i class="fa fa-group"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-green">
                <div class="inner">
                  <h3 class="activeNum">0</h3>
                  <p>当天活跃人数</p>
                </div>
                <div class="icon new-icon">
                  <i class="fa fa-user"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-yellow">
                <div class="inner">
                  <h3 class="downLoadNum">0</h3>
                  <p>总下载条数</p>
                </div>
                <div class="icon new-icon">
                  <i class="fa fa-download"></i>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-red">
                <div class="inner">
                  <h3 class="theHighest">0</h3>
                  <p>下载最高(条/天)</p>
                </div>
                <div class="icon new-icon">
                  <i class="fa fa-tags"></i>
                </div>
              </div>
            </div>
          </div>
          
			<div class="box box-info" id="boxm">
				<div class="box-body">
					<table id="allUserAndRole" class="stripe row-border order-column">
					</table>
					<script type="text/javascript">
					var columns = [
					   {data:'nickname',title:'昵称'},
					   {data:'phone_num',title:'手机号码'},
					   {data:'registTime',title:'注册时间'},
					   {data:'rolename',title:'角色名称'},
					   {data:'roleid',title:'角色Id'},
					   {data:'user_id',title:'Id'}
		          	];
					datatables = $('#allUserAndRole').DataTable({
						language : {
							processing : '处理中...',
							lengthMenu : "每页显示 _MENU_ 条记录",
							zeroRecords : "<div class='record_nothing'></div>",
							info : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
							infoEmpty : "",
							emptyTable : "<div class='record_nothing'></div>",
							search : "搜索",
							infoFiltered : "(从 _MAX_ 条数据中检索)",
							paginate : {
								first : "首页",
								previous : "上一页",
								next : "下一页",
								last : "尾页"
							}
						},
						paginate : true,
						data: JSON.parse('${userRoleInfo}'),
						pagingType : "full_numbers",
						displayLength : 10,
						processing : false,
						serverSide : false,
						searching : true,
						ordering :false,
						columns: columns,
						columnDefs : [ {
							"render" : function(data, type, row) {
								var rowify = JSON.stringify(row);
								var val = "<a href='javascript:;' data-row='"+rowify
								+"' class='nickname'>";
								var returnStr = val+"<strong>" + data + "</strong>";
								returnStr += "<i class='fa fa-edit'></i></a>";
								return returnStr;
							},
							"targets" : 0
						},{
		       		        "targets": [5],
		       		        "visible": false
		       		      } ]
					});
					</script>
				</div>

			</div>
		</div>
	</div>
</div>
<jsp:include page="../main/footer.jsp"></jsp:include>