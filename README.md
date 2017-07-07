# Tmpl

##### 更新时间：2017年7月4日09:21:38

支持IE5-IE11, EDGE , chrome , firefox

## 构造对象 Tmpl

#### new Tepl(options)：

##### options中的参数

#### 特别说明一下，在默认的模板中的上下文this都是指向当前模板的实例对象上，里面还有一个代理this的变量_this，为了在一个函数作用域内方便查找当前模板的实例this对象；

*************

##### el : 绑定模板的script的id，在使用script模板的时候需要添加 "text/template"，如：

```html
<script id="temp" type="text/template"></script>
```

##### open_tag : 模板绑定js的起始标签，默认为 “<%”

##### close_tag : 模板绑定js的结束标签，默认为 “%>”

下列事例为设置新的开闭合标签（没有什么特殊情况，不推荐更换这个，会出现一些意想不到的错误，主要是有些标签需要通过转义的正则才能使用）；

```html
<script id="temp" type="text/template">
...
{
	open_tag:"{{",
	close_tag:'}}'
}
</script>
```
*************

#### 有关模板的使用open\_tag和close\_tag内写js代码 <% js 代码 %> ，<%= data%>为输出的js代码，内部可以写js表达式，只能是表达式（自执行函数需要分多行编写，建议不写在一行内，会出现预测不到的结果）；

*************

##### data : 可以设置模板中公用的数据可变动使用的数据：
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

```html

<script type="text/template">
	<div><%= this.a %></div>
	<div><%= this.b %></div>
	<div><%= this.c %></div>		
	<div><%= this.d %></div>
</script>

<script>
	new Tmpl({
		data:{
			a:1,
			b:2,
			c:3,
			d:4
		}
	}).data(null).appendTo('app');
</script>

```
渲染后的结果

```html
<div id="app">
	<div>1</div>	
	<div>2</div>	
	<div>3</div>	
	<div>4</div>	
</div>
```
*************

##### 默认从外部传进去的数据只有一个顶层的data变量：

```html
<div id="app"></div>	
<script type="text/template" id="tmpl">
	<div><%= data.title %></div>
	<div><%= data.content %></div>
</script>

<script>
	new Tmpl({el:"tmpl"}).data({title:'我是标题'，content:"我是内容"}).appendTo('app');
</script>

```
渲染后的结果

```html
<div id="app">
	<div>我是标题</div>	
	<div>我是内容</div>
</div>
```

*************

##### methods : 模板中使用的方法

```html
<script>
...
{
	methods:{
		add:function(event,el){
			this.data(arr).appendTo("#app",function(){
				console.log('success');
			});
		}
	}
}
</script>
```

*************

##### events : 模板加载完毕后事件处理可以写在这里

```html
<script id="temp" type="text/template">
...
{
	events:function(){
		this.on('on-add','click',this.add);
		this.on('on-add','click',this.add);
		this.on('on-add1','click',this.add);
	}
}
</script>
```
*************

##### mounted : 模板加载完毕后调用的钩子函数，this指向实例对象；

*************

#### 实例方法：

**data(data)**:绑定数据到当前模板实例上，返回一个Data的实例对象，对象上有两个方法，appendTo和inserBefore,用来添加当前的数据模板到指定位置：

	appendTo(el,cb):把绑定的数据模板添加到指定的el的子节点上,cb为回调；
	inserBefore(el,ex,cb):把绑定的数据模板添加到指定的el的ex子节点前,cb为回调；

**on(bindClassName,eventType,fn)**: 事件绑定为事件委托绑定，事件的绑定都绑定到className上，即className对应你绑定的事件方法，建议绑定的className前带上on-好区分为模板事件，
on中的fn默认带回两个参数(event,el);

```javascript
app.on('on-add','click',this.add);
```

**off(bindClassName,eventType,fn)** : 移除事件，参数配置和on方法一样；对当前绑定委托事件移除对应的处理绑定
```javascript
app.off('on-add','click',this.add);
```

**bind(el,bindClassName)** : 某个元素的事件中的绑定

```javascript
app.bind(buttonEl,'on-add');
```

**unbind(el,bindClassName)** : 某个元素的事件中的绑定

```javascript
app.unbind(buttonEl,'on-add');
```

**replaceBind(el,bindClassName)** : 某个元素的事件中的绑定,第二个参数为对象，key为需要修改的key，value为替换的值

```javascript
app.replaceBind(buttonEl,{'on-add':'on-replaceAdd'}); // class="on-replaceAdd"
```


**attr(el,attrName)** : 获取元素中对应的属性值，如果属性值前加上   bind- ，则属性内部绑定的为js表达式,当前属性内的this指向当前调用的Tmpl实例对象：

