import utils from '../../utils';

const bindName = 'bind-';

const regBindName = /^bind-(.*?)/g;

//数据绑定相关
class Bind {

  constructor(opts = { tmpl: {} }) {
    this.tmpl = opts.tmpl;
  }

  get(el, bindName) {
    if (!utils.isEl(el)) return false;
    return el.bind[bindName];
  }

  set(el, bind) {
    if (!utils.isEl(el) || !utils.isPlainObject(bind)) return false;
    utils.each(bind, (_bind, key) => {
      el.bind[key] = _bind;
    });
  }

  setTmpl(tmpl){
    this.tmpl = tmpl;
  }

  update(el) {
    const bindElms = el.querySelectorAll('*');
    [].forEach.call(bindElms, (bindElm) => {
      if (!bindElm.bind) bindElm.bind = {};
      [].forEach.call(bindElm.attributes, (attr) => {
        const name = attr.name;
        if (regBindName.test(name)) {
          const attrVal = new Function(`with(this){return ${attr.value}}`).call(this.tmpl);
          bindElm.bind[name.replace(regBindName, '$1')] = attrVal;
          bindElm.removeAttribute(name);
        }
      });
    });
  }
}

const bind = new Bind();

export default bind;