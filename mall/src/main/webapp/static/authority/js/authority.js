var detailPage = "";

var initHtm = '<div class="prov-div" data-value="通用功能">\
			<label>通用功能</label> \
			</div>\
			<div class="split-line"></div>\
			<div class="accordion-city"></div>';

var html = "<li>\
	<div class='key-title'>\
	 <i class='{{exist}}'></i>\
	 <span>{{key}}</span>\
	</div>\
	<ul class='config-item' data-id='{{operationKey}}'>\
		<li>\
			<label class='item-item'>是否可用:</label>\
			<div class='radio-group usable'>\
				<div class='{{usableclass1}}' data-value='1'><i></i><label class='item'>是</label></div>\
				<div class='{{usableclass2}}'  data-value='0'><i></i><label class='item'>否</label></div>\
			</div>\
		</li>\
		<li>\
			<label class='item-item'>操作类型:</label>\
			<div class='radio-group type'>\
				<div class='{{typeclass1}}' data-value='0'><i></i><label class='item'>查询</label></div>\
				<div class='{{typeclass2}}'  data-value='1'><i></i><label class='item'>下载</label></div>\
				<div class='{{typeclass3}}'  data-value='2'><i></i><label class='item'>其他</label></div>\
			</div>\
		</li>\
		<li>\
			<label class='item-item'>使用条数:</label>\
			<input class='use-num' type='text' value='{{number}}' />\
		</li>\
		</ul> </li>";
	
