$(function() {
	initbreadcrumb([ {text : '数据更新管理'}, {text : '数据更新公告'} ]);
	renderLeftMenu('dataUpdate', 'info');
	
	$('input[type="radio"].flat-grey')
	.iCheck({
		radioClass : 'iradio_minimal-blue'
	});
	
	// 添加更新记录
	$("#addUpdateRecord").click(function(){
		var index = layer.open({
		      type: 2,
		      title: '添加数据更新记录:',
		      shadeClose: false,
		      id: 'layer',
		      shade: [0.3, '#393D49'],
		      maxmin: true, //开启最大化最小化按钮
		      area: ['893px','550px'],
		      content: project_fullpath+'/views/dataupdate/addUpdateRecord.jsp',
		      end:function(){
		    	  // 关闭刷新列表
		    	  datatables.ajax.reload();
		      }
		});
	});
})