/**
*
*
* tmpl-router.js v1.0.0
* (c) 2016-2017 Blue
* https://github.com/azhanging/tmpl
* Released under the MIT License.
*
*
**/
!function(t,n){"function"==typeof _require?_require.define("tmpl-router",n):t?t.TmplRouter=n():{}}("undefined"!=typeof window?window:this,function(){function t(t){this.init(t)}function n(){var t=this;window.hasTmplRouter||r.on(window,"hashchange",function(n){window.location.hash;t.hashChange(),s.preventDefault(n)})}function i(t){var n=this,i=this.config[t];r.isObj(i)&&r.each(i,function(t,i){n[i]=t})}var e={routerLink:"tmpl-router",activeClassName:"tmpl-router-active",data:{},methods:{}},o=null,s=null,r=null;return t.install=function(n){return this.installed?t:(this.installed=!0,o=n,s=new o({}),void(r=s.fn))},window.Tmpl&&t.install(Tmpl),t.prototype={constructor:t,init:function(t){this.config=r.extend(r.copy(e),t),this.router=this.config.router?this.config.router:{},this.tmpl=s,i.call(this,"methods"),i.call(this,"data"),n.call(this),r.run(this.config.mounted,this)},set:function(t){var n=this;return r.isObj(t)&&r.each(t,function(t,i){n.router[i]=function(i){t.apply(n,i)}}),this},hashChange:function(){var t=this,n=window.location.hash,i=r.getEls(this.config.routerLink),e=null;return 0===i.length?this:void r.each(i,function(i,o){var a=s.attr(i,"href"),l=s.attr(i,"view"),h=null,u=null;a===n?(u=r.getEl(l),e=i,s.addClass(i,t.config.activeClassName),s.show(u),h=t.router[n],r.isFn(h)&&h.apply(t,[i,u])):(s.removeClass(i,t.config.activeClassName),s.hide(r.getEl(l)))})}},t.version="v1.0.0",t});