$(function() {
	initbreadcrumb([ {text : '权限设置'}, {text : '用户城市授权设置'} ]);
	renderLeftMenu('auth', 'role_settings');
	laydate.skin('yalan');
	
	// 命中第一个角色
	hitFirst();
	
	$('body').on('click','.add-city', function(){
		// 查询数据
		var url = project_fullpath +"/authController/queryCity";
		$.post(url,{roleId: $(".city-title").data('id')},function(rtz){
			var seled = getReadyCity();
			var htm = '<ul class="checkbox-ul clearfix"> <li class="m all" data-value=""><span><i></i>全部</span></li>';
			$.each(rtz,function(k,v){
				var index = $.inArray(v.cityId,seled);
				var selected = index != -1 ? ' selected' : '';
				htm += '<li class="m'+selected+'" data-name="'+v.cityName+
				'" data-value="'+v.cityId+
				'" data-expires="'+v.expires+
				'" data-class="'+v.class+
				'" data-pinyin="'+v.pinyin+'"><span><i></i>'
				+v.cityName+' </span></li>';
			});
			htm += '</ul>';
			htm += '<div class="tprompt-btn-area">';
			htm += '<span class="tprompt-sure-btn">确定</span>';
			htm += '<span class="tprompt-cancel-btn">取消</span></div>';
			var tprompt = new window.tprompt({title:'添加城市',info:htm});
			tprompt.show();
		},'json');
	})
	
	// 展示所有城市 多选
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
	
	$("body").on("click",".tprompt-cancel-btn",function(){
		$(this).parents(".data-construction-wrap").remove();
	});
	
	// 不区分城市的功能
	$("body").on("click",".prov-div",function(){
		if($(this).hasClass('active')){
			return;
		}
		$(this).addClass('active').siblings().removeClass('active');
		$('.accordion-city>div.active').removeClass('active');
		// 加载 功能配置信息 (角色id + 功能key)
		var roleId = $("li.selected[data-name='userInfoList']").data('value');
		var key = $(this).data('id');
		var text = $(this).data('value');
		$.post('authController/normal',{roleId:roleId,key:key},function(prs){
			$(".function-title").data({id:0,cityId:'',cityName:'',pinyin:''})
			.text(text).removeClass('hide');
			// 显示到期时间
			$('.dueTime-area').removeClass('hide')
				.find('.dueTime').val(push_dueTime);
			$('.copy-settings').addClass('disable');
			loadFunction(prs);
		},'json')
	});
	
	// 条数限制正整数
	$(".use-num").keyup(function(){
		if('' != this.value.replace(/^\d+$/,'')){
			this.value = this.value.match(/^\d+$/) == null 
			? '' :this.value.match(/^\d+$/);
	    }
	})
	
	// 区分城市  选择城市加载城市下的所有功能
	$("body").on("click",".accordion-city>div",function(){
		if($(this).hasClass('active')){
			return;
		}
		$(this).addClass('active').siblings().removeClass('active');
		$('.prov-div.active').removeClass('active');
		// 加载 功能配置信息 (角色id + cityNo)
		var roleId = $("li.selected[data-name='userInfoList']").data('value');
		var data = $(this).data();
		data.roleId = roleId;
		data.id = 1;
		var cityName = $(this).data('cityName');
		var text = "<span>"+cityName+"</span>";
		$.post('authController/divisive',data,function(prs){
			$(".function-title").data(data).html(text).removeClass('hide');
			debugger;
			// 显示到期时间
			$('.dueTime-area').removeClass('hide')
				.find('.dueTime').val(push_dueTime);
			$('.copy-settings').removeClass('disable');
			loadFunction(prs);
		},'json')
	});
	
	// 选择城市按钮
	$("body").on("click",".tprompt-sure-btn",function(){
		var _this = $(this);
		var params = [];
		$(this).parents(".info").
		find(".checkbox-ul>li.selected:not(.all,.exist)")
		.each(function(k,v){
			var push = {cityId: $(this).data("value"), 
					cityName: $(this).data("name"),
					pinyin: $(this).data("pinyin"),
					expires: $(this).data("expires")};
			
			var item = createCityInfo($(this).data("name"),
					$(this).data("value"),
					$(this).data("pinyin"),
					$(this).data("expires"),
					$(this).data("class"),
					push);
			
			params.push(item);
		})
		if(params.length > 0){
			$(".accordion-city").html(params);
		}
		$(this).parents(".data-construction-wrap").remove();
	})
	
	$(".save-settings").click(function(){
		var items = $(".config-item");
		if(items.size()){
			swal({   
				title: "确认保存?",   
				text: "请谨慎操作",   
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#1caf9a",   
				confirmButtonText: "确认",
				closeOnConfirm: false
			}, 
			function(){   //保存
				var info = [];
				
				var roleId = $('.city-title').data('id');
				var data = $('.function-title').data();
				var expires = $(".laydate-icon.dueTime").val();
				$.each(items,function(k,v){
					var operationKey = $(this).data('id');
					var usable = $(".usable>.selected",$(this)).data('value');
					var type = $(".type>.selected",$(this)).data('value');
					var number = $(".use-num",$(this)).val();
					var item = {};
					item.roleId = roleId;
					item.usable = usable;
					item.type = type;
					item.number = number;
					item.expires = expires;
					item.operationKey = operationKey;
					item.divisive = data.id;
					item.cityPinyin = data.pinyin;
					item.cityNo = data.cityId;
					item.cityName = data.cityName;
					info.push(item);
				})
				$.ajax({
					url: "authController/save",
					type: "POST",
					data: {prs: JSON.stringify(info),
						divisive: data.id,
						roleId: roleId,
						cityId: data.cityId
						},
				    success: function(result){
				    	swal("保存成功", "", "success");
				    	// 修改时间
				    	var active = $('.accordion-city>.active');
				    	var curTime = moment().format('YYYY-MM-DD');
				    	var label = $('label',active).text();
				    	if(expires < curTime){
				    		$('label',active).html('<s>'+label+'</s>');
				    		$('span',active).html(expires)
				    		.removeClass('green').addClass('red');
				    	}else{
				    		$('label',active).html(label);
				    		$('span',active).html(expires)
				    		.removeClass('red').addClass('green');
				    	}
				    }
				});
			});
			
		} else {
			layer.msg('老铁 你要我保存什么 ??', {icon: 0,shift: 4,offset: '100px'});
		}
		
	})
	
	$("#detailInfo").click(function(){
		// layer
		layer.open({
			      type: 2,
			      title: '详细信息:',
			      shadeClose: true,
			      id: 'layer',
			      shade: 0,
			      maxmin: true, //开启最大化最小化按钮
			      area: ['893px','70%'],
			      content: project_fullpath+'/authController/roleSettingDetail'
		});
	})
	
	$(".checkbox-ul").on("click","li.m",function(){
		//如果不为seleted 和all
		var selected = $(this).hasClass("selected");
		var isAll = $(this).hasClass("all");
		if(isAll){
			if(selected){
				$(this).removeClass('selected').siblings(".m.selected").removeClass('selected');
			}else{
				$(this).addClass('selected').siblings(".m:not(.all,.selected)").addClass('selected');
			}
		}else{
			if(selected){
				$(this).removeClass('selected');
				$(this).siblings(".m.all.selected").removeClass('selected');
			}else{
				$(this).addClass('selected');
				var item = $(this).siblings(".m:not(.all)").size();
				var sel = $(this).siblings(".m.selected").size();
				if(item == sel){
					$(this).siblings(".m.all").addClass("selected");
				}
			}
		}
	})
	
	// 单选 角色
	$(".role-list-ul").on("click","li.s:visible",function(){
		if($(this).hasClass('selected')){
			return;
		}
		$(this).addClass('selected')
		.siblings(".selected").removeClass('selected');
		
		reset();
		$(".city-title").text($(".item",$(this)).text())
		.data('id',$(this).data('value'))
		.removeClass('hide');
		$('.accordion.city-tree').html(initHtm);
		// 加载已设置的城市
		var roleId = $(this).data('value');
		
		loadExistCity(roleId);
	})
	
	$("body").on("click",".radio-group>div",function(){
		$(this).addClass('selected')
		.siblings(".selected").removeClass('selected');
	})
	
	$("body").on("click",".prompt-div i",function(){
		$(this).parent().remove();
	})
	
	// copy 角色信息 copyrole-settings
	$(".copyrole-settings").click(function(){
		 if($(this).hasClass('disable')){
			 return;
		 }
		 console.log('copyrole-settings begin ....');
		 var roleId = $(".city-title").data('id');
		 var roleName = $(".city-title").text();
		 var url = project_fullpath +"/authController/role";
		 if(roleId){
			 $.post(url,function(rtz){
					var htm = '<ul class="checkbox-ul clearfix"> <li class="m all" data-value=""><span><i></i>全部</span></li>';
					$.each(rtz,function(k,v){
						var selected = '';
						htm += '<li class="m'+selected+'" data-name="'+v.roleName+
						'" data-id="'+v.roleId+'"><span><i></i>'
						+v.roleName+' </span></li>';
					});
					htm += '</ul>';
					htm += '<div class="tprompt-btn-area">';
					htm += '<span class="copyrole-sure-btn">确定</span>';
					htm += '<span class="tprompt-cancel-btn">取消</span></div>';
					var tprompt = new window.tprompt({title:'将['+roleName+']配置应用于:',info:htm});
					tprompt.show();
				},'json');
		 }else{
			 layer.msg('老铁 你不选要我保存什么 ??', {icon: 0,shift: 4,offset: '100px'});
		 }
	})
	
	// copy配置按钮
	$(".copy-settings").click(function(){
		if($(this).hasClass('disable')){
			 return;
		}
		console.log('copy-settings begin ....');
		// 查询数据
		var url = project_fullpath +"/authController/queryCity";
		var cityName = $(".function-title>span").text();
		if(cityName){
			$.post(url,function(rtz){
				var htm = '<ul class="checkbox-ul clearfix"> <li class="m all" data-value=""><span><i></i>全部</span></li>';
				$.each(rtz,function(k,v){
					var selected = '';
					htm += '<li class="m'+selected+'" data-name="'+v.cityName+
					'" data-value="'+v.cityId+
					'" data-expires="'+v.expires+
					'" data-pinyin="'+v.pinyin+'"><span><i></i>'
					+v.cityName+' </span></li>';
				});
				htm += '</ul>';
				htm += '<div class="tprompt-btn-area">';
				htm += '<span class="copy-sure-btn">确定</span>';
				htm += '<span class="tprompt-cancel-btn">取消</span></div>';
				var tprompt = new window.tprompt({title:'将['+cityName+']配置应用于:',info:htm});
				tprompt.show();
			},'json');
		}
	})
	
	$("body").on("click",".copy-sure-btn",function(){
		var _this = $(this);
		var params = [];
		$(this).parents(".info").
		find(".checkbox-ul>li.selected:not(.all,.exist)")
		.each(function(k,v){
			var item = {cityId: $(this).data("value"), 
					cityName: $(this).data("name"),
					pinyin: $(this).data("pinyin"),
					expires: $(this).data("expires")};
			
			params.push(item);
		})
		if(params.length > 0){
			var data = $('.function-title').data();
			// 后台查询 当前角色和城市的配置 并插入至所选城市
			$.post('authController/copy',
					{citys:JSON.stringify(params),
						roleId: data.roleId,
						cityId: data.cityId},
					function(row){
				swal("应用成功 !! "+row, "", "success");
				// 将copy的城市添加到已配置区域 
				params.forEach(function(v,k){
					// 如果已经在已配置区域则不添加
					var seled = getReadyCity();
					var index = $.inArray(v.cityId.toString(),seled);
					if(index == -1){
						var h = createCityInfo(v.cityName, 
								v.cityId, v.pinyin, v.expires, v.class, v);
						$(".accordion-city").append(h);
					}else{ // 存在的时候需要修改 时间等
						var expires = $('.dueTime-area>.dueTime').val();
				    	var curTime = moment().format('YYYY-MM-DD');
				    	var curobj = $('.accordion-city>div[data-id="'+v.cityId+'"]');
				    	var label = $('label',curobj).text();
				    	if(expires < curTime){
				    		$('label',curobj).html('<s>'+label+'</s>');
				    		$('span',curobj).html(expires)
				    		.removeClass('green').addClass('red');
				    	}else{
				    		$('label',curobj).html(label);
				    		$('span',curobj).html(expires)
				    		.removeClass('red').addClass('green');
				    	}
					}
					
				})
				// 
			},'json')
		}
		$(this).parents(".data-construction-wrap").remove();
	})
	
	// 角色
	$("body").on("click",".copyrole-sure-btn",function(){
		var _this = $(this);
		var params = [];
		$(this).parents(".info").
		find(".checkbox-ul>li.selected:not(.all,.exist)")
		.each(function(k,v){
			params.push($(this).data("id"));
		})
		if(params.length > 0){
			var roleId = $(".city-title").data('id');
			// 后台查询 当前角色和城市的配置 并插入至所选城市
			$.post('authController/copyrole',
					{roleIds:JSON.stringify(params),
						roleId: roleId},
					function(row){
				swal("应用成功 !!!! "+row, "", "success");
			},'json')
		}
		$(this).parents(".data-construction-wrap").remove();
	})
	
	$(".like-query").click(function(){
		var container = $("#role-privilege-settings .checkbox-ul");
		if(!container.hasClass('fuzzy')){
			roles = $(".checkbox-ul>li").clone(true);
			$.each(roles,function(k,v){
				if($(v).hasClass('selected')){
					selectedIndex = k;
					$(v).removeClass('selected');
					return false;
				}
			})
		}
	})
	
	roles = $(".checkbox-ul>li");
	$(".like-query").keyup(function(){
		reset();
		var current = $(this).val();
		if(!current){
			$(this).next().removeClass('fa-remove')
			.addClass('fa-search');
			$.each(roles,function(k,v){
				if($(v).hasClass('selected')){
					$(v).removeClass('selected');
					return false;
				}
			})
			$(".checkbox-ul").removeClass('fuzzy').html(roles);
			$(".checkbox-ul>li:eq("+selectedIndex+")").click();
			return;
		}
		$(this).next().removeClass('fa-search')
		.addClass('fa-remove');
		var usable = [];
		$.each(roles,function(k,v){
			var txt = $(".item",$(this)).text();
			if(txt.indexOf(current) != -1){
				var ext = $.extend({},$(this),{});
				usable.push(ext.removeClass('selected'));
			}
		})
		$(".checkbox-ul").addClass('fuzzy').html(usable);
	})
	
	$(".search-area").on('click','.fa-remove',function(){
		$(this).prev().val('');
		$(this).removeClass('fa-remove').addClass('fa-search');
		$.each(roles,function(k,v){
			if($(v).hasClass('selected')){
				$(v).removeClass('selected');
				return false;
			}
		})
		$(".checkbox-ul").removeClass('fuzzy').html(roles);
		$(".checkbox-ul>li:eq("+selectedIndex+")").click();
	})
	
});

