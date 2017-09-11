//常用的方法
import fn from './fn';

import {
    replaceAlias
} from './tmpl-render';

//在node环境中使用需要用到fs获取文件
import fs from './fs';

//模板正则配置
import {
    BLOCK,
    BLOCK_APPEND,
    BLOCK_INSETR,
    EXTENDS
} from './tmpl-regexp';

/*替换Block块内容*/
export default function replaceBlock() {
    //先设置获取include的引入模板
    replaceAlias.call(this);

    const baseFile = fn.unique(this.template.match(EXTENDS)),
        /*只获取第一个base的名字*/
        baseFileName = baseFile.toString().replace(EXTENDS, "$2").split(',')[0];

    /*如果不存在block的内容，直接跳出*/
    if(baseFileName === '') return;

    const blockTmpl = fn.unique(this.template.match(BLOCK));

    let tmpl = fs.readFileSync(baseFileName, {
        encoding: 'UTF8'
    });

    const baseTmpl = tmpl.match(BLOCK),
        baseBlockName = baseTmpl.toString().replace(BLOCK, "$2").split(',');

    fn.each(baseBlockName, (name, index) => {

        const replaceBlock = new RegExp(fn.initRegExp(baseTmpl[index]), 'g');

        let hasBlock = false;

        fn.each(blockTmpl, (blocktmpl, _index) => {

            BLOCK.test(blocktmpl);

            const _name = RegExp.$2,
                blockContent = RegExp.$3;

            //匹配到name的
            if(name === _name) {

                tmpl = tmpl.replace(replaceBlock, blockContent);
                hasBlock = true;

            } else if(BLOCK_APPEND.test(_name) && name === _name.replace(BLOCK_APPEND, '')) {

                tmpl = tmpl.replace(replaceBlock, baseTmpl[index].replace(BLOCK, "$3") + blockContent);
                hasBlock = true;

            } else if(BLOCK_INSETR.test(_name) && name === _name.replace(BLOCK_INSETR, '')) {

                tmpl = tmpl.replace(replaceBlock, blockContent + baseTmpl[index].replace(BLOCK, "$3"));
                hasBlock = true;

            }
            BLOCK.lastIndex = 0;
        });

        /*如果当前的block是在extends的模板中不存在，则显示默认里面的*/
        if(!hasBlock) {
            tmpl = tmpl.replace(replaceBlock, baseTmpl[index].replace(BLOCK, '$3'));
        }
    });

    this.template = tmpl;
}