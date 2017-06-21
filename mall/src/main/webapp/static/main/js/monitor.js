var downLoadModuleId = 'LAND_FEEDBACK_INFO';
var datatables;
var mainIndex;

$(function(){
	initbreadcrumb([ {text : '监控台'}]);
	renderLeftMenu('monitor', 'monitor_info');

	laydate.skin('molv');
	var prevDay = moment().subtract(1, "day").format("YYYY-MM-DD");
	laydate({elem: '#time1',isclear: false, start: prevDay,festival: true});
	$("#time1").val(prevDay);
	// Flat grey color scheme for iCheck
	$('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey')
			.iCheck({
				checkboxClass : 'icheckbox_flat-green',
				radioClass : 'iradio_flat-green'
	});

	var columns = [{
						"class" : 'details-control',
						"orderable" : false,
						"data" : null,
						"defaultContent" : ''
					},
				   {title:"id",data:"userId"},
	               {title:"昵称",data:"nickname"},
	               {title:"手机号码",data:"phoneNum"},
	               {title:"访问次数",data:"amount"},
	               {title:"下载条数",data:"down"}
	               ];
	var id = "monitor";
	var url = "/authController/queryMonitor";
	datatables = initDatatables(id, url, columns,[],[] );
	
	$(".search-btn").click(function(){
		datatables.ajax.reload();
	})
	
	$("#feedbacktable").on("click",".detail-item",function(){
		var dataId = $(this).attr('data-id');
		mainIndex = layer.open({
		      type: 2,
		      title: '详细信息:',
		      shadeClose: true,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px','600px'],
		      content: project_fullpath+'/feedbackCtrl/queryDetail?id='+dataId,
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
		//layer.full(mainIndex);
	})
	
	
	$('#monitor tbody').on('click', 'td.details-control', function() {
		var _this = $(this); 
		var tr = $(this).closest('tr');
		var row = datatables.row(tr);
		var userId = row.data().userId;
		var status = $('.ul-inline input[name="status"]:checked').val();
		if (row.child.isShown()) {
			row.child.hide();
			tr.removeClass('shown');
		} else {
			$.ajax({
				url: project_fullpath+"/authController/queryMonitorSub",
				data: {startDate: $("#time1").val(),
					endDate: $("#time1").val(),
					status: status,
					userId: userId},
				dataType: 'json',
				beforeSend:function(){
					_this.addClass("loading");
				},
				complete:function(){
					_this.removeClass("loading");
				},
				success: function(rtz){
					var html = "";
					for (var int = 0; int < rtz.length; int++) {
						var clazz = '';// = int%2 == 0 ? "odd" : "even";
						html += "<tr class='"+clazz+"'><td>"+rtz[int].MODULE_NAME+
						"</td><td>"+rtz[int].amount+"</td></tr>";
					}
					if(html){
						html = "<table class='sub-info'>" 
							+ "<tr><th>菜单模块</th><th>访问次数</th></tr>"
							+ html +"</table>";
					}
					row.child(html).show();
					tr.addClass('shown');
				}
			})
		}
	});
	
})

function initDatatables(id, url, columns, orderable, ellipsis) {
	var overlayHtm = '<div class="overlay"><i class="fa fa-spinner fa-pulse"></i></div>';
	var api = $('#' + id).on('preXhr.dt', 
	function ( e, settings, data ) {
		$("#box_"+id).append(overlayHtm);
    } ).on( 'xhr.dt', function () {
    	$("#box_"+id+" .overlay").remove();
    } ).DataTable({
    	scrollX : true,
    	autoWidth: true,
		ajax : {
			url : project_fullpath + url,
			type : "POST",
			data : function(data) {
				data.startDate = $("#time1").val();
				data.endDate = $("#time1").val();
				var status = $('.ul-inline input[name="status"]:checked').val();
				data.status = status;
			},
   			error: globalLoginOut
		},
		columns : columns,
		ordering: false,
		//跟数组下标一样，第一列从0开始，这里表格初始化时，默认降序
		/*order: default_order,*/
		columnDefs : [ 
   			// 初始化不需要排序的列
   			{orderable:false,targets: orderable}
   			]
	});
	return api;
}