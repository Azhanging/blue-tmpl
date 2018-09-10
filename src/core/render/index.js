/*
 *  Render代理实例,针对tmpl中的数据流
 * */

//运行环境是否在浏览器
import inBrowser from '../in_browser';

class Render {
  constructor(opts) {
    this.init(opts);
  }

  /*
  * 初始render类
  * */
  init(opts) {

    this.tmpl = opts.tmpl;

    this.state = opts.state || {};

    this.template = new Function('tmpl', this.tmpl.vTmpl).apply(this.state, [this.tmpl]);

    inBrowser ? (this.fragment = this.tmpl.create(this.template)) : null;

  }

  //在父节点中插入解析后的模板
  appendTo(el, cb) {

    const tmpl = this.tmpl,
      util = tmpl.util;

    if (el.nodeType === 1) el.appendChild(this.fragment);

    else tmpl.getEl(el).appendChild(this.fragment);

    util.cb(cb, this.tmpl);

    return tmpl;
  }

  //在el子节点ex中插入解析后的模板
  insertBefore(el, ex, cb) {

    const tmpl = this.tmpl,
      util = tmpl.util,
      _el = el.nodeType === 1 ? el : tmpl.getEl(el),
      _ex = el.nodeType === 1 ? ex : tmpl.getEl(ex);

    _el.insertBefore(this.fragment, _ex);

    util.cb(cb, tmpl);

    return tmpl;
  }
}

export default Render;