var roles = [];
var selectedIndex = 0;

var Profile = {
	    load: function () {
	        this.accordion();
	    },
	    accordion: function () {
	    	// 隐藏所有a标签下的div
	        var subMenus = $('.accordion .sub-nav');
	        $('.accordion > div > label').click(function () {
	            $this = $(this);
	            // 当前点击的a标签下的div
	            $target = $this.parent().next();
	            // 删除点击过的a表现样式
	            // $this.siblings('label').removeAttr('class');
	            $this.parent().siblings('.prov-div').
	            children("label").removeAttr('class');
	            // 添加当前点击样式
	            $this.addClass('active');
	            $('.accordion > div > label').siblings(":visible").hide();
	            // 当前a标签中的元素 m
	            $this.parent().children().show();
	            // 如果当前ul没有active
	            if (!$target.hasClass('active')) {
	            	// 上一个点击的收起
	                subMenus.removeClass('active').slideUp(100);
	                // 当前点击的添加active并展开
	                $target.addClass('active').slideDown(100);
	            }
	            return false;
	        });
	    }
	};

function convert(obj){
	var htm = html;
	var result = htm.replace("{{exist}}", obj.exist)
	.replace("{{key}}", obj.key)
	.replace("{{operationKey}}", obj.operationKey)
	.replace("{{usableclass1}}", obj.usableclass1)
	.replace("{{usableclass2}}", obj.usableclass2)
	.replace("{{typeclass1}}", obj.typeclass1)
	.replace("{{typeclass2}}", obj.typeclass2)
	.replace("{{typeclass3}}", obj.typeclass3)
	.replace("{{number}}", obj.number)
	.replace("{{dueTime}}", obj.dueTime);
	return result;
}

