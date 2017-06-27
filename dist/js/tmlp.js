/**
*
*
* tmpl.js v1.0.0
* (c) 2016-2017 Blue
* Released under the MIT License.
*
*
**/
!function(n,t){"function"==typeof _require?_require.define("tmpl",t):n?n.Tmpl=n.tmpl=t():{}}("undefined"!=typeof window?window:this,function(){function n(){}function t(t){this.config=s.call(this,w,t),this.el=(new n).getEl(t.el),this.template=this.el.innerHTML,c.call(this),e.call(this)}function e(){a.apply(this),r.call(this),o.call(this),u(this.config.events)?this.config.events.apply(this):null,u(this.config.mounted)?this.config.mounted.apply(this):null}function i(n,t){var e=this;this.handler.on(n,function(t){var i=t.target||window.event.srcElement,o=e.events[n];e.handler.each(o,function(n,o){i.className&&Array.prototype.indexOf.call(i.className.split(" "),o)!=-1&&e.handler.each(n,function(n,o){n.apply(e,[t,i])})})}),this.eventType.push(n)}function o(){this.events={},this.eventType=[]}function r(){var n=this.config.methods,t=this;f(n)&&this.handler.each(n,function(n,e){t[e]=n})}function c(){var n=this.config.open_tag,t=this.config.close_tag;d=new RegExp(n+"[^=][\\s\\S]*?"+t+"|"+n+"=[\\s\\S]*?"+w.close_tag,"g"),_=new RegExp(n+"=[\\s\\S]*?"+t,"g"),g=new RegExp(n+"=","g"),v=new RegExp(n,"g"),m=new RegExp(t,"g"),y=/[\\\b\\\t\\\r\\\f\\\n]/g,E=/"/g}function s(n,t){return this.handler.each(t,function(t,e){n[e]=t}),n}function a(){var n=this.template.match(d),t=(this.template.match(_),h.call(this)),e=t.split(/___SCRIPT___|___ECHO_SCRIPT___/),i=[],o=e.length>n.length?e:n;this.handler.each(e,function(n,t){e[t]='___.push("'+l(n)+'");'}),this.handler.each(n,function(t,e){_.lastIndex=0,_.test(t)?n[e]=t.replace(g,"___.push(").replace(m,");"):n[e]=t.replace(v,"").replace(m,"")}),this.handler.each(o,function(t,o){"string"==typeof e[o]&&i.push(e[o]),"string"==typeof n[o]&&i.push(n[o])}),this.dom="var ___ = [];"+i.join("")+'return ___.join("");'}function h(){var n=this.template.replace(_,"___ECHO_SCRIPT___").replace(d,"___SCRIPT___");return n}function l(n){return n.replace(y,"").replace(E,'\\"')}function u(n){return"function"==typeof n}function f(n){return n instanceof Object&&!(n instanceof Array)&&null!==n}function p(n){return n instanceof Array}var d,_,g,v,m,y,E,w={open_tag:"<%",close_tag:"%>"};return n.prototype={on:function(){return"function"==typeof document.addEventListener?function(n,t){document.addEventListener(n,t,!1)}:function(n,t){document.attachEvent("on"+n,t)}}(),bind:function(n,t,e){for(var t=t.split(" "),i=n.className.split(" "),o=0;o<t.length;o++){var r=i.indexOf(t[o]);"bind"==e?r==-1&&i.push(t[o]):r!=-1&&i.splice(r,1)}n.className=i.join(" ")},each:function(n,t){var e=0,i=n.length;if(p(n))for(;e<i;e++)t(n[e],e);else for(e in n)n.hasOwnProperty(e)&&t(n[e],e)},getEl:function(n){if(document.querySelector){var t=document.querySelector(n);return null!==t?t:document.getElementById(n)}return document.getElementById(n)},prop:function(n,t){return new Function("return "+n.getAttribute(t)+";")}},function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(n){for(var t=0,e=this.length;t<e;t++)if(this[t]===n)return t;return-1})}(),t.prototype={appendTo:function(n,t,e){var i=document.createDocumentFragment(),o=document.createElement("div");for(o.innerHTML=new Function("data",this.dom).apply(this,[t]);0!==o.childNodes.length;)i.appendChild(o.childNodes[0]);this.handler.getEl(n).appendChild(i),u(e)?e.apply(this):null},on:function(n,t,e){this.eventType.indexOf(t)==-1&&i.apply(this,[t,e]),this.events[t]||(this.events[t]={}),this.events[t][n]||(this.events[t][n]=[]),this.events[t][n].push(e)},off:function(n,t,e){var i=this.events[t][n].indexOf(e);i!=-1&&this.events[t][n].splice(i,1)},handler:new n,bind:function(n,t){this.handler.bind(n,t,"bind")},unbind:function(n,t){this.handler.bind(n,t,"unbind")}},t.version="v1.0.0",t});