//运行环境是否在浏览器
import inBrowser from '../in_browser';

//在node环境中使用需要用到fs获取文件
let fs;

if(!inBrowser) {
	fs = require('fs');
}

export default fs;