function createCityInfo(name, value, pinyin, expires, clazz, data){
	var item = $("<div data-id='"+value+"'/>");
	var city = clazz == 'red' ? 
			"<label><s>"+name+"</s> </label>" : 
				"<label>"+name+" </label>";
	item.append(city+"<span class='"+clazz+"'>"+expires+"</span>").data(data);
	return item;
}

function getReadyCity(){
	var seled = [];
	$(".accordion-city>div").each(function(){
		var cityId = $(this).data('cityId');
		seled.push(cityId.toString());
	})
	return seled;
}

function reset(){
	//清除选择的城市
	$(".accordion-city").html('');
	// 去除通用功能选中
	$('.prov-div').removeClass('active');
	//功能区提示隐藏
	$(".function-title").text('').addClass('hide');
	//城市信息区提示
	$(".city-title").text('').data('id','').addClass('hide');
	// 清除功能区
	$(".auth-menu-ul").html('');
	// 应用于其他城市按钮
	$('.copy-settings').addClass('disable');
	// 隐藏到期时间
	$(".dueTime-area").addClass('hide');
	// 
	$('.accordion.city-tree').html('');
}

function hitFirst(){
	setTimeout(function(){
		$("li[data-name='userInfoList']:first").click()
	},10);
}

function loadExistCity(roleId){
	$.post('authController/ready',{roleId:roleId}
	,function(citys){
		if(citys.length>0){
			var readycitys = [];
			var index = 0;
			var cityId = $('.function-title').data('cityId');
			citys.forEach(function(v,k){
				var data = {cityId: v.cityId, 
						cityName: v.cityName,
						pinyin: v.pinyin,
						expires: v.expires};
				var item = createCityInfo(v.cityName,
						v.cityId,v.pinyin,v.expires,v.class,data);
				readycitys.push(item);
				if(v.cityId == cityId){
					index = k;
				}
			})
			if(readycitys.length > 0){
				$(".accordion-city").html(readycitys);
				if(cityId){ // 选中 城市
					$(".accordion-city>div:eq("+index+")").click();
				}
			}
		}
	},'json')
}