```html
<div bind-id="123 + 456"> 元素 </div>
```
```javascript
app.attr(div,'bind-id'); //返回 579
```

如果没有不添加绑定，则返回原来属性上的attrValue,都是字符串类型

```html
<div id="123 + 456"> 元素 </div>
```

```javascript
app.attr(div,'id'); //返回  "123 + 456"
```

##### ps:在绑定属性的中，this指向当前模板实例；

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
app.attr(div,'bind-is-true'); //  "true"
```

也可以一次获取多个属性的值
attr方法中传入一个数字，每个项对应的是el中的id

```javascript
app.attr(div,['bind-is-true','id']); // 返回 [true,"el"]
```

attr方法中的attr参数如果为Object，则为设置的当前el中的attr

```javascript
app.attr(div,{id:"prop",class:"name"}); // 设置div中的id="prop",class="name"
```

prop方法，用于节点属性，即是绑定到el[prop]的属性；

**prop(el,prop)**:如果第二个参数为Object则为设置属性，如果第二个参数为字符串时，则为获取属性；和**attr**方法类似，使用bind-开头的属性，该属性内为js的表达式；

```javascript
app.prop(div,{id:"prop",class:"name",'bind-id':"'123'+1"}); 
// div['id'] =>'prop'
// div['class']=>"name"
// div['bind-id'] => 1231
```

**html(el,string)**:设置el中的innerHTML，如果不传参数，为获取innerHTML；

```html
app.html(el,'123'); // 设置innerHTML <div>123</div>

app.html(el); // 123

```

**val(el,string)**:设置el中的value，如果不传参数，为获取value；

```html
app.val(el,'123'); // 设置value el.value === '123' //true
app.val(el); // 返回 123
```

**text(el,text)**:设置el中的textContent，如果不传参数，为获取textContent；

```html
app.text(el,'123'); // 设置value el.textContent === '123' //true
app.text(el); // 返回 123
```

**parent(el,hasClassName)**:获取父节点，如果第二参数为className，则查询第一个找到匹配的父类的节点；

```html
<div class="parentClass">
	<div class="parent">
		<div>el</div>
	</div>
</div>
```
```javascript
app.parent(el,'parentClass');  //返回查找到parentClass的父级节点
app.parent(el);  //返回el的父级节点
```

**parents(el,hasClassName)**:获取父节点，如果第二参数为className，则查询找到匹配的所有父类的节点；

```html
<div class="parentClass">
	<div class="parentClass">
		<div>el</div>
	</div>
</div>
```
```javascript
app.parents(el,'parentClass');  //返回查找到所有存在parentClass的父级节点
```


**children(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
</div>
```
```javascript
app.children(el);  //返回[el1,el2,el3]
```

**childrens(el,className)**:获取el的后代符合存在className节点

```html
<div class="el">
	<div class="child">
		<div class="child">
			<div class="child">
				<div class="child"></div>
			</div>
		</div>	
	</div>
</div>
```
```javascript
app.children(el,'child');  
//返回[div.child,div.child,div.child]
```

**next(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
</div>
```
```javascript
app.next(el1);  //返回 el2
```

**nextAll(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
</div>
```
```javascript
app.nextAll(el1);  //返回  [el2,el3]
```


**prev(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
</div>
```
```javascript
app.prev(el2);  //返回 el1
```

**prevAll(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
</div>
```
```javascript
app.prevAll(el3);  //返回  [el1,el2]
```

**siblings(el)**:获取el的子节点

```html
<div class="el">
	<div>el1</div>
	<div>el2</div>
	<div>el3</div>
	<div>el4</div>
	<div>el5</div>
	<div>el6</div>
</div>
```
```javascript
app.siblings(el3);  //返回  [el1,el2,el4,el5,el6]
```

**show(el)**：显示el，设置display为初始值

**hide(el)**：隐藏el，设置display为'none'

**remove(el)**：删除节点


#### 一些常用的方法：

在tmpl的实例中，可以使用.fn中的方法

**.isArr(array)**:检测是否为数组，返回true/false;

**.isObj(object)**:检测是否为对象，返回true/false;

**.isFn(fn)**:检测是否为函数，返回true/false;

**.isStr(string)**:检测是否为字符串，返回true/false;

**.isNum(number|string)**:检测是否为数字，返回true/false;

**.each(eachObj,handler)**:遍历器，handler中两个参数，第一个为获取到遍历的值，第二个为index/key;

**.extend(obj1,obj2)**:合并两个obj对象，返回一下合并的对象;





