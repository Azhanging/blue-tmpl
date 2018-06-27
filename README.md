## Blue-Tmpl

blue-tmpl 可以使用在浏览器以及nodejs环境，可以作为nodejs框架express 或 koa2 的view engine使用；在浏览器中可以作为解析模板使用；

在koa2和express使用参考blue-tmpl-views的npm包的使用
https://www.npmjs.com/package/blue-tmpl-views

global
```javascript
new BlueTmpl(opts)
```


demand module , _require module:
```javascript
_require('blue-tmpl')
demand('blue-tmpl');
```
CommonJS module:
```javascript
require('blue-tmpl')
````


##### update date：2018-1-31 14:34:38

支持IE8-EDGE , chrome , firefox

## 构造对象 BlueTmpl

#### new BlueTmpl(options)：

##### 特别说明一下，在默认的模板中的上下文this都是指向当前模板的实例对象上，里面还有一个代理this的变量_this_，为了在一个函数作用域内方便查找当前模板的实例this对象；

****

#### Static Methods：

**BlueTmpl.install(constructor):** install plugin

**BlueTmpl.setAlias({Object}):** set alias constant , replace in template alias constant value , key:constant name, value:constant value , set alias add in BlueTmpl.alias ，多层的对象将会解析成 用 '.' 链接的key；

*******

#### options中的参数：

##### 支持tmpl引入

在模板用可以使用

```html
<script type="text/template" id="tmpl">
	<tmpl name="tmpl1"></tmpl>
</script>
<script type="text/template" id="tmpl1">
	<div>
		123
		<tmpl name="tmpl2"></tmpl>
	</div>
</script>
<script type="text/template" id="tmpl2">
	<div>456</div>
</script>
```
來嵌入模板，name指向引入模板的id，如果id不存在则无视引入（可以在引入模块中引入别的模块，但是有一点需要注意，可能存在循环引入，tm1引入tm2,tm2引入tm1，这样会出现死循环，需要注意）；

生成为：
```html
<script type="text/template" id="tmpl">
	<div>
		123
		<div>456</div>
	</div>
</script>
```



**动态模板**：
默认模板中的```<tmpl-include name="tmplId"></tmpl-include>```
中引入是不存在的，会被忽略掉，可以动态添加原来插入不存在的模板，
使用实例方法update更新模板即可，更新后的是存在
```<tmpl-include name="tmplId"></tmpl-include>```中找到的动态模块。

**************

#### PS：nodejs中的用法，不需要包含script；
只能作为解析模板内容，对应的BlueTmpl中有关dom的方法无法使用：
（nodejs环境中的```tmpl-include```是使用file来索引文件的地址，
在nodejs环境中使用了```tmpl-include[name]```来索引文件地址是不不做任何的处理的，
同理在浏览器环境中，```tmpl-include[file]``` 也是不做任何处理的，
需要区分两个环境的使用）；

在**nodejs**环境中使用，```<tmpl-include file="path"></tmpl-include>```，
name指向模板的路径。也可以使用<tmpl-block name="block-name"></tmpl-block>来包含一个extend的文件，
```<tmpl-extend file="extend.tmpl" />```。
如果索引的block是不存在的，会使用base中的block块默认的内容。
也可使用append:加到block的name中，这样设置的节点为在默认内容后插入。

```html
<!--extend.tmpl-->
<html>
  <body>
  	<header>
    	<tmpl-block name="header">
    		<div>假设这个block是不存在的，这里就会显示出来</div>
    	</tmpl-block>	
    </header>
    <main>
    	<tmpl-block name="main">
    		<div>假设这个block是不存在的，这里就会显示出来</div>
    	</tmpl-block>	
    </main>
  </body>
</html>
```

```html
<!--include.tmpl-->
<div>
  include content
</div>
```

```html
<!--index.tmpl-->
<tmpl-extends file="extends.tmpl"></tmpl-extends> <!--设置包含当前tmpl的文件-->

<tmpl-block name="header">
	<div>
    	我是header的内容
  	</div>
</tmpl-block>

<tmpl-block name="main">
	<div>
    	我是main的内容
  	</div>
  <tmpl-include file="include.tmpl"/>
</tmpl-block>

```

```html
<!--这是解析的内容-->
<html>
  <body>
  	<header>
    	<div>
    		我是header的内容
  		</div>
    </header>
    <main>
    	<div>
            我是main的内容
        </div>
        <div>
          include content
        </div>
    </main>
  </body>
</html>
```

*************

##### template : 绑定模板的script的id，在使用script模板的时候需要添加 "text/template"，如：

```html
<script id="temp" type="text/template"></script>
```

##### open_tag : 模板绑定js的起始标签，默认为 “<%”

##### close_tag : 模板绑定js的结束标签，默认为 “%>”

下列事例为设置新的开闭合标签（没有什么特殊情况，不推荐更换这个，
会出现一些意想不到的错误，
主要是有些标签需要通过转义的正则才能使用）；



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

#### 有关模板的使用open\_tag和close\_tag内写js代码 <% js 代码 %> ，<%= jscode %>为输出的js代码，<%- js代码 %> 转义的代码（如html的转义）内部可以写js表达式，只能是表达式（自执行函数需要分多行编写，建议不写在一行内，会出现预测不到的结果）；



*************

##### data : 可以设置模板中公用的数据可变动使用的数据：
```javascript
new BlueTmpl({
    data:{
        a:1,
        b:2
    }
})

app.a // 1
app.b // 2
```

```html

<script type="text/template">
	<div><%= _this_.a %></div>
	<div><%= _this_.b %></div>
	<div><%= _this_.c %></div>		
	<div><%= _this_.d %></div>
</script>

