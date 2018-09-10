//常用的方法
import util from '../../util';

import {
	replaceAlias
} from '../compile';

//在node环境中使用需要用到fs获取文件
import fs from '../fs';

//模板正则配置
import {
	BLOCK,
	BLOCK_APPEND,
	BLOCK_INSETR,
	EXTEND
} from './compile-regexp';

/*替换Block块内容*/
export default function replaceBlock() {
	//先设置获取include的引入模板
	replaceAlias.call(this);

	const baseFile = util.unique(this.$template.match(EXTEND)),
		/*只获取第一个base的名字*/
		baseFileName = baseFile.toString()
			.replace(EXTEND, "$2")
			.split(',')[0];

	/*如果不存在block的内容，直接跳出*/
	if(baseFileName === '') return;

	//获取入口模板
	const blockTmpl = util.unique(this.$template.match(BLOCK));

	//获取继承的模板
	let layoutTmpl = fs.readFileSync(baseFileName, {
		encoding: 'UTF8'
	});

	//从继承模板中筛选出block
	const layoutTmplFindBlock = layoutTmpl.match(BLOCK) || [],
		layoutTmplFindBlockStr = layoutTmplFindBlock.toString(),
		baseBlockName = util.unique(layoutTmplFindBlockStr !== '' ? (layoutTmplFindBlockStr.replace(BLOCK, "$2")
			.split(',')) : []);

	util.each(baseBlockName, (name, index) => {

		const block = layoutTmplFindBlock[index],
			replaceBlock = new RegExp(util.initRegExp(block), 'g');

		let hasBlock = false;

		util.each(blockTmpl, (blocktmpl, _index) => {

			BLOCK.test(blocktmpl);

			const _name = RegExp.$2,
				blockContent = RegExp.$3;

			//匹配到name的
			if(name === _name) {
				layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent);
				hasBlock = true;
			} else if(BLOCK_APPEND.test(_name) && name === _name.replace(BLOCK_APPEND, '')) {
				layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(BLOCK, "$3") + blockContent);
				hasBlock = true;
			} else if(BLOCK_INSETR.test(_name) && name === _name.replace(BLOCK_INSETR, '')) {
				layoutTmpl = layoutTmpl.replace(replaceBlock, blockContent + block.replace(BLOCK, "$3"));
				hasBlock = true;
			}

			BLOCK.lastIndex = 0;

		});

		/*如果当前的block是在extends的模板中不存在，则显示默认里面的*/
		if(!hasBlock) {
			layoutTmpl = layoutTmpl.replace(replaceBlock, block.replace(BLOCK, '$3'));
		}
	});

	this.$template = layoutTmpl;
}