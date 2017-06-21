<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basepath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="cn">
<head>
    
    <!-- Basic page needs
	============================================ -->
	<base href="<%=basepath%>">
	<title></title>
	<meta charset="utf-8">
    <meta name="keywords" content="" />
    <meta name="author" content="Magentech">
    <meta name="robots" content="index, follow" />
   
	<!-- Mobile specific metas
	============================================ -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	
	<!-- Favicon
	============================================ -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="ico/favicon.png">
	
    <!-- Libs CSS
	============================================ -->
    <link rel="stylesheet" href="static/mall/css/bootstrap/css/bootstrap.min.css">
	<link href="static/mall/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="static/mall/js/datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="static/mall/js/owl-carousel/owl.carousel.css" rel="stylesheet">
	<link href="static/mall/css/themecss/lib.css" rel="stylesheet">
	<link href="static/mall/js/jquery-ui/jquery-ui.min.css" rel="stylesheet">
	
	<!-- Theme CSS
	============================================ -->
   	<link href="static/mall/css/themecss/so_megamenu.css" rel="stylesheet">
    <link href="static/mall/css/themecss/so-categories.css" rel="stylesheet">
	<link href="static/mall/css/themecss/so-listing-tabs.css" rel="stylesheet">
	
	<link id="color_scheme" href="static/mall/css/theme.css" rel="stylesheet">
		
	<link href="static/mall/css/responsive.css" rel="stylesheet">
	
	<link href="static/mall/css/index.css" rel="stylesheet">
	<script type="text/javascript">
		var mall_fullpath = "<%=path%>";
	</script>
</head>

<body class="res layout-subpage banners-effect-6">
	<div class="new-goods-content-wrap">
		<div class="new-goods-content clearfix">
			<div class="content-title">
				<h3>发布商品</h3>
				<div class="error-prompt">请填写商品名称 </div>
			</div>
			<div class="col-md-12">
				<div class="col-md-2">商品名称:</div>
				<div class="col-md-10">
					<input type="text" value="佳能 ESO - 500" id="addgoods-goodsname">
				</div>
			</div>
			<div class="col-md-12">
				<div class="col-md-2">商品价格:</div>
				<div class="col-md-10">
					<input type="text" value="16000" id="addgoods-goodsprice">
				</div>
			</div>
			<div class="col-md-12">
				<div class="col-md-2">商品描述:</div>
				<div class="col-md-10">
					<textarea id="addgoods-goodsdiscription"></textarea>
				</div>
			</div>
			<div class="col-md-12">
				<div class="col-md-2">商品图片:</div>
				<div class="col-md-10">
					<div class="add-goodsimage-button"></div>
				</div>
			</div>
			
			<div class="col-md-12">
			<div class="col-md-2"></div>
				<div class="col-md-10 image-upload-prompt">
					最多可以上传<span>2</span>张图片,图片大小不能超过<span>2M</span>
				</div>
			</div>
			<div class="col-md-12">
				<div class="pull-right button-area">
						<button class="button-item cancel">取消</button>
						<button class="button-item sure">确定</button>
				</div>
			</div>
		</div>
	</div>
    <div id="wrapper" class="wrapper-full ">
	<!-- Header Container  -->
	<header id="header" class=" variantleft type_1">
<!-- Header Top -->
<div class="header-top">
	<div class="container">
		<div class="row">
			<div class="header-top-left form-inline col-sm-6 col-xs-12 compact-hidden">
			</div>
			<div class="header-top-right collapsed-block text-right  col-sm-6 col-xs-12 compact-hidden">
				<h5 class="tabBlockTitle visible-xs">More<a class="expander " href="#TabBlock-1"><i class="fa fa-angle-down"></i></a></h5>
				<div class="tabBlock" id="TabBlock-1">
					<ul class="top-link list-inline">
						<li class="account" id="my_account">
							<a href="#" title="My Account" class="btn btn-xs dropdown-toggle" data-toggle="dropdown"> 
								<span >请登录</span> <span class="fa fa-angle-down"></span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- //Header Top -->
