# Tmpl

更新时间：2017-6-26 23:01:35

支持IE5-IE11 , chrome , firefox

## 构造对象 Tmpl

#### new Tepl(options)：

##### options中的参数

el : 绑定模板的script的id，在使用script模板的时候需要添加 "text/template"，如：

```html
<script id="temp" type="text/template"></script>
```

open_tag : 模板绑定js的起始标签

close_tag : 模板绑定js的结束标签

```html
<script id="temp" type="text/template">
	...
	{
		open_tag:"{{",
		close_tag:'}}'
	}
</script>
```

methods : 模板中使用的方法

```html
<script id="temp" type="text/template">
	...
	{
		methods:{
			add:function(event,el){
				el.setAttribute('value',++el.value);
				var arr = [];
				for(var i = 0;i<50;i++){
					arr.push(Math.random());
				}
				this.appendTo("#app", arr ,function(){
					console.log('success');
				});
				this.unbind(el,'@add');
			},
			mouse : function(){
				console.log('mouse');
			}
		}
	}
</script>
```

events : 模板加载完毕后事件处理可以写在这里

```html
<script id="temp" type="text/template">
	...
	{
		events:function(){
			this.on('@add','click',this.add);
			this.on('@add','click',this.add);
			this.on('@add1','click',this.add);
		}
	}
</script>
```


mounted : 模板加载完毕后调用的钩子

#### 实例方法：

on(bindClassName,eventType,fn) : 事件绑定为事件委托绑定，事件的绑定都绑定到className上，即className对应你绑定的事件方法，建议绑定的className前带上@好区分为模板事件，
on中的fn默认带回两个参数(event,el);

```javascript
app.on('@add','click',this.add);
```

off(bindClassName,eventType,fn) : 移除事件，参数配置和on方法一样；对当前绑定委托事件移除对应的处理绑定
```javascript
app.off('@add','click',this.add);
```

bind(el,bindClassName) : 某个元素的事件中的绑定

```javascript
app.bind(buttonEl,'@add');
```

unbind(el,bindClassName) : 某个元素的事件中的绑定

```javascript
app.unbind(buttonEl,'@add');
```



