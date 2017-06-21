var residency_hukou_flag=0;	// 居住地 / 户口所在地   开关
var residency = {
	// 居住地输出
	Show : function(type){
		var k=0;
		var Div=new Array('maincity','allProv');
		var cityArr;
		if(type=="G"){//供应
			cityArr=showCity_NO_G;
		}else if(type=="X"){//项目
			cityArr=showCity_NO_X;
		}else if(type=="A"){//所有
			cityArr=showCity_NO_A;
		}

		while(k<=1){
			var output='<h4>主要城市：</h4>';
			var arr=maincity,area;
			if(k==1){
				output='<h4>主要城市：</h4>';
				arr=allprov;
			}
			for (var i in arr){
				area=arr[i][0];
				output+='<dl><dt>'+area+'</dt><dd>';
				for (var j in arr[i][1] ){
					id=arr[i][1][j];
					var showCityNo=cityArr[id];
					if(k==0){
						if(showCityNo == "" || typeof (showCityNo) == "undefined"||showCityNo == false ){
							output+='<li class="span_Grey">'+ja[id]+'</li>';
						}else{
							output+='<li class="liShow" onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
						}
					}else{
						if(area=='其它'){
							if(showCityNo == "" || typeof (showCityNo) == "undefined"||showCityNo == false){
								output+='<li class="span_Grey">'+ja[id]+'</li>';
							}else{
								output+='<li class="liShow" onclick="residency.Chk(\''+id+'\')">'+ja[id]+'</li>';
							}
						}
						else{
							if(showCityNo == "" || typeof (showCityNo) == "undefined"||showCityNo == false){
								output+='<li class="span_Grey">'+ja[id]+'</li>';
							}else{
								output+='<li class="liShow" onclick="residency.SubLayer(\''+id+'\',\''+type+'\')">'+ja[id]+'</li>';
							}
						}
					}
				}
				output+='</dd></dl>';
			}
			
			$('#'+Div[k]).html(output);
			k++;
		}
		$('#drag').width('480px');
	   
		
		
		
		// 鼠标悬停变色
		//$('#residencyAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass()});
		$('#residencyAlpha .liShow').hover(function(){$(this).addClass('over')},function(){$(this).removeClass()});
		// 点击弹出子菜单
		$('#allProv li').click(function(e)
		{  
			//许威添加
			var top = this.offsetTop;
			var left = this.offsetLeft;
		
			//top:e.pageY,left:e.pageX-4
			$("#sublist").css(
					{
						top:top-4,left:left-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 所有省份 下拉 城市菜单
	SubLayer : function(id,type){

		var output='<div id="sub_city">',width,ischecked,key;
		var arr=getAreaIDs(id);
			width=Math.ceil(Math.sqrt(arr.length-1))*60;
		var cityArr;
		if(type=="G"){
				cityArr=showCity_NO_G;
		}else if(type=="X"){
				cityArr=showCity_NO_X;
		}else if(type=="A"){//所有
			cityArr=showCity_NO_A;
		}	
			
		//output+='<ul style="width:'+width+'px"><h4 onclick="residency.Chk(\''+id+'\')"><a href="javascript:">'+ja[id]+'</a></h4>';
		output+='<ul style="width:'+width+'px"><h4 ><a href="javascript:">'+ja[id]+'</a></h4>';
		for (var i=1;i<arr.length;i++){
			key=arr[i];
			var showCityNo=cityArr[key];
	
			if(showCityNo == "" || typeof (showCityNo) == "undefined"||showCityNo == false){
				output+='<li class="span_Grey">'+ja[key]+'</li>';
			}else{
				output+='<li><a class="liShow" href="javascript:" onclick="residency.Chk(\''+key+'\')">'+ja[key]+'</a></li>';
			}
		}
		output=output+'</ul></div>';
		$("#sublist").html(output).show();
	},


	Chk : function(id){
		if(residency_hukou_flag==0){
			$('#btn_residency').val(ja[id]);
			$('#residency').val(id);
			//$('#cityNO').val(cityNO[id]);
		}else{
			$('#btn_hukou').val(ja[id]);
			//$('#hukou').val(id);
			
		//	$('#cityNO').val(cityNO[id]);
		}
		$('#cityNO').val(city_NO[id]);
		$("#sublist").hide().empty();
		boxAlpha();
		//许威添加开始
		//var areaUrl = "bsctl/getArea/" + city_NO[id] + "/X";
		//loadingSelectData_Area("select_Area",city_NO[id],areaUrl);//加载数据
		
		Defualtfunctions(city_NO[id],ja[id]);
			
			
		
		//许威添加结束
		
	}
}

	
function residencySelect(){
	residency_hukou_flag=0;
	var dragHtml ='<div id="residencyAlpha">';		//居住地
		dragHtml+='		<div id="maincity"></div>';	//主要城市
		dragHtml+='		<div id="allProv"></div>';	//所有省市
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择居住地</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	residency.Show();
	boxAlpha();
	draglayer();
}

//点击事件
function hukouSelect(type){
	residency_hukou_flag=1;
	var dragHtml ='<div id="residencyAlpha">';		//居住地
		dragHtml+='		<div id="maincity"></div>';	//主要城市
		dragHtml+='		<div id="allProv"></div>';	//所有省市
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择城市</b><span onclick="boxAlpha()">关闭</span>');
	$('#drag_con').html(dragHtml);
	residency.Show(type);
	boxAlpha();
	draglayer();
}


/* **************************************************************************** */

var jobArea_Arr = new Array();
//var jobArea_Arr = new Array('0100','0200','2402');

var jobArea = {
	// 请选择地区
	init : function(){
		var _str='',_id='';
		if (jobArea_Arr.length>0){
			for (var i in jobArea_Arr){
				_str+=','+ja[jobArea_Arr[i]];
				_id+=','+jobArea_Arr[i];
			}
			$('#btn_jobArea').val(_str.substring(1));
			$('#jobAreaID').val(_id.substring(1));
		}
	},
	Show : function(){
		var k=0,output='',output2='',arr,area,select_ed;
		var Div		= new Array('maincity2','allProv2');
		var Title	= new Array('<h4>主要城市：</h4>','<h4>所有省份：</h4>');
		var LoopArr	= new Array(maincity,allprov);

		for(var i in jobArea_Arr){
			output2+='<li class="jobArea'+jobArea_Arr[i]+' chkON" onclick="jobArea.Chk(\''+jobArea_Arr[i]+'\')">'+ja[jobArea_Arr[i]]+'</li>';
		}
		$('#jobAreSelected dd').html(output2);

		while(k<=1){
			output	= Title[k];
			arr		= LoopArr[k]
			for (var i in arr){
				area=arr[i][0];
				output+='<dl><dt>'+area+'</dt><dd>';
				for (var j in arr[i][1] ){
					id=arr[i][1][j];
					if(k==0){
						select_ed=in_array(id,jobArea_Arr)?' chkON':'';
						output+='<li class="jobArea'+id+select_ed+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
					}else{
						if(area=='其它') output+='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
						else output+='<li onclick="jobArea.SubLayer(\''+id+'\')">'+ja[id]+'</li>';
					}
				}
				output+='</dd></dl>';
			}
			
			$('#'+Div[k]).html(output);
			k++;
		}
		$('#drag').width('580px');
		// 鼠标悬停变色
		$('#jobAreaAlpha li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
		// 点击弹出子菜单
		$('#allProv2 li').click(function(e){$("#sublist").css({top:e.pageY-4,left:e.pageX-4}).hover(function(){$(this).show()},function(){$(this).hide()})})
	},
	// 所有省份 下拉 城市菜单
	SubLayer : function(id){
		var output='<div id="sub_jobArea">',width,select_ed,key;
		select_ed=in_array(id,jobArea_Arr)?' chkON':'';
		var arr=getAreaIDs(id);
			width=Math.ceil(Math.sqrt(arr.length-1))*60;
		output+='<ul style="width:'+width+'px"><h4 onclick="jobArea.Chk(\''+id+'\')">';
		output+='<a href="javascript:" class="jobArea' + id + select_ed +'">'+ja[id]+'</a></h4>';

		for (var i=1;i<arr.length;i++){
			key=arr[i];
			select_ed=in_array(key,jobArea_Arr)?' chkON':'';
			output+='<li><a href="javascript:" class="jobArea' + key + select_ed +'" onclick="jobArea.Chk(\''+key+'\')">'+ja[key]+'</a></li>';
		}
		output=output+'</ul></div>';
		$("#sublist").html(output).show();
	},


	Chk : function(id){
		if(!in_array(id,jobArea_Arr)){
			var subArea,myid;
			if(id.substr(2)=='00'){	// 选中父类清除子类
				subArea=getAreaIDs(id);
				for(var i in subArea){
					if(in_array(subArea[i],jobArea_Arr)) this.del(subArea[i]);
				}
			}else{	// 选中子类清除父类
				myid=id.substr(0,2)+'00';
				if(in_array(myid,jobArea_Arr)) this.del(myid);
			};
			if(jobArea_Arr.length<5){
				jobArea_Arr[jobArea_Arr.length]=id;
				var html='<li class="jobArea'+id+'" onclick="jobArea.Chk(\''+id+'\')">'+ja[id]+'</li>';
				$('#jobAreSelected dd').append(html);
				$('.jobArea'+id).addClass('chkON');
				$('#jobAreSelected li').hover(function(){$(this).addClass('over')},function(){$(this).removeClass('over')});
			}else{
				alert('您最多能选择5项');
				return false;
			}
		}else{
			this.del(id);
		}
	},
	del : function(id){
		for (var i in jobArea_Arr){
			if(jobArea_Arr[i]==id) jobArea_Arr.splice(i,1);;
		}
		$('#jobAreSelected .jobArea'+id).remove();
		$('.jobArea'+id).removeClass('chkON');
	},
	// 确定
	confirm : function(){
		var areaStr='';
		for(var i in jobArea_Arr){
			areaStr+=','+ja[jobArea_Arr[i]];
		}
		areaStr=areaStr.substring(1)?areaStr.substring(1):'请选择地区'; 
		$('#btn_jobArea').val(areaStr);
		$('#jobAreaID').val(jobArea_Arr);
		boxAlpha();
		$('#jobAreSelected dd').empty();
	}
}

function jobAreaSelect(){
	var dragHtml ='<div id="jobAreaAlpha">';		//地区
		dragHtml+='		<dl id="jobAreSelected"><dt>已选地点：</dt><dd></dd></dl>';
		dragHtml+='		<div id="maincity2"></div>';//主要城市
		dragHtml+='		<div id="allProv2"></div>';	//所有省市
		dragHtml+='</div>';
	$('#drag_h').html('<b>请选择地区（您最多能选择5项）</b><span onclick="jobArea.confirm()">确定</span>');
	$('#drag_con').html(dragHtml);

	jobArea.Show();
	boxAlpha();
	draglayer();
	
}