<!-- Header center -->
<div class="header-center left">
	<div class="container">
		<div class="row">
			<!-- Logo -->
			<div class="navbar-logo col-md-3 col-sm-12 col-xs-12">
				<a href="index.html"><img src="static/mall/image/demo/logos/theme_logo.png" title="Your Store" alt="Your Store" /></a>
			</div>
			<!-- //end Logo -->

			<!-- Search -->
			<div id="sosearchpro" class="col-sm-7 search-pro">
				<form method="GET" action="index.html">
					<div id="search0" class="search input-group">
						<div class="select_category filter_type icon-select">
							<select class="no-border" name="category_id">
								<option value="0">全球购</option>
								<option value="78">Apparel</option>
								<option value="77">Cables &amp; Connectors</option>
								<option value="82">Cameras &amp; Photo</option>
								<option value="80">Flashlights &amp; Lamps</option>
								<option value="81">Mobile Accessories</option>
								<option value="79">Video Games</option>
								<option value="20">Jewelry &amp; Watches</option>
								<option value="76">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Earings</option>
								<option value="26">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wedding Rings</option>
								<option value="27">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Men Watches</option>
							</select>
						</div>

						<input class="autosearch-input form-control" type="text" value="" size="50" autocomplete="off" placeholder="雅诗兰黛小棕瓶" name="search">
						<span class="input-group-btn">
						<button type="submit" class="button-search btn btn-primary" name="submit_search"><i class="fa fa-search"></i></button>
						</span>
					</div>
					<input type="hidden" name="route" value="product/search" />
				</form>
			</div>
			<!-- //end Search -->

			<!-- Secondary menu -->
			<div class="col-md-2 col-sm-5 col-xs-12 shopping_cart pull-right">
				<!--cart-->
				<div id="cart" class=" btn-group btn-shopping-cart">
					<a data-loading-text="Loading..." class="top_cart dropdown-toggle" data-toggle="dropdown">
						<div class="shopcart">
							<span class="handle pull-left"></span>
							<span class="title">购物车</span>
							<p class="text-shopping-cart cart-total-full">2 件商品 - $1,262.00 </p>
						</div>
					</a>

					<ul class="tab-content content dropdown-menu pull-right shoppingcart-box" role="menu">
						
						<li>
							<table class="table table-striped">
								<tbody>
									<tr>
										<td class="text-center" style="width:70px">
											<a href="product.html"> <img src="static/mall/image/demo/shop/product/35.jpg" style="width:70px" alt="Filet Mign" title="Filet Mign" class="preview"> </a>
										</td>
										<td class="text-left"> <a class="cart_product_name" href="product.html">Filet Mign</a> </td>
										<td class="text-center"> x1 </td>
										<td class="text-center"> $1,202.00 </td>
										<td class="text-right">
											<a href="product.html" class="fa fa-edit"></a>
										</td>
										<td class="text-right">
											<a onclick="cart.remove('2');" class="fa fa-times fa-delete"></a>
										</td>
									</tr>
									<tr>
										<td class="text-center" style="width:70px">
											<a href="product.html"> <img src="static/mall/image/demo/shop/product/141.jpg" style="width:70px" alt="Canon EOS 5D" title="Canon EOS 5D" class="preview"> </a>
										</td>
										<td class="text-left"> <a class="cart_product_name" href="product.html">Canon EOS 5D</a> </td>
										<td class="text-center"> x1 </td>
										<td class="text-center"> $60.00 </td>
										<td class="text-right">
											<a href="product.html" class="fa fa-edit"></a>
										</td>
										<td class="text-right">
											<a onclick="cart.remove('1');" class="fa fa-times fa-delete"></a>
										</td>
									</tr>
								</tbody>
							</table>
						</li>
						<li>
							<div>
								<table class="table table-bordered">
									<tbody>
										<tr>
											<td class="text-left"><strong>Sub-Total</strong>
											</td>
											<td class="text-right">$1,060.00</td>
										</tr>
										<tr>
											<td class="text-left"><strong>Eco Tax (-2.00)</strong>
											</td>
											<td class="text-right">$2.00</td>
										</tr>
										<tr>
											<td class="text-left"><strong>VAT (20%)</strong>
											</td>
											<td class="text-right">$200.00</td>
										</tr>
										<tr>
											<td class="text-left"><strong>Total</strong>
											</td>
											<td class="text-right">$1,262.00</td>
										</tr>
									</tbody>
								</table>
								<p class="text-right"> <a class="btn view-cart" href="#"><i class="fa fa-shopping-cart"></i>View Cart</a>&nbsp;&nbsp;&nbsp; <a class="btn btn-mega checkout-cart" href="#"><i class="fa fa-share"></i>Checkout</a> </p>
							</div>
						</li>
					</ul>
				</div>
				<!--//cart-->
			</div>
		</div>

	</div>
</div>
<!-- //Header center -->

