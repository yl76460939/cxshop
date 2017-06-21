var _typeBtn;
var _typeFormat;
var downLoadModuleId = 'DATAUPDATE_DATAUPDATE_INFO';
$(function() {
	initbreadcrumb([ {text : '数据更新管理'}, {text : '更新公告管理'} ]);
	renderLeftMenu('dataUpdate', 'dataUpdate_info');
	
	laydate.skin('yalan');
	
	// 添加城市
	$(".addCity").click(function(){
		_typeBtn = $(this);
		_typeFormat = $(this).attr("data-format");
		// 查询数据
		var dataTypeId = $(this).attr("data-value");
		var url = project_fullpath +"/dataUpdate/queryCityByType";
		$.post(url,{dataTypeId: dataTypeId},function(rtz){
			var htm = '<ul class="checkbox-ul clearfix"> <li class="m all" data-value=""><span><i></i>全部</span></li>';
			$.each(rtz,function(k,v){
				var selected = v.selected != 0 ? ' selected exist' : '';
				htm += '<li class="m'+selected+'" data-name="'+v.cityName+
				'" data-value="'+v.cityId+
				'"><span><i></i>'+v.cityName+' </span></li>';
			});
			htm += '</ul>';
			htm += '<div class="tprompt-btn-area">';
			htm += '<span class="tprompt-sure-btn">确定</span>';
			htm += '<span class="tprompt-cancel-btn">取消</span></div>';
			var tprompt = new window.tprompt({title:'添加城市',info:htm});
			tprompt.show();
		},'json');
	})
	
	// 单个类型设置所有之下的日期
	$(".apply-date").click(function(){
		var val = $(this).prev().val();
		if(val){
			$(this).parents("tr.alone").next()
			.find("li.m.selected input.laydate-icon").val(val);
		}
	})
	
	// 提交按钮
	$(".commit-btn").click(function(){
		// 获取所有
		var params = [];
		$(".checkbox-ul li.m.selected").each(function(){
			var dataTypeId = $(this).attr("data-typeid");
			var cityId = $(this).attr("data-value");
			var cityName = $(this).attr("data-name");
			var dataUpdateTime = $(this).find("input.laydate-icon").val();
			params.push({
				dataTypeId: dataTypeId,
				cityId: cityId,
				cityName: cityName,
				dataUpdateTime: dataUpdateTime
			});
		})
		if(params.length > 0){
			// 入库
			var url = project_fullpath +"/dataUpdate/update";
			$.post(url,{params: JSON.stringify(params)},function(rtz){
				swal({   
					title: "修改成功!",   
					text: "",   
					type: "success",
					confirmButtonColor: "#1caf9a",   
					confirmButtonText: "确定"
					}
				);
			},'json');
		}
	})
	
	$("body").on("click",".tprompt-cancel-btn",function(){
		$(this).parents(".data-construction-wrap").remove();
	});
	
	// 选择城市按钮
	$("body").on("click",".tprompt-sure-btn",function(){
		var _this = $(this);
		var params = [];
		$(this).parents(".info").
		find(".checkbox-ul>li.selected:not(.all,.exist)")
		.each(function(k,v){
			params.push({cityId: $(this).attr("data-value"), 
				cityName: $(this).attr("data-name"),
				format: _typeFormat,
				dataTypeId: _typeBtn.attr("data-value")});
		})
		if(params.length > 0){
			var url = project_fullpath +"/dataUpdate/add";
			$.ajax({
				url:url,
				data:{params: JSON.stringify(params)},
				type: 'post',
				dataType: 'json', 
				success: function(rtz){
					if(rtz.result){
						var html = "";
						$.each(params,function(){
							html += '<li class="m selected" data-typeid="'+this.dataTypeId+'" data-value="'+this.cityId+
							'" data-name="'+this.cityName+'">';
							html += '<span><i></i>'+this.cityName+'</span> <span class="silver">数据更新至</span> ';
							html += '<span><input id="lastTime-'+this.dataTypeId+'-'+this.cityId+'"';
							html += 'data-format="'+this.format+'" ';
							html += 'value="'+rtz.result+'" ';
							html += 'onclick="laydate(format:\'YYYY年MM月DD日\')" readonly ';
							html += 'class="laydate-icon"></span></li>';
						})
						_typeBtn.prev().append(html);
					}
				}
			})
		}
		$(this).parents(".data-construction-wrap").remove();
	})

	$('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey')
			.iCheck({
				checkboxClass : 'icheckbox_minimal-blue',
				radioClass : 'iradio_minimal-blue'
			});

	$(".commit-btn").click(function() {
	})

	// 选择数据类型
	$('input[type="checkbox"].flat-grey-datatype').iCheck({
		checkboxClass : 'icheckbox_minimal-blue',
	}).on('ifChecked', function(event) {
		// $(this).parent().parent().parent().siblings().show();
	}).on('ifUnchecked', function(event) {
		// $(this).parent().parent().parent().siblings().hide();
	})

	$("body").on(
			"click",
			".checkbox-ul>li.m>span:first-child",
			function() {
				// 如果不为seleted 和all
				var selected = $(this).parent().hasClass("selected");
				var isAll = $(this).parent().hasClass("all");
				if (isAll) {
					if (selected) {
						$(this).parent().removeClass('selected').siblings(".m.selected")
								.removeClass('selected');
					} else {
						$(this).parent().addClass('selected').siblings(
								".m:not(.all,.selected)").addClass('selected');
					}
				} else {
					if (selected) {
						$(this).parent().removeClass('selected');
						$(this).parent().siblings(".m.all.selected").removeClass(
								'selected');
					} else {
						$(this).parent().addClass('selected');
						var item = $(this).parent().siblings(".m:not(.all)").size();
						var sel = $(this).parent().siblings(".m.selected").size();
						if (item == sel) {
							$(this).parent().siblings(".m.all").addClass("selected");
						}
					}
				}
			})
})