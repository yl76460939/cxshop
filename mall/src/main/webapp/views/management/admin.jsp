<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>后台新增用户与商铺</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    <link rel="stylesheet" href="<%=basePath %>static/management/css/style.css" media="screen" type="text/css" />
    <script type="text/javascript" src="<%=basePath%>static/util/bootstrap/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript">
       $(document).ready(function(){
		    //web.main();
	  });
	 
	 function myformSubmit(){
	    web.getImgUrl($("#logoFile"),$("#logoImg"),$("#logoExpImg"));
        web.getImgUrl($("#mainAreas"),$("#mainAreasImg"),$("#mainAreasExpImg"));
        return true;
	 }
 
var web={
    c:document.createElement("canvas"),
    ctx:web.c.getContext("2d"),
    main : function(){
        web.init();
       $("#submit").submit(function(e){
       		//alert(1);
		    web.getImgUrl($("#logoFile"),$("#logoImg"),$("#logoExpImg"));
            web.getImgUrl($("#mainAreas"),$("#mainAreasImg"),$("#mainAreasExpImg"));
		});
      /*  $('#submit').on("onclick",function(){
            web.getImgUrl($("#logoFile"),$("#logoImg"),$("#logoExpImg"));
            web.getImgUrl($("#mainAreas"),$("#mainAreasImg"),$("#mainAreasExpImg"));
            //$('#contact').submit();
        });*/
       
    },
    init : function(){
        this.file_Id=$("#file");
        this.img_Id=$("#img");
        this.expImg_Id=$("#expImg");
        this.btn_Id=$("#btn");
        this.c=document.createElement("canvas");
        this.ctx=this.c.getContext("2d");
    },
    getImgUrl : function(file_Id,img_Id,expImg_Id){
    alert('123');
        var fileUrl=""
           ,imgDataUrl=""
           ,reader=new FileReader()
           ,imgW=0
           ,imgH=0
           ,expW=0
           ,expH=0
           ,imgMax=800;
         
      //  web.btn_Id.click(function(){
            imgW=0;
            imgH=0;
            expW=0;
            expH=0;
            img_Id[0].src="";
             
            //转换图片为base64格式
            fileUrl=file_Id[0].files[0];
            reader.readAsDataURL(fileUrl);
             
            reader.onload=function(e){
                img_Id[0].src=this.result;
                 
                imgW=img_Id.width();
                imgH=img_Id.height();
                 
                /*改变图片尺寸，这个根据自己的实际需求来写算法
                if(imgW>imgMax&&imgW>=imgH){
                    expW=imgMax;
                    expH=parseInt((imgMax*imgH)/imgW);
                }else if(imgH>imgMax&&imgH>imgW){
                    expH=imgMax;
                    expW=parseInt((imgMax*imgW)/imgH);
                }else{
                    expW=imgW;
                    expH=imgH;
                }*/
                expW=imgW;
                expH=imgH;
                web.c.width=expW;
                web.c.height=expH;
                 
                web.ctx.drawImage(img_Id[0],0,0,expW,expH);
                 
               // imgDataUrl=web.c.toDataURL(); //默认输出PNG格式
                imgDataUrl=web.c.toDataURL("image/jpeg",0.8); //设置输出jpg格式，第二个参数为图片质量
                console.log("imgDataUrl:"+imgDataUrl);
                expImg_Id[0].value=imgDataUrl;
            }
       // })
    }
}
    </script>
  </head>
  <body>
  <div class="container">  
 	 <!--  <img id="expImg"/>
	<img id="img" style="display:none"/>
	<div><input type="file" id="file"></div>
	<div id="btn" style="font-size:48px; line-height:60px">确定</div>-->
  <form id="contact" action="./whl/createUserAndWhl" onsubmit="myformSubmit()" method="post">
    <h3>新增用户和商铺</h3>
    <h4>系统登录账号基本信息</h4>
    <fieldset>
      <input placeholder="用户移动电话/登录账号" name="userMobilePhone" type="text" tabindex="1" autofocus >
    </fieldset>
    <fieldset>
      <input placeholder="用户登录密码" name="userPwd" type="text" tabindex="2" >
    </fieldset>
    <fieldset>
      <input placeholder="用户姓名" name="userName"  type="text" tabindex="3"  >
    </fieldset>
    <fieldset>
      <input placeholder="用户座机" name="userTelephone" type="text" tabindex="4" >
    </fieldset>
    <fieldset>
      <textarea placeholder="用户联系地址" name="userAddress" tabindex="5" ></textarea>
    </fieldset>
     <h4>商铺基本信息</h4>
    <fieldset>
      <input placeholder="商铺号" name="shopKey" type="text" tabindex="6" >
    </fieldset>
     <fieldset>
      <input placeholder="商铺名称" name="shopName" type="text" tabindex="7"  >
    </fieldset>
    <fieldset>
      <input placeholder="商铺联系人" name="shopUserName" type="text" tabindex="8" >
    </fieldset>
    <fieldset>
      <input placeholder="商铺联系电话" name="shopUserTelephone" type="text" tabindex="9" >
    </fieldset>
    <fieldset>
      <input placeholder="主营范围" name="mainAreas" type="text" tabindex="10" >
    </fieldset>
    <fieldset>
      <textarea placeholder="商铺联系地址" name="shopUserAddress" tabindex="11" ></textarea>
    </fieldset>
    <fieldset>
       <input placeholder="logo" accept="image/*" id="logoFile" type="file">
       <img id="logoImg" style="display:none">
       <input type="hidden" id="logoExpImg" name="logo" />
    </fieldset>
    <fieldset>
       <input placeholder="mainAreas" id="mainAreas" accept="image/*" type="file">
       <img id="mainAreasImg" style="display:none">
       <input type="hidden" id="mainAreasExpImg" name="photos"/>
    </fieldset>
    <fieldset>
      <button name="submit" type="submit" id="submit" data-submit="...提交中">新增用户与商铺</button>
    </fieldset>
  </form>
</div>
  </body>
</html>