<!-- Header Bottom -->
<div class="header-bottom">
	<div class="container">
		<div class="row">
			
			<div class="sidebar-menu col-md-3 col-sm-6 col-xs-12 ">
				<div class="responsive so-megamenu ">
					<div class="so-vertical-menu no-gutter compact-hidden">
						<nav class="navbar-default">	
							
							<div class="container-megamenu vertical  ">
								
								<div id="menuHeading">
									<div class="megamenuToogle-wrapper">
										<div class="megamenuToogle-pattern">
											<div class="container hide">
												<div>
													<span></span>
													<span></span>
													<span></span>
												</div>
												All Categories							
												<i class="fa pull-right arrow-circle fa-chevron-circle-up"></i>
											</div>
										</div>
									</div>
								</div>
								</div>
							</nav>
					</div>
				</div>

			</div>
			
			<div class="megamenu-hori header-bottom-right  col-md-9 col-sm-6 col-xs-12 ">
				<div class="responsive so-megamenu ">
	<nav class="navbar-default">
		<div class=" container-megamenu  horizontal">
			
			<div class="navbar-header">
				<button type="button" id="show-megamenu" data-toggle="collapse" class="navbar-toggle">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				Navigation		
			</div>
			
			<div class="megamenu-wrapper">
				<span id="remove-megamenu" class="fa fa-times"></span>
				<div class="megamenu-pattern">
					<div class="container">
						<ul class="megamenu " data-transition="slide" data-animationtime="250">
							<li class="home hover">
								
								<a href="index.html">商城首页  </a>
							</li>
							<li class="with-sub-menu hover">
								<p class="close-menu"></p>
								<a href="#" class="clearfix">
									<strong>商品管理</strong>
									<span class="label"> new</span>
								</a>
							</li>
							<li class="with-sub-menu hover">
								<p class="close-menu"></p>
								<a href="#" class="clearfix">
									<strong>订单管理</strong>
									<span class="label"> new</span>
								</a>
							</li>
							<li class="with-sub-menu hover">
								<p class="close-menu"></p>
								<a href="#" class="clearfix">
									<strong>店铺管理</strong>
									<span class="label"></span>
								</a>
							</li>
							
						</ul>
						
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>
									</div>
			
		</div>
	</div>

