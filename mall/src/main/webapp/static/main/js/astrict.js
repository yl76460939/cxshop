var downLoadModuleId = 'LAND_FEEDBACK_INFO';
var datatables;
var mainIndex;

$(function(){
	initbreadcrumb([ {text : '权限管理'},{text : '受限解封'}]);
	renderLeftMenu('auth', 'user_astrict');

	var columns = [
				   {title:"ID",data:"USER_ID"},
	               {title:"昵称",data:"NICKNAME"},
	               {title:"手机号码",data:"PHONE_NUM"},
	               {title:"被封时间",data:"ASTRICT_TIME"},
	               {
	            	   	title: '操作',
						class : 'details-control',
						orderable : false,
						data : null,
						defaultContent : ''
					}
	               ];
	var id = "astrict";
	var url = "/authController/astrictUsers";
	datatables = initDatatables(id, url, columns,[],[] );
	
	$(".search-btn").click(function(){
		datatables.ajax.reload();
	})
	
	$('#astrict tbody').on('click', '.astrict', function() {
		var _this = $(this); 
		swal({   
			title: "确认解封?",   
			type: "warning",
			showCancelButton: true,   
			confirmButtonColor: "#1caf9a",   
			confirmButtonText: "确认",
			closeOnConfirm: false
			}, 
			function(){
				var tr = _this.closest('tr');
				var row = datatables.row(tr);
				var userId = row.data().USER_ID;
				var nickName = row.data().NICKNAME;
				$.ajax({
					url: project_fullpath+"/authController/astrict",
					data: { userId: userId, nickName: nickName},
					dataType: 'json',
					success: function(rtz){
						var title = "解封成功";
						var type = "success";
						if(rtz != 1){
							title = "解封失败,请重试!";
							type = "warning";
						}
						
						swal({   
							title: title,   
							type: type,
							confirmButtonColor: "#1caf9a",   
							confirmButtonText: "确认",
							}, 
							function(){ 
								$("#astrict_filter input").val('');
								datatables.ajax.reload();
							}
						);
					}
				})
		});
		
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
    	serverSide : false,
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
		dom : '<"top"i>rt<"bottom"flp><"clear">',
        searching : true,
        paginate : true,
		pagingType : "full_numbers",
		displayLength : 10,
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
   			{orderable:false,targets: orderable},
   			{
   	  			render : function(data, type, row) {
   	  				var id = row.USER_ID;
   	  				var nickname = row.NICKNAME;
   	   				return "<a href='javascript:;' class='astrict'>解封</a>";
   	   			},targets : [4]}
   			]
	});
	return api;
}