<script>
	new BlueTmpl({
		data:{
			a:1,
			b:2,
			c:3,
			d:4
		}
	}).render(null).appendTo('app');
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

```html
<div id="app"></div>	
<script type="text/template" id="tmpl">
	<div><%= title %></div>
	<div><%= content %></div>
</script>

<script>
	new BlueTmpl({template:"tmpl"}).render({title:'我是标题'，content:"我是内容"}).appendTo('app');
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

async：模板的状态，设置为false为非异步模块，针对动态模板使用，在使用tmpl-router的时候为（必填）

*************

##### methods : 模板中使用的方法

```html
<script>
...
{
	methods:{
		add:function(event,el){
			this.render(arr).appendTo("#app",function(){
				console.log('success');
			});
		}
	}
}
</script>
```

*************

### 钩子函数：

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
##### mounted : 模板加载完毕后调用的钩子函数，this指向实例对象；

```html
<script id="temp" type="text/template">
...
{
	mounted:function(){
		console.log('success!');
	}
}
</script>
```

*************

#### 实例方法：

**render({data})**:绑定数据到当前模板实例上，返回一个Render类的实例对象，对象上有两个方法，appendTo和inserBefore,用来添加当前的数据模板到指定位置：appendTo(el,cb):把绑定的数据模板添加到指定的el的子节点上,cb为回调；inserBefore(el,ex,cb):把绑定的数据模板添加到指定的el的ex子节点前,cb为回调；

属性：template为解析完毕的dom string

*****

**on(bindEl[,bindClassName],eventType,fn)**: 事件绑定为事件委托绑定，事件的绑定都绑定到className上，即className对应你绑定的事件方法，建议绑定的className前带上on-好区分为模板事件，
on中的fn默认带回两个参数(event,el);

```javascript
app.on('on-add','click',this.add);
```

**off(bindEl[,bindClassName],eventType,fn)**: 移除事件，参数配置和on方法一样；对当前绑定委托事件移除对应的处理绑定
```javascript
app.off('on-add','click',this.add);
```

*******

**bind(el,bindClassName)**: 某个元素的事件中的绑定

```javascript
app.bind(buttonEl,'on-add');
```

**unbind(el,bindClassName)**: 某个元素的事件中的绑定

```javascript
app.unbind(buttonEl,'on-add');
```

**replaceBind(el,bindClassName)**: 某个元素的事件中的绑定,第二个参数为对象，key为需要修改的key，value为替换的值

******

```javascript
app.replaceBind(buttonEl,{'on-add':'on-replaceAdd'}); // class="on-replaceAdd"
```

**addClass(el,bindClassName)**: 某个元素的事件中的绑定

```javascript
app.addClass(buttonEl,'className className');
```

**removeClass(el,bindClassName)**: 某个元素的事件中的绑定

```javascript
app.removeClass(buttonEl,'className className');
```

**replaceClass(el,bindClassName)**: 某个元素的事件中的绑定,第二个参数为对象，key为需要修改的key，value为替换的值

```javascript
app.replaceClass(buttonEl,{'className':'newClassName'}); // class="on-replaceAdd"
```

**hasClass(el,className)**：el元素中是否存在对应的className。返回true || false;

******

**attr(el,attrName)**: 获取元素中对应的属性值，如果属性值前加上   bind- ，则属性内部绑定的为js表达式,当前属性内的this指向当前调用的BlueTmpl实例对象：

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
new BlueTmpl({
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

*****

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

******

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

******

**append(el,child)**：给节点插入子节点

**show(el)**：显示el，设置display为初始值

**hide(el)**：隐藏el，设置display为'none'

**toggle(el)**：切换el状态

**remove(el)**：删除节点

**create(elString)**：创建一个新的节点，参数为一个节点字符串，返回一个节点文档对象,最外层的script的会被重新包装好，可允许的script；

**update()**：更新模板，主要是使用在动态模板中使用；具体查看<tmpl-include></tmpl-include>的用法

**cb(fn)**：设置回调函数执行；

**preventDefault(fn)**：取消冒泡事件

**offset(el)**：获取当前元素对应到页面顶部的高度

**setScrollTop(topNumber)**：设置scroll的位置

**htmlEncode(htmlString)**: 转义html标签

******



#### 一些常用的方法：

在tmpl的实例中，可以使用.fn中的方法（Fn类）；

**.getEl(exp)**:返回获取到的节点

**.getEls(exp)**:返回获取到的节点数组

**.isArr(array)**:检测是否为数组，返回true/false;

**.isObj(object)**:检测是否为对象，返回true/false;

**.isFn(fn)**:检测是否为函数，返回true/false;

**.isStr(string)**:检测是否为字符串，返回true/false;

**.isNum(number|string)**:检测是否为数字，返回true/false;

**.each(eachObj,handler)**:遍历器，handler中两个参数，第一个为获取到遍历的值，第二个为index/key;

**.extend(obj1,obj2)**:合并两个obj对象，返回一下合并的对象;

**.unique(arr)**:数组去重;

**.clearNull(arr)**:清除数组中的空白值，返回清除完的数组;

**.run(fn,context,args)**:在指定作用域内运行fn;

**.cb(fn,context,args)**:在指定作用域内运行fn;

**.unique(arr)**:数组中去重

**.trimArr(arr)**:清空空值的数组

**.copy(obj)**:深拷贝

**.serialize(obj)**:序列化表单内容

******

###实例属性：

**template**：解析前的源码，建议不修改

**vTmpl**：解析后js的dom代码，建议不修改

**config**：最初配置的文件，建议不修改

**methods**：设置的methods的方法都会挂在实例属性上

**data**：设置的data值都会挂在这个实例属性上

**注：如果data和methods存在同名，data的优先级比methods的高；**
















