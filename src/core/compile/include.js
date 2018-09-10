//运行环境是否在浏览器
import inBrowser from '../in_browser';
//常用的方法
import util from '../../util';
//在node环境中使用需要用到fs获取文件
import fs from '../fs';

//模板正则配置
import {
  INCLUDE_ID,
  INCLUDE_FILE,
  INCLUDE_ERROR,
} from './compile-regexp';

/*替换include引入的模板*/
export default function replaceInclude() {
  const include = (() => {
    if (inBrowser) {
      //在浏览器环境清空include[file]
      return INCLUDE_ID;
    } else {
      //在node环境清空include[name]
      return INCLUDE_FILE;
    }
  })();

  let includeTmpl, includeId;

  //去重
  includeTmpl = util.unique(this.$template.match(include));
  includeId = includeTmpl.toString().replace(include, "$2").split(',');

  //找不到include//查找的id和include匹配的数量必须相同
  if (includeTmpl.length === 0 || util.trimArr(includeId)
      .length === 0 ||
    !(includeTmpl.length > 0 &&
      includeId.length > 0 &&
      includeId.length === includeTmpl.length
    )) return;

  util.each(includeId, (id, index) => {
    const replaceIncludeRegExp = new RegExp(util.initRegExp(includeTmpl[index]), 'g');
    /*浏览器环境下执行*/
    if (inBrowser) {
      const el = this.getEl(id);
      if (el) {
        this.$template = this.$template.replace(replaceIncludeRegExp, this.html(el));
      } else {
        //找不到就清空原来的内容
        this.$template = this.$template.replace(replaceIncludeRegExp, '');
      }
    } else {
      /*node环境下执行*/
      try {
        const tmpl = fs.readFileSync(id, {
          encoding: 'UTF8'
        });

        this.$template = this.$template.replace(replaceIncludeRegExp, tmpl);

      } catch (e) {
        //找不到就清空原来的内容
        this.$template = this.$template.replace(replaceIncludeRegExp, '');
      }
    }
  });

  /*去掉重复的include*/
  includeTmpl = util.unique(this.$template.match(include));

  /*查找是否还有include的引入*/
  if (includeTmpl.length > 0) replaceInclude.call(this);

  /*清空错误的include*/
  this.$template = this.$template.replace(INCLUDE_ERROR, '');
}