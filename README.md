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

data : 可以设置模板中公用的数据可变动使用的数据
```javascript
...
{
	data:{
		a:1,
		b:2
	}
}

app.a // 1
app.b // 2

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
prop(el,propName) : 获取元素中对应的属性值，如果属性值前加上   bind-  ，则属性内部绑定的为js表达式

```html
<div bind-id="123 + 456"> 元素 </div>
```
```javascript
app.prop(div,'bind-id'); //返回 579
```

如果没有不添加绑定，则返回原来属性上的propValue,都是字符串类型

```html
<div id="123 + 456"> 元素 </div>
```
```javascript
app.prop(div,'bind-id'); //返回  "123 + 456"
```

ps:在绑定属性的中，this指向当前模板实例；

```html
<div bind-is-true="this.method()" id="el"> 元素 </div>
```
```javascript
new Tmpl({
	methods:{
		method:function(){
			console.log(true);
		}
	}
});

app.prop(div,'bind-is-true'); //  "true"
```

也可以一次获取多个属性的值
prop方法中传入一个数字，每个项对应的是el中的id

```javascript
app.prop(div,['bind-is-true','id']); // 返回 [true,"el"]
```