</div>
	</header>
	<div class="main-container container">
		<ul class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i></a></li>
			<li><a href="#">所有商品</a></li>
		</ul>
		
		<div class="row">
			<!--Left Part Start -->
			<aside class="col-sm-4 col-md-3" id="column-left">
				<div class="module menu-category titleLine">
					<h3 class="modtitle">商品分类</h3>
					<div class="modcontent">
						<div class="box-category">
							<ul id="cat_accordion" class="list-group">
								<c:forEach var="menu" varStatus="status" items="${menulist}">
									<li class="hadchild"><a href="javascript:;" class="cutom-parent fir-classify-item">${menu.mainMenuName}</a>   <span class="button-view  fa fa-plus-square-o"></span>
										<ul style="display: block;">
											<c:forEach var="item" varStatus="status" items="${menu.subMenuList}">
												<c:if test="${item.subMenuName != null}">
													<li><a class="sec-classify-item" href="javascript:;">${item.subMenuName}</a></li>
												</c:if>
											</c:forEach>
											<li class="add-sec-classify active" data-id="${menu.mainMenuId }">
												<a href="javascript:;">+ 添加分类</a></li>
										</ul>
									</li>
								</c:forEach>
								<li class="add-fir-classify active">
									<a href="javascript:;" class="cutom-parent">+ 添加分类</a>  
									<span class="dcjq-icon"></span></li>
							</ul>
						</div>
						
						
					</div>
				</div>
			</aside>
			<!--Left Part End -->
			
			<!--Middle Part Start-->
			<div id="content" class="col-md-9 col-sm-8">
				<div class="products-category">
					<div class="row">
						<div class="col-sm-12">
							<button class="add-products-item pull-right" type="button" data-toggle="tooltip">
							<i class="fa fa-plus"></i> 
							<span class="hidden-xs">发布商品</span></button>
						</div>
					</div>
					<!-- Filters -->
					<div class="product-filter filters-panel">
						<div class="row">
							<div class="col-md-2 visible-lg">
								<div class="view-mode">
									<div class="list-view">
										<button class="btn btn-default grid active" data-view="grid" data-toggle="tooltip"  data-original-title="网格显示"><i class="fa fa-th"></i></button>
										<button class="btn btn-default list" data-view="list" data-toggle="tooltip" data-original-title="列表显示"><i class="fa fa-th-list"></i></button>
									</div>
								</div>
							</div>
							<div class="short-by-show form-inline text-right col-md-7 col-sm-8 col-xs-12">
								<div class="form-group short-by">
									<label class="control-label" for="input-sort">排序:</label>
									<select id="input-sort" class="form-control"
									onchange="location = this.value;">
										<option value="" selected="selected">默认</option>
										<option value="">商品名称 (A - Z)</option>
										<option value="">商品名称 (Z - A)</option>
										<option value="">价格 (低 &gt; 高)</option>
										<option value="">价格 (高 &gt; 低)</option>
									</select>
								</div>
								<div class="form-group">
									<label class="control-label" for="input-limit">显示:</label>
									<select id="input-limit" class="form-control" onchange="location = this.value;">
										<option value="" selected="selected">9</option>
										<option value="">25</option>
										<option value="">50</option>
										<option value="">75</option>
										<option value="">100</option>
									</select>
								</div>
							</div>
							<div class="box-pagination col-md-3 col-sm-4 col-xs-12 text-right">
								<ul class="pagination">
									<li class="active"><span>1</span></li>
									<li><a href="">2</a></li><li><a href="">&gt;</a></li>
									<li><a href="">&gt;|</a></li>
								</ul>
							</div>
						</div>
					</div>
					<!-- //end Filters -->
					<!--changed listings-->
					<div class="products-list row grid">
						<!-- goodslist -->
						<c:forEach var="goods" varStatus="status" items="${goodslist}">
							<div class="product-layout col-md-4 col-sm-6 col-xs-12">
							<div class="product-item-container">
								<div class="left-block">
									<div class="product-image-container lazy second_img  lazy-loaded">
										<img data-src="static/mall/image/demo/shop/product/11.jpg" src="image/demo/shop/product/11.jpg" alt="Apple Cinema 30&quot;" class="img-responsive">
										<img data-src="static/mall/image/demo/shop/product/10.jpg" src="image/demo/shop/product/10.jpg" alt="Apple Cinema 30&quot;" class="img_0 img-responsive">
									</div>
								</div>
								
								
								<div class="right-block">
									<div class="caption">
										<h4><a href="product.html">${goods.goodsName}</a></h4>		
										<div class="ratings">
											<div class="rating-box">
												<span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span>
												<span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span>
												<span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span>
												<span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span>
												<span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span>
											</div>
										</div>
															
										<div class="price">
											<span class="price-new">${goods.price }</span> 
											
										</div>
										<div class="description item-desc hidden">
											<p>${goods.remark }</p>
										</div>
									</div>
									
									  <div class="button-group">
										<button class="addToCart" type="button" data-toggle="tooltip" title="" onclick="cart.add('42', '1');" data-original-title=""><i class="fa fa-shopping-cart"></i> 
											<span class="hidden-xs">添加到购物车</span></button>
										<button class="wishlist" type="button" data-toggle="tooltip" title="" onclick="wishlist.add('42');" data-original-title="Add to Wish List"><i class="fa fa-heart"></i></button>
										<button class="compare" type="button" data-toggle="tooltip" title="" onclick="compare.add('42');" data-original-title="Compare this Product"><i class="fa fa-exchange"></i></button>
									  </div>
									</div><!-- right block -->
						
								</div>
							</div>
						</c:forEach>
					</div>					<!--// End Changed listings-->
					<!-- Filters -->
					<div class="product-filter product-filter-bottom filters-panel" >
						<div class="row">
							<div class="col-md-2 hidden-sm hidden-xs">
							</div>
						   <div class="short-by-show text-center col-md-7 col-sm-8 col-xs-12">
								<div class="form-group" style="margin: 7px 10px">Showing 1 to 9 of 10 (2 Pages)</div>
							</div>
							<div class="box-pagination col-md-3 col-sm-4 text-right"><ul class="pagination"><li class="active"><span>1</span></li><li><a href="#">2</a></li><li><a href="#">&gt;</a></li><li><a href="#">&gt;|</a></li></ul></div>
									
						 </div>
					</div>
					<!-- //end Filters -->
					
				</div>
				
			</div>
			
			
		</div>
		<!--Middle Part End-->
	</div>
	<!-- //Main Container -->
	

	<!-- Footer Container -->
	<footer class="footer-container">
		<!-- Footer Top Container -->
		<section class="footer-top">
			<div class="container content">
				<div class="row">
					<div class="col-sm-6 col-md-3 box-information">
						<div class="module clearfix">
							<h3 class="modtitle">Information</h3>
							<div class="modcontent">
								<ul class="menu">
									<li><a href="#">About Us</a></li>
									<li><a href="#">FAQ</a></li>
									<li><a href="#">Order history</a></li>
									<li><a href="#">Order information</a></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="col-sm-6 col-md-3 box-service">
						<div class="module clearfix">
							<h3 class="modtitle">Customer Service</h3>
							<div class="modcontent">
								<ul class="menu">
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">Returns</a></li>
									<li><a href="#">Site Map</a></li>
									<li><a href="#">My Account</a></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="col-sm-6 col-md-3 box-account">
						<div class="module clearfix">
							<h3 class="modtitle">My Account</h3>
							<div class="modcontent">
								<ul class="menu">
									<li><a href="#">Brands</a></li>
									<li><a href="#">Gift Vouchers</a></li>
									<li><a href="#">Affiliates</a></li>
									<li><a href="#">Specials</a></li>
									<li><a href="#" target="_blank">Our Blog</a></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="col-sm-6 col-md-3 collapsed-block ">
						<div class="module clearfix">
							<h3 class="modtitle">Contact Us	</h3>
							<div class="modcontent">
								<ul class="contact-address">
									<li><span class="fa fa-map-marker"></span> My Company, 42 avenue des Champs Elysées 75000 Paris France</li>
									<li><span class="fa fa-envelope-o"></span> Email: <a href="#"> sales@yourcompany.com</a></li>
									<li><span class="fa fa-phone">&nbsp;</span> Phone 1: 0123456789 <br>Phone 2: (123) 4567890</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /Footer Top Container -->
		
		<!-- Footer Bottom Container -->
		<div class="footer-bottom-block ">
			<div class=" container">
				<div class="row">
					<div class="col-sm-5 copyright-text">Copyright &copy; 2017.Company name All rights reserved.<a target="_blank" href="http://sc.chinaz.com/moban/">&#x7F51;&#x9875;&#x6A21;&#x677F;</a></div>
					<div class="col-sm-7">
						<div class="block-payment text-right"><img src="static/mall/image/demo/content/payment.png" alt="payment" title="payment" ></div>
					</div>
					<!--Back To Top-->
					<div class="back-to-top"><i class="fa fa-angle-up"></i><span> Top </span></div>

				</div>
			</div>
		</div>
		<!-- /Footer Bottom Container -->
		
		
	</footer>
	<!-- //end Footer Container -->

    </div>
	
	
	<!-- Cpanel Block -->
	<div id="sp-cpanel_btn" class="isDown visible-lg">
	<i class="fa fa-cog"></i>
