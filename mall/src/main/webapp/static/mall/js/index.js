
var constant = {};


$(function(){
	
	// 添加1,2级分类
	$('body').on('click','.add-fir-classify.active,.add-sec-classify.active',
	  function(){
		$(this).removeClass('active').
			html(constant.add_sec_classify_input).
				find('input').focus();
	})
	
	// 商品发布
	$('.add-products-item').click(function(){
		
	})
	
	// 一级菜单 点击确认添加菜单
	$('body').on('click','.add-fir-classify button', function(e){
		var li = $(this).parents('li.add-fir-classify');
		var txt = $(this).prev().val().trim();
		var newli = $(constant.add_fir_item);
		if(txt){
			var url = mall_fullpath +'/malls/mainMenu';
			$.post(url,{mainMenuName: txt},function(model){
				if(model.status){
					if(model.result != 0){
						$('a',newli).text(txt);
						var sub = $(constant.add_fir_item_sub);
						sub.find('.add-sec-classify').data('id',model.result);
						li.before(newli.append(sub));
						li.replaceWith(constant.add_fir_classify);
					}else if(model.result == 0){
						alert('一级分类名称重复');
					}
				}
				e.stopPropagation();
			},'json')
		}else{
			li.replaceWith(constant.add_fir_classify);
			e.stopPropagation();
		}
		
	})
	
	// 二级菜单 点击确认添加菜单
	$('body').on('click','.add-sec-classify button', function(e){
		var li = $(this).parents('li.add-sec-classify');
		var txt = $(this).prev().val().trim();
		var newli = $(constant.add_sec_item);
		
		if(txt){
			var parentId = li.data('id');
			var url = mall_fullpath +'/malls/subMenu';
			$.post(url,{subMenuName: txt,parentId:parentId},function(model){
				if(model.status){
					if(model.result != 0){
						$('a',newli).text(txt);
						li.before(newli.data('id',model.result));
						li.replaceWith(constant.add_fir_classify);
					}else if(model.result == 0){
						alert('二级分类名称重复');
					}
				}
				e.stopPropagation();
			},'json')
		}else{
			li.replaceWith(constant.add_sec_classify);
			e.stopPropagation();
		}
		
	})
	
})

// 一级菜单HTML
constant.add_fir_item = '<li class=""><a href="category.html" class="cutom-parent"></a><span class="button-view  fa fa-plus-square-o"></span>';
constant.add_fir_classify = '<li class="add-fir-classify active"><a href="javascript:;" class="cutom-parent">+ 添加分类</a>  <span class="dcjq-icon"></span></li>';
constant.add_fir_item_sub = '<ul style="display: none;"><li class="add-sec-classify active"><a href="javascript:;">+ 添加分类</a></li></ul>';

// 二级菜单HTML
constant.add_sec_item = '<li><a href="category.html"></a></li>';
constant.add_sec_classify = '<li class="add-sec-classify active"><a href="javascript:;">+ 添加分类</a></li>';
constant.add_sec_classify_input = '<div><input type="text"><button> 确定</button></div>';