function loadFunction(prs){
	var template = "";
	// 遍历 prs
	prs.forEach(function(v,k){
		var pushPrs = {};
		if(v.id){
			pushPrs.exist = "";
			pushPrs.key = v.name;
			pushPrs.operationKey = v.code;
			pushPrs.usableclass1 = v.usable == 1 ? "s selected" : "s";
			pushPrs.usableclass2 = v.usable == 1 ? "s" : "s selected";
			pushPrs.typeclass1 = v.type == 0 ? "s selected" : "s";
			pushPrs.typeclass2 = v.type == 1 ? "s selected" : "s";
			pushPrs.typeclass3 = v.type == 2 ? "s selected" : "s";
			pushPrs.number = v.number;
			var expires = v.expires;
			expires = expires.substring(0,10);
			$(".laydate-icon.dueTime").val(expires);
		}else{
			pushPrs.exist = "n";
			pushPrs.key = v.name;
			pushPrs.operationKey = v.code;
			pushPrs.usableclass1 = "s selected";
			pushPrs.usableclass2 = "s";
			pushPrs.typeclass1 = "s selected";
			pushPrs.typeclass2 = "s";
			pushPrs.typeclass3 = "s";
			pushPrs.number = "0";
		}
		var htm = convert(pushPrs);
		template += htm;
	})
	
	if(template){
		$(".auth-menu-ul").html(template);
	}
}