</div>		

<div id="sp-cpanel" class="sp-delay">
	<h2 class="sp-cpanel-title"> Demo Options <span class="sp-cpanel-close"> <i class="fa fa-times"> </i></span></h2>
	<div id="sp-cpanel_settings">
		<div class="panel-group">
			<label>Color Scheme</label>
			<div class="group-schemes" >
				<span data-scheme="default"  class="item_scheme selected"><span style="background: #e8622d;"></span></span>
				<span data-scheme="blue" class="item_scheme"><span style="background: #478bca;"></span></span>
				<span data-scheme="boocdo"  class="item_scheme"><span style="background: #e54e4e;"></span></span>
				<span data-scheme="cyan" class="item_scheme"><span style="background: #1ea181;"></span></span>
				<span data-scheme="green" class="item_scheme "><span style="background: #52a633;"></span></span>
				
			 </div>
		</div>
		
		<div class="panel-group ">
			<label>Header style</label>
			<div class="group-boxed">
				<select id="change_header_type" name="cpheaderstype" class="form-control" onchange="headerTypeChange(this.value);">
					<option value="header-home1" >Header 1</option>
					<option value="header-home2" >Header 2</option>
					<option value="header-home3" >Header 3</option>
					<option value="header-home4" >Header 4</option>
				</select>
			</div>
		</div>
		
		
		<div class="panel-group ">
			<label>Layout Box</label>
			<div class="group-boxed">
				<select id="cp-layoutbox" name="cplayoutbox" class="form-control" onchange="changeLayoutBox(this.value);">
					<option value="full">Wide</option>
					<option value="boxed">Boxed</option>
					<option value="iframed">Iframed</option>
					<option value="rounded">Rounded</option>
				</select>
			</div>
		</div>
		
        <div class="panel-group">
			<label>Body Image</label>
			
			<div class="group-pattern">
								<div data-pattern="28"  class="img-pattern"><img src="static/mall/image/theme/patterns/28.png" alt="pattern 28"></div>
								<div data-pattern="29"  class="img-pattern"><img src="static/mall/image/theme/patterns/29.png" alt="pattern 29"></div>
								<div data-pattern="30"  class="img-pattern"><img src="static/mall/image/theme/patterns/30.png" alt="pattern 30"></div>
								<div data-pattern="31"  class="img-pattern"><img src="static/mall/image/theme/patterns/31.png" alt="pattern 31"></div>
								<div data-pattern="32"  class="img-pattern"><img src="static/mall/image/theme/patterns/32.png" alt="pattern 32"></div>
								<div data-pattern="33"  class="img-pattern"><img src="static/mall/image/theme/patterns/33.png" alt="pattern 33"></div>
								<div data-pattern="34"  class="img-pattern"><img src="static/mall/image/theme/patterns/34.png" alt="pattern 34"></div>
								<div data-pattern="35"  class="img-pattern"><img src="static/mall/image/theme/patterns/35.png" alt="pattern 35"></div>
								<div data-pattern="36"  class="img-pattern"><img src="static/mall/image/theme/patterns/36.png" alt="pattern 36"></div>
								<div data-pattern="37"  class="img-pattern"><img src="static/mall/image/theme/patterns/37.png" alt="pattern 37"></div>
								<div data-pattern="38"  class="img-pattern"><img src="static/mall/image/theme/patterns/38.png" alt="pattern 38"></div>
								<div data-pattern="39"  class="img-pattern"><img src="static/mall/image/theme/patterns/39.png" alt="pattern 39"></div>
								<div data-pattern="40"  class="img-pattern"><img src="static/mall/image/theme/patterns/40.png" alt="pattern 40"></div>
								<div data-pattern="41"  class="img-pattern"><img src="static/mall/image/theme/patterns/41.png" alt="pattern 41"></div>
								<div data-pattern="42"  class="img-pattern"><img src="static/mall/image/theme/patterns/42.png" alt="pattern 42"></div>
								<div data-pattern="43"  class="img-pattern"><img src="static/mall/image/theme/patterns/43.png" alt="pattern 43"></div>
								<div data-pattern="44"  class="img-pattern"><img src="static/mall/image/theme/patterns/44.png" alt="pattern 44"></div>
								<div data-pattern="45"  class="img-pattern"><img src="static/mall/image/theme/patterns/45.png" alt="pattern 45"></div>
							</div>
			<p class="label-sm">Background only applies for Boxed,Framed, Rounded Layout</p>
		</div>
		
		<div class="reset-group">
		    <a href="index.html" class="btn btn-success " onclick="ResetAll()">Reset</a>
		</div>
		
	</div>

