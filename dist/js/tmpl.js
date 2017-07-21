/**
*
*
* tmpl.js v1.0.2
* (c) 2016-2017 Blue
* https://github.com/azhanging/tmpl
* Released under the MIT License.
*
*
**/
!function(t,n){"function"==typeof _require?_require.defineId("tmpl",n):t?t.Tmpl=n():{}}("undefined"!=typeof window?window:this,function(){function t(){}function n(t){this.init(t)}function e(t){this.config=this.fn.extend(this.fn.copy(T),t),this.init()}function i(t,n,e){var i=t.className.split(" ");if(!this.fn.isObj(n)||"replaceBind"!=e&&"replaceClass"!=e)for(var n=n.split(" "),r=0;r<n.length;r++){var s=i.indexOf(n[r]);"bind"==e||"addClass"==e?s==-1&&i.push(n[r]):"unbind"!=e&&"removeClass"!=e||s!=-1&&i.splice(s,1)}else this.fn.each(n,function(t,n){var e=i.indexOf(n);e!=-1&&(i[e]=t)});return t.className=i.join(" "),this}function r(t,n,e){var i=this;this.fn.on(t,n,function(t){var e=t||window.event,r=e.target||e.srcElement,s=i.events[n];i.fn.each(s,function(t,n){i.hasClass(r,n)&&i.fn.each(t,function(t,n){t.apply(i,[e,r])})})}),this.eventType.push(n)}function s(){this.fn.isObj(this.config.router)&&(this.router=this.config.router)}function a(){this.events={},this.eventType=[]}function l(t){var n=this,e=this.config[t];this.fn.isObj(e)&&this.fn.each(e,function(t,e){n[e]=t})}function o(t){var n="\\/*.?+$^[](){}|'\"";return this.fn.each(n,function(n,e){t=t.replace(new RegExp("\\"+n,"g"),"\\"+n)}),t}function u(){var t=o.call(this,this.config.open_tag),n=o.call(this,this.config.close_tag);d=new RegExp(t+"[^=][\\s\\S]*?"+n+"|"+t+"=[\\s\\S]*?"+T.close_tag,"g"),m=new RegExp(t+"=[\\s\\S]*?"+n,"g"),v=new RegExp(t+"=","g"),g=new RegExp(t,"g"),y=new RegExp(n,"g"),_=/[\\\b\\\t\\\r\\\f\\\n]/g,b=/"/g,E=/<tmpl name=(\'|\")(\S*?)\1.*?>[\s\S]*?<\/tmpl>/g,C=/<tmpl\s*?>[\s\S]*?<\/tmpl>/g}function h(){c.call(this);var t=this.template.match(d),n=this.template.match(m),e=f.call(this),i=e.split(/___SCRIPT___|___ECHO_SCRIPT___/),r=[];t||(t=[]),n||(n=[]);var s=i.length>t.length?i:t;this.fn.each(i,function(t,n){i[n]='___.push("'+p(t)+'");'}),this.fn.each(t,function(n,e){m.lastIndex=0,m.test(n)?t[e]=n.replace(v,"___.push(").replace(y,");"):t[e]=n.replace(g,"").replace(y,"")}),this.fn.each(s,function(n,e){"string"==typeof i[e]&&r.push(i[e]),"string"==typeof t[e]&&r.push(t[e].replace(_,""))}),this.dom="var _this = this,___ = [];"+r.join("")+'return ___.join("");'}function c(){var t,n,e=this;this.template=this.template.replace(C,""),t=this.fn.unique(this.template.match(E)),n=t.toString().replace(E,"$2").split(","),0!==t.length&&0!==this.fn.clearNull(n).length&&t.length>0&&n.length>0&&n.length===t.length&&(this.fn.each(n,function(n,i){var r=e.fn.getEl(n),s=new RegExp(o.call(e,t[i]),"g");r?e.template=e.template.replace(s,e.html(r)):e.template=e.template.replace(s,"")}),t=this.fn.unique(this.template.match(E)),t.length>0&&c.call(this))}function f(){var t=this.template.replace(m,"___ECHO_SCRIPT___").replace(d,"___SCRIPT___");return t}function p(t){return t.replace(_,"").replace(b,'\\"')}var d,m,v,g,y,_,b,E,C,T={open_tag:"<%",close_tag:"%>",template:"",data:{},methods:{}};return t.prototype={isArr:function(t){return t instanceof Array},isObj:function(t){return t instanceof Object&&!(t instanceof Array)&&null!==t},isFn:function(t){return"function"==typeof t},isStr:function(t){return"string"==typeof t},isNum:function(t){return"number"==typeof t||/^\d*(\.\d*)?$/.test(t)},isEl:function(t){return t&&t.nodeType},on:function(){return"function"==typeof document.addEventListener?function(t,n,e){t.addEventListener(n,e,!1)}:function(t,n,e){t.attachEvent("on"+n,e)}}(),off:function(){return"function"==typeof document.removeEventListener?function(t,n,e){t.addEventListener(n,e,!1)}:function(t,n,e){t.detachEvent("on"+n,e)}}(),each:function(t,n){var e=0,i=t.length;if(this.isArr(t))for(;e<i;e++)n(t[e],e);else for(e in t)t.hasOwnProperty(e)&&n(t[e],e)},getEl:function(t){if(!t)return null;if(!this.isFn(document.querySelector))return document.getElementById(t);var n=document.querySelector(t),e=document.getElementById(t);return null!==n?n:e?e:null},getEls:function(t){if(!t)return null;if(!this.isFn(document.querySelectorAll))return document.getElementsByClassName(t);var n=document.querySelectorAll(t),e=document.getElementsByClassName(t);return n.length>0?n:e?e:[]},extend:function(t,n){return this.each(n,function(n,e){t[e]=n}),t},cb:function(t,n,e){e=e?e:[],this.isFn(t)?t.apply(n,e):null},run:function(t,n,e){this.cb(t,n,e)},unique:function(t){if(!this.isArr(t))return[];var n=[];return this.each(t,function(t,e){n.indexOf(t)===-1&&n.push(t)}),n},clearNull:function(t){var n=[];return this.each(t,function(t,e){""!==t&&n.push(t)}),n},copy:function(t){return this.isObj(t)||this.isArr(t)?JSON.parse(JSON.stringify(t)):null},ajax:function(t){var n=this,e=new XMLHttpRequest;t.type=t.type?t.type.toUpperCase():"GET","GET"===t.type?e.open(t.type,function(){return t.url.indexOf("?")?t.url+n.serialize(t.data):t.url+"?"+n.serialize(t.data)}(),t.async):"POST"===t.type&&e.open(t.type,t.url,t.async),e.setRequestHeader("Content-Type",t.contentType?t.contentType:"application/x-www-form-urlencoded; charset=UTF-8"),e.addEventListener("readystatechange",function(){var i=JSON.parse(e.responseText);4==e.readyState&&(200==e.status?n.isFn(t.success)?t.success(i):null:e.status>=400&&(n.isFn(t.error)?t.error(i):null))},!1),"GET"===t.type?e.send():"POST"===t.type&&e.send(this.serialize(t.data))},serialize:function(t){var n="";for(var e in t)t.hasOwnProperty(e)&&(n=n+e+"="+encodeURIComponent(t[e])+"&");return n.substring(0,n.length-1)}},function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(t){for(var n=0,e=this.length;n<e;n++)if(this[n]===t)return n;return-1}),document.getElementsByClassName||(document.getElementsByClassName=function(t,n){for(var e=(n||document).getElementsByTagName("*"),i=new Array,r=0;r<e.length;r++)for(var s=e[r],a=s.className.split(" "),l=0;l<a.length;l++)if(a[l]==t){i.push(s);break}return i})}(),n.prototype={constructor:n,init:function(t){this.tmpl=t.tmpl,this.data=t.data,this.dom=new Function("data",this.tmpl.dom).apply(this.tmpl,[this.data]),this.fragment=this.setDom()},setDom:function(){return this.tmpl.create(this.dom)},appendTo:function(t,n){var e=this.tmpl.fn;return 1===t.nodeType?t.appendChild(this.fragment):e.getEl(t).appendChild(this.fragment),e.cb(n,this.tmpl),this.tmpl},insertBefore:function(t,n,e){var i=this.tmpl.fn;return i.getEl(t).insertBefore(this.fragment,n),i.cb(e,this.tmpl),this.tmpl}},e.install=function(t){t.install(this)},e.prototype={constructor:e,init:function(){this.fn.run(this.config.created,this),this.el=this.fn.getEl(this.config.el),l.call(this,"methods"),l.call(this,"data"),s.call(this),this.el&&(this.template=this.el.innerHTML,this.config.template=this.el.innerHTML,u.call(this),h.call(this)),a.call(this),this.fn.run(this.config.events,this),this.fn.run(this.config.mounted,this)},data:function(t){var e=this;return new n({tmpl:e,data:t})},update:function(){this.template=this.config.template,h.call(this)},on:function(t,n,e,i){if(4===arguments.length)return this.eventType.indexOf(e)==-1&&r.apply(this,[t,e,i]),this.events[e]||(this.events[e]={}),this.events[e][n]||(this.events[e][n]=[]),this.events[e][n].push(i),this;if(3===arguments.length){var s=this;return i=e,e=n,this.fn.on(t,e,function(t){i.call(s,t)}),this}},router:function(t){this.router[t.path]=t.content},off:function(t,n,e,i){if(4===arguments.length){var r=this.events[e][n].indexOf(i);r!=-1&&this.events[e][n].splice(r,1)}else 3===arguments.length&&this.fn.off(t,e,i);return this},fn:new t,bind:function(t,n){return i.apply(this,[t,n,"bind"]),this},unbind:function(t,n){return i.apply(this,[t,n,"unbind"]),this},replaceBind:function(t,n){return i.apply(this,[t,n,"replaceBind"]),this},addClass:function(t,n){return i.apply(this,[t,n,"addClass"]),this},removeClass:function(t,n){return i.apply(this,[t,n,"removeClass"]),this},replaceClass:function(t,n){return i.apply(this,[t,n,"replaceClass"]),this},hasClass:function(t,n){try{for(var e=t.className.split(" "),i=n.split(" "),r=0,s=0;s<i.length;s++)e.indexOf(i[s])!==-1&&++r;return r===i.length}catch(a){return!1}},attr:function(t,n){var e=this;if(this.fn.isObj(n))return this.fn.each(n,function(n,e){"boolean"==typeof n?(t[e]=n,t.setAttribute(e,n)):""===n?t.removeAttribute(e):t.setAttribute(e,n)}),this;if(n instanceof Array){var i=[];return this.fn.each(n,function(n,r){i.push(e.attr(t,n))}),i}return/^bind-\S*/.test(n)?new Function("return "+t.getAttribute(n)+";").apply(this):t.getAttribute(n)},prop:function(t,n){return this.fn.isObj(n)?(this.fn.each(n,function(n,e){t[e]=n}),this):this.fn.isStr(n)?/^bind-\S*/.test(n)?new Function("return "+t[n]+";").apply(this):t[n]:void 0},html:function(t,n){return void 0===n?t.innerHTML:(t.innerHTML=n,this)},val:function(t,n){return void 0===n?t.value:(t.value=n,this)},text:function(t,n){return void 0===n?t.textContent:(t.textContent=n,this)},parent:function(t,n){var e=t.parentNode;return e===document||null===e?null:n?this.hasClass(e,n)?e:this.parent(e,n):e},parents:function(t,n,e){var i=t.parentNode;return e=e?e:[],i===document||null===i?null:(this.hasClass(i,n)&&e.push(i),this.parents(i,n,e),e)},children:function(t){var n=[];return this.fn.each(t.childNodes,function(t){1===t.nodeType&&n.push(t)}),n},childrens:function(t,n,e){var i=0;for(e=e?e:[];i<t.children.length;i++)this.hasClass(t.children[i],n)&&e.push(t.children[i]),this.childrens(t.children[i],n,e);return e},hasId:function(t){return!!this.fn.getEl(t)},next:function(t){var n=t.nextSibling;return null===n?null:1!==n.nodeType?this.next(n):n},nextAll:function(t){return this.siblings(t,"nextAll")},prevAll:function(t){return this.siblings(t,"prevAll")},prev:function(t){var n=t.previousSibling;return null===n?null:1!==n.nodeType?this.prev(n):n},siblings:function(t,n){var e=this.parent(t);if(null===e)return null;var i=e.children,r=[],s=0;for("nextAll"===n&&(s=Array.prototype.indexOf.call(i,t));s<i.length;s++)if(i[s]!==t&&r.push(i[s]),"prevAll"===n&&i[s]===t)return r;return r},show:function(t,n){return t.style.display="",this.animate(t,"show",n),this},hide:function(t,n){return t.style.display="none",this.animate(t,"hide",n),this},toggle:function(t){""===t.style.display?this.hide(t):this.show(t)},animate:function(t,n,e){var i=.1;if("show"===n?opacity=0:"hide"===n&&(opacity=1,i=-.1),this.fn.isNum(e)){t.style.opacity=0;var e=setInterval(function(){1==t.style.opacity?clearInterval(e):t.style.opacity=parseFloat(t.style.opacity)+i},e/60)}},remove:function(t){try{t.remove()}catch(n){var e=this.parent(t);null!==e?e.removeChild(t):console.warn("element remove error!")}return this},create:function(t){var n=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=t;0!==e.childNodes.length;){var i=e.childNodes[0],r=i.innerHTML;if("SCRIPT"===i.tagName){var s=document.createElement("script");s.innerHTML=r,this.fn.each(i.attributes,function(t){s.setAttribute(t.name,t.value)}),this.remove(i),i=s}n.appendChild(i)}return n},append:function(t,n){return 1===t.nodeType?t.appendChild(n):this.fn.getEl(t).appendChild(n),this},cb:function(t){return this.fn.cb(t,this),this},preventDefault:function(t){var n=t||window.event;n.stopPropagation(),n.cancelBubble=!0}},e.version="v1.0.2",e});