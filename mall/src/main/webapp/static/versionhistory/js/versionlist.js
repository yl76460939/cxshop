var downLoadModuleId = 'LAND_FEEDBACK_VERSIONHISTORY';
var datatables;

$(function(){
	initbreadcrumb([ {text : '帮助与反馈'}, {text : '版本记录'} ]);
	renderLeftMenu('feedback', 'feedback_versionhistory');
	
	var columns = [
	               {title:"标题",data:"title"},
	               {title:"首页提示内容",data:"briefContents"},
	               {title:"更新时间",data:"time",class:"text-center"},
	               {title:"版本号",data:"versionNum",class:"text-center"},
	               {title:"发布状态",data:"isPublish",class:"text-center"},
	               {title:"首页提示",data:"triggered",class:"text-center"}
	               ];
	var id = "versionlisttable";
	var url = "/feedbackCtrl/qeruyVersionHistory";
	datatables = initDatatables(id, url, columns,[],[] );
	
	$("#versionlisttable").on("click",".detail-item",function(){
		var dataId = $(this).attr('data-id');
		var index = layer.open({
		      type: 2,
		      title: '修改版本记录:',
		      shadeClose: false,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['800px','70%'],
		      content: project_fullpath+'/feedbackCtrl/queryVersionById?id='+dataId,
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
		
	})
	
	$("#addVersionContent").click(function(){
		var index = layer.open({
		      type: 2,
		      title: '添加版本记录:',
		      shadeClose: false,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['800px','70%'],
		      content: project_fullpath+'/views/versionhistory/addVersionInfo.jsp',
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
	})
});

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
   			{// 标题
   	  			render : function(data, type, row) {
   	   				return "<div class='ellipsis-col' title='"+data
   	   				+"'><a class='transition detail-item' href='javascript:;' data-id='"+row.id+"'>"+data+"</a></div>";
   	   			},targets : [1]},
   	   		{// 发布
   	 	  			render : function(data, type, row) {
   	 	  					var rt = "<span>未发布</span>";
   	 	  					if(data == 1){
   	 	  						rt = "<span class='text-red'>已发布</span>";
   	 	  					}
   	 	   				return rt;
   	 	   			},targets : [4]},
   	 	   	{// 发布
   	   	 	  		render : function(data, type, row) {
   	   	 	  					var rt = "<span>不提示</span>";
   	   	 	  					if(data == 1){
   	   	 	  						rt = "<span class='text-red'>提示</span>";
   	   	 	  					}
   	   	 	   				return rt;
   	   	 	   		},targets : [5]},
   			// 初始化不需要排序的列
   			{orderable:false,targets: orderable}
   			]
	});
	return api;
}