</div>



<link rel='stylesheet' property='stylesheet'  href='static/mall/css/themecss/cpanel.css' type='text/css' media='all' />
	
	
	<!-- Preloading Screen -->
	<div id="loader-wrapper">
		<div id="loader"></div>
		<div class="loader-section section-left"></div>
		<div class="loader-section section-right"></div>
	 </div>
	<!-- End Preloading Screen -->
	
<!-- Include Libs & Plugins
	============================================ -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="static/mall/js/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="static/mall/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="static/mall/js/owl-carousel/owl.carousel.js"></script>
	<script type="text/javascript" src="static/mall/js/themejs/libs.js"></script>
	<script type="text/javascript" src="static/mall/js/unveil/jquery.unveil.js"></script>
	<script type="text/javascript" src="static/mall/js/countdown/jquery.countdown.min.js"></script>
	<script type="text/javascript" src="static/mall/js/dcjqaccordion/jquery.dcjqaccordion.2.8.min.js"></script>
	<script type="text/javascript" src="static/mall/js/datetimepicker/moment.js"></script>
	<script type="text/javascript" src="static/mall/js/datetimepicker/bootstrap-datetimepicker.min.js"></script>
	<script type="text/javascript" src="static/mall/js/jquery-ui/jquery-ui.min.js"></script>
	
	
	<!-- Theme files
	============================================ -->
	
	
	<script type="text/javascript" src="static/mall/js/themejs/so_megamenu.js"></script>
	<script type="text/javascript" src="static/mall/js/themejs/addtocart.js"></script>
	<script type="text/javascript" src="static/mall/js/themejs/application.js"></script>
	<script type="text/javascript" src="static/mall/js/themejs/cpanel.js"></script>
	<script type="text/javascript" src="static/mall/js/index.js"></script>
	
</body>
</html>

