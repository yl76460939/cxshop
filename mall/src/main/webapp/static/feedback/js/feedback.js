var downLoadModuleId = 'LAND_FEEDBACK_INFO';
var datatables;
var mainIndex;

$(function(){
	initbreadcrumb([ {text : '帮助与反馈'}, {text : '反馈处理'} ]);
	renderLeftMenu('feedback', 'feedback_info');

	laydate.skin('molv');
	laydate({elem: '#time1',festival: true});
	laydate({elem: '#time2',festival: true});
	// Flat grey color scheme for iCheck
	$('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey')
			.iCheck({
				checkboxClass : 'icheckbox_flat-green',
				radioClass : 'iradio_flat-green'
	});

	var columns = [{title:"序号",data:"ROWNUM"},
	               {title:"反馈内容",data:"feedback"},
	               {title:"反馈类型",data:"type"},
	               {title:"联系方式",data:"theme"},
	               {title:"反馈时间",data:"feedbackTime"},
	               {title:"跟进状态",data:"status"}
	               /*{title:"跟进人",data:"handler"},
	               {title:"最后跟进时间",data:"lastTime"},
	               {title:"跟进备注",data:"remark"}*/
	               ];
	var id = "feedbacktable";
	var url = "/feedbackCtrl/queryFeedback";
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
				data.time1 = $("#time1").val();
				data.time2 = $("#time2").val();
				var status = "";
				var array = [];
				$('.ul-inline input[name="status"]:checked').each(function(){
					array.push($(this).val());
				})
				if(array.length == 1){
					status = array[0];
				}
				data.status = status;
			},
   			error: globalLoginOut
		},
		columns : columns,
		ordering: false,
		//跟数组下标一样，第一列从0开始，这里表格初始化时，默认降序
		/*order: default_order,*/
		columnDefs : [ {
			// 需要固定宽度 超出隐藏的列
  			render : function(data, type, row) {
   				return "<div class='ellipsis-col' title='"+data+"'>"+data+"</div>";
   			},targets : ellipsis},
   			{
   				// 地块名称 2 点击展示详细页面
   	  			render : function(data, type, row) {
   	   				return "<div class='ellipsis-col' title='"+data
   	   				+"'><a class='transition detail-item' href='javascript:;' data-id='"+row.id+"'>"+data+"</a></div>";
   	   			},targets : [1]},
   			// 初始化不需要排序的列
   			{orderable:false,targets: orderable}
   			]
	});
	return api;
}