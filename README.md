# Tmpl

更新时间：2017年6月26日11:50:23

## 构造对象 Tmpl

#### new Tepl(options)：

##### options中的参数

el : 绑定模板的script的id，在使用script模板的时候需要添加 "text/template"，如：

```html
<script id="temp" type="text/template">
</script>
```

open_tag : 模板绑定js的起始标签

close_tag : 模板绑定js的结束标签

methods : 模板中使用的方法

mounted : 模板加载完毕后调用的钩子

#### 实例方法：

on(bindClassName,eventType,fn) : 事件绑定为事件委托绑定，事件的绑定都绑定到className上，即className对应你绑定的事件方法，建议绑定的className前带上@好区分为模板事件，
on中的fn默认带回两个参数(event,el);

off(bindClassName,eventType,fn) : 移除事件，参数配置和on方法一样；




