//运行环境是否在浏览器
import inBrowser from './in_browser';

//兼容性IE8
(() => {
	//兼容IE8中 的indexOf
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = (val) => {
			for (let index = 0, len = this.length; index < len; index++) {
				if(this[index] === val) {
					return index;
				}
			}
			return -1;
		}
	}

	/*只在浏览器环境使用*/
	if(inBrowser && !document.getElementsByClassName) {
		document.getElementsByClassName = (className, el) => {
			const children = (el || document).getElementsByTagName('*'),
				elements = new Array();
			for (let i = 0; i < children.length; i++) {

				const child = children[i],
					classNames = child.className.split(' ');

				for (let j = 0; j < classNames.length; j++) {
					if(classNames[j] == className) {
						elements.push(child);
						break;
					}
				}
			}

			return elements;
		};
	}
})();

export default true;