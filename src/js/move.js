function getStyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, null)[name];
	}
}

function startmove(el, json, fun) {
	var value = null;
	clearInterval(el.timer);
	el.timer = setInterval(function() {
		var bStop = true;
		/*循环需要执行animate的属性*/
		for(var css in json) {
			/*如果是需要设置的opacity*/
			if(css == "opacity") {
				/*获取当前节点中css的数值*/
				value = Math.round(parseFloat(getStyle(el, css)) * 100);
			} else {
				/*获取当前节点中css的数值*/
				value = parseInt(getStyle(el, css));
			}
			
			/*	需要运算到的位置减去现在的css数值 / 8	*/
			var speed = (json[css] - value) / 8;

			/*如果当前的速度*/
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			/*如果当前的值*/
			if(value != json[css]) {
				bStop = false;
			}

			if(css == "opacity") {
				el.style[css] = (value + speed) / 100;
			} else {
				el.style[css] = value + speed + 'px';
			}
		}
		
		if(bStop) {
			clearInterval(el.timer);
			if(fun) {
				fun();
			}
		}
	}, 30)
}