/**
 * wliu 2016-3-8 11:53:45
 * 参照csdn密码强度方案
 */
var $password = $('#password');

function showPsdTooltip(item) {
	var fele = $("#register");
    if ($("#" + item.tooltipid, fele).size() == 0) {
    	var clearArr = [tooltipInfoObject.regstpsd,tooltipInfoObject.confirmPsd];
		clearItemPrompt(clearArr);
		return showToolTipInfo(item.tooltipid, item.cls, item.position,
					item.msg, fele, true);
	}
}

/**
 * 检查密码强度
 * @param _this
 * @returns {Number}
 */
function checkPassWordLevel(_this) {
	// 如果有空格则删除
	if (/\s+/g.test(_this.value)) {
		_this.value = _this.value.replace(/\s+/g, '');
	}

	var checked = checker(_this);
	var level = 0;
	var len = _this.value.length;
	var Length = {
		lowerLen : 8,
		ten : 10,
		fifteen : 15,
		maxLen : 20
	};

	if (len > Length.maxLen || len == 0) {
		//超过最大长度
		var confItem = tooltipInfoObject.regstpsd;
		clearItemPrompt([tooltipInfoObject.psdLengthPrompt]);
		validDataItem(confItem, false);
		level = -1;
		return level;
	} else {
		//显示密码强度tooltip 
		var regstpsd = tooltipInfoObject.regstpsd.tooltipid;
		var ttpPsd = $("#"+regstpsd);
		if(ttpPsd.size() != 0){
			ttpPsd.remove();
		}
		var ttpInfo = tooltipInfoObject.psdLengthPrompt;
		_this.tooltip = showPsdTooltip(ttpInfo);
	}

	if (len >= Length.lowerLen && len < Length.ten) {
		// 纯字母，纯字符大于等于6位且小于10位为低级
		if (checked == 'number' || checked == 'letter' || checked == 'symbol') {
			level = 1;
		}

		// 混排长度大于等于6位且小于10位为中级
		if (checked == 'mix') {
			level = 2;
		}
	}

	if (len >= Length.ten && len <= Length.maxLen) {
		// 纯数字大于等于10位，小于等于20位为中级
		if (checked == 'number') {
			level = 2;
		}

		// 纯字母，纯字符, 大于等于10位且小于15位为中级
		if (len >= Length.ten && len < Length.fifteen) {
			if (checked == 'letter' || checked == 'symbol') {
				level = 2;
			}
		}

		// 混排长度大于等于6位且小于10位为中级
		if (len >= Length.lowerLen && len < Length.ten) {
			if (checked == 'mix') {
				level = 2;
			}
		}
	}

	// 混排大于等于10位且小于20位为高级
	if (len >= Length.ten && len <= Length.maxLen) {
		if (checked == 'mix') {
			level = 3;
		}
	}

	// 纯字母，纯字符大于等于15位且小于20位为高级
	if (len >= Length.fifteen && len <= Length.maxLen) {
		if (checked == 'letter' || checked == 'symbol') {
			level = 3;
		}
	}

	return level;
}

function checkPassword(_this) {
	var level = checkPassWordLevel(_this);
	var tooltip = $("#" + tooltipInfoObject.psdLengthPrompt.tooltipid);
	if(tooltip.size() != 0 && level != -1){
		var strengthEle = tooltip.find('.strength').find('span');
		var levelEle = tooltip.find('.level');
		levelEle.html(passwordStrength[level-1]);
		strengthEle.removeClass();
		if (level > 0) {
			for (var i = 0; i < level; i++) {
				var span = strengthEle[i];
				$(span).addClass('green');
			}
		}
	}
	console.log(level);
}
var passwordStrength = ['低','中','高']

var Regs = {
	letter : /^[a-zA-Z]+$/,
	digit : /^\d+$/,
	symbol : /^[^\d\w\s]+$/
};

function checker(_this) {
	var checked;
	if (letter(_this)) {
		checked = 'letter';
	} else if (number(_this)) {
		checked = 'number';
	} else if (symbol(_this)) {
		checked = 'symbol';
	} else if (mix(_this)) {
		checked = 'mix';
	}
	return checked;
}

function number(_this) {
	return Regs.digit.test(_this.value);
}

function letter(_this) {
	return Regs.letter.test(_this.value);
}

function symbol(_this) {
	return Regs.symbol.test(_this.value);
}

function mix(_this) {
	return (!number(_this) && !letter(_this) && !symbol(_this)) ? true : false;
}
