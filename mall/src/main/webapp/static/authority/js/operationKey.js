var downLoadModuleId = 'LAND_USER_OPERATION';

$(function(){
	
	initbreadcrumb([ {text : '权限管理'},{text : 'KEY注册'}]);
	renderLeftMenu('auth', 'user_operation');
	
	createkey();
	$(".flushbutton").click(function(){
		createkey()
	})
	
	$('input[type="radio"].flat-grey,input[type="checkbox"].flat-grey')
	.iCheck({
		radioClass : 'iradio_minimal-blue',
		checkboxClass : 'icheckbox_minimal-blue'
	});
	
	$("#generate").click(function(){
		var key = $.trim($('#key').val());
		var name = $.trim($('#name').val());
		var remark = $.trim($('#remark').val());
		if(key==''){
			prompt('打酱油呢 恩? 搞一个空的KEY ?');
			return;
		}
		if(name==''){
			prompt('不填KEY对应的名称 ??');
			return;
		}
		var genurl = project_fullpath +"/authController/generate";
		$.post(genurl,{key:key,
			name:name,
			divisive: $("input[name='divisive']:checked").val(),
			remark:remark},function(result){
				createkey();
			prompt(result == 1 ? '生成成功!@#$%^&' : '生成失败......');
			$.post('authController/allKey',function(rtz){
				var ele = [];
				rtz.forEach(function(v, k){
					var tr = $('<tr/>').append('<td>'+v.code+'</td>')
					.append('<td>'+v.name+'</td>')
					.append('<td>'+v.divisive+'</td>')
					.append('<td>'+v.remark+'</td>');
					ele.push(tr);
				})
				if(ele.length){
					ele.unshift("<tr><th>KEY</th><th>名称</th><th>区分城市</th><th>备注</th></tr>");
					$('#key-register table.transition').html(ele);
				}
			},'json')
		})
	})
	
	$("#generate-role").click(function(){
		var name = $('#roleName').val().trim();
		var remark = $('#roleRemark').val().trim();
		if(name==''){
			prompt('不填角色名称 ??');
			return;
		}
		$.post('authController/selectRoleByName',{roleName:name},
				function(row){
			if(row == 0){
				var genurl = project_fullpath +"/authController/addRole";
				$.post(genurl,{name:name,
					remark:remark},function(result){
					prompt(result == 1 ? '角色生成成功!@#$%^&...' : '生成失败......');
					
					// 刷新角色
					$.post('authController/allRole',function(rtz){
						var ele = [];
						rtz.forEach(function(v, k){
							var tr = $('<tr/>')
							.append('<td>'+v.roleName+'</td>')
							.append('<td>'+v.remark+'</td>')
							ele.push(tr);
						})
						if(ele.length){
							ele.unshift('<tr><th>角色名称</th><th>备注</th></tr>');
							$('#role-register table.transition').html(ele);
						}
					},'json')
				})
			}else{
				prompt('角色名称重复!!! @#$%^&...');
			}
		})
		
	})
	
	$('.page-header').click(function(){
		var key = $(this).data("section");
		$('#'+key).show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active')
	})
	
})

function prompt(msg){
	var notification = new NotificationFx({
		message : '<div class="ns-thumb">\
			<img src="static/main/images/user1.jpg"/></div>\
			<div class="ns-content">\
			<p>'+msg+'</p>\
			</div>',
		layout : 'right',
		ttl : 6000,
		effect : 'thumbslider',
		type : 'success',
		onClose : function() {}
	});
	notification.show();
}

// generate key
function createkey(){
	var url = project_fullpath +"/authController/key";
	$.post(url,function(seriNo){
		if(seriNo){
			$("#key").val(seriNo);
		}
	});
}
