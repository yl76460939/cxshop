/**
 * t-弹出框
 * @author liuw 2016-9-5
 */
;(function(window){ 
	var tprompt = function(i){
		var _ = {};
		_.i = i;
		_.show = function(){
			var titleTxt = _.i.title;
			// info
			var info = $("<div/>").addClass("info").append(_.i.info);
			// info-title
			var title = $("<p/>").append($("<strong/>").text(titleTxt));
			var i = $("<i/>").on("click",function(){
				$(this).parents(".data-construction-wrap").remove();
			});
			var infoTitle = $("<div/>").addClass("info-title")
			.append(title).append(i);
			// box-container
			var container = $("<div/>").addClass("box-container")
			.append(infoTitle).append(info);
			// data-construction-global
			var content = $("<div/>").addClass("data-construction-global")
			.addClass("overlay-dialog-animate")
			.append($("<div/>")).append(container);
			// wrap
			var wrap = $("<div/>").addClass("data-construction-wrap")
			.append(content);
			$("body").append(wrap);
		};
		_.close = function(elem){
			elem.parents(".data-construction-wrap").remove();
		}
		return _;
	}
	window.tprompt = tprompt;
})(window);