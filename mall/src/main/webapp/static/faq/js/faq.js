var downLoadModuleId = 'LAND_FEEDBACK_FAQ';
var datatables;

$(function(){
	initbreadcrumb([ {text : '帮助与反馈'}, {text : 'FAQ'} ]);
	renderLeftMenu('feedback', 'feedback_faq');
	
	var columns = [
	               {title:"图标",data:"iconClass",class:"text-center"},
	               {title:"分类",data:"title",class:"text-center"},
	               {title:"标题",data:"subtitle"},
	               {title:"边框颜色",data:"colorClass",class:"text-center"},
	               {title:"状态",data:"isPublish",class:"text-center"},
	               {title:"最后修改时间",data:"lastModifyTime",class:"text-center"},
	               {title:"排序",data:"itemOrderby",class:"text-center"},
	               {title:"点击阅读次数",data:"hits",class:"text-center"},
	               {title:"操作",data:"id",class:"text-center"}
	               ];
	var id = "faqtable";
	var url = "/feedbackCtrl/queryFaqInfo";
	datatables = initDatatables(id, url, columns,[],[] );
	
	$("#faqtable").on("click",".del",function(){
		var id = $(this).attr("data-value");
		layer.msg('确认删除？', {
			  time: 0 ,offset: ['200px'],
			  btn: ['确定', '取消'],
	    yes: function(index){
			var url = project_fullpath +"/feedbackCtrl/delFaq";
			$.post(url,{id: id},function(result){
				var msg = "删除成功!";
				if(result < 1){
					msg = "删除失败!";
				}
				layer.msg(msg,{icon: 0,shift: 4,offset: '100px'});
				datatables.ajax.reload();
			},"json");
	    }})
		
	});
	$("#faqtable").on("click",".detail-item",function(){
		var dataId = $(this).attr('data-id');
		var index = layer.open({
		      type: 2,
		      title: '详细信息:',
		      shadeClose: false,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px','650px'],
		      content: project_fullpath+'/feedbackCtrl/queryFaqById?id='+dataId,
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
		
		//layer.full(index);
	})
	
	$("#addFaqContent").click(function(){
		var dataId = $(this).attr('data-id');
		var index = layer.open({
		      type: 2,
		      title: '添加:',
		      shadeClose: false,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px','650px'],
		      content: project_fullpath+'/feedbackCtrl/initType',
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
		// layer.full(index);
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
    	stateSave: true,
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
   			{// 标题
   	  			render : function(data, type, row) {
   	   				return "<div class='ellipsis-col' title='"+data
   	   				+"'><a class='transition detail-item' href='javascript:;' data-id='"+row.id+"'>"+data+"</a></div>";
   	   			},targets : [2]},
   	   		{// 分类图标
   	  			render : function(data, type, row) {
   	   				return "<span class='custom-icon'><i class='fa "+data+"'></i></span>";
   	   			},targets : [0]},
   	   		{// 色块
   	   	  			render : function(data, type, row) {
   	   	  				var color = "";
   	   	  				switch (data){
   	   	  					case '2':color = "panel-success";break;
   	   	  					case '3':color = "panel-warning";break;
   	   	  					case '4':color = "panel-danger";break;
   	   	  					default:color = "panel-default";
   	   	  				}
   	   	   				return "<span class='colorBlock "+ color +"'></span>";
   	   	   			},targets : [3]},
   	   	   	{// 排序
   	 	  			render : function(data, type, row) {
   	 	  					var rt = "<span>未发布</span>";
   	 	  					if(data == 1){
   	 	  						rt = "<span class='text-red'>已发布</span>";
   	 	  					}
   	 	   				return rt;
   	 	   			},targets : [4]},
   	   	   	{// 排序
	  			render : function(data, type, row) {
	   				return "<span class='isNum'>"+ data +"</span>";
	   			},targets : [6]},
   			{// 操作
	  			render : function(data, type, row) {
	   				return "<a class='del' data-value='"+data+"' href='javascript:;'>删除</a>";
	   			},targets : [8]},
   			// 初始化不需要排序的列
   			{orderable:false,targets: orderable}	   			
   			]
	});
	return api;
}