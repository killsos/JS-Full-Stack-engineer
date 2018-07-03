## ECMAScript6


## 1. 作用域变量
作用域就是一个变量的作用范围。也就是你声明一个变量以后,这个变量可以在什么场合下使用 以前的JavaScript只有全局作用域，还有一个函数作用域.  

ES6增加了**块级作用域**  

### 1.1 var的问题

1. var没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复，就会覆盖前面定义的变量，并且也有可能被其他人更改。

```javascript
if (true) {
	var a = 'a'; 
}
console.log(a) // undefined

```

2. var在for循环标记变量共享，一般在循环中使用的i会被共享，其本质上也是由于没有块级作用域造成的

```javascript
for (var i = 0; i < 3; i++) {
     setTimeout(function () {
         alert(i);
     }, 0);
 }
 
 运行结果 弹出三次3 而不是期待各弹出 1 2 3 一次

```

### 1.2 块级作用域 block scope

ES6新增 **let const** 两个声明关键字 都会是块级作用域

在用var定义变量的时候，变量是通过闭包进行隔离的，现在用了let，不仅仅可以通过闭包隔离，还增加了一些块级作用域隔离。 块级作用用一组大括号定义一个块,使用 let 定义的变量在大括号的外面是访问不到的

#### 1.2.1 实现块级作用域

```javascript

if(true){
    let name = 'zfpx';
}
console.log(name);// ReferenceError: name is not defined

```

#### 1.2.2 不会污染全局对象

```javascript

if(true){
    let name = 'zfpx';
}
console.log(window.name);

// 结果 undefined

```

#### 1.2.3 for循环中也可以使用i

```javascript
	// 嵌套循环不会相互影响
	
    for (let i = 0; i < 3; i++) {
        console.log("out", i);
        for (let i = 0; i < 2; i++) {
            console.log("in", i);
        }
    }
```

#### 1.2.4 重复定义会报错 
```javascript

if(true){
    let a = 1;
    let a = 2; //Identifier 'a' has already been declared
}

```
#### 1.2.5 不存在变量的预解释
```javascript

for (let i = 0; i < 2; i ++){
    console.log('inner',i);
    let i = 100;
}

//  i is not defined

```

#### 1.2.6 闭包的新写法
以前  

```javascript

;(function () {

})();


```
现在

```javascript

	{
	
	}


```


## 2. 常量

使用**const**我们可以去声明一个常量，常量一旦赋值就不能再修改了

常量名 全部是大写

### 2.1 常量不能重新赋值 

```javascript
const MY_NAME = 'killsos';
MY_NAME = 'ql'; //Assignment to constant variable

```

### 2.2 变量值可改变
其实const不改变的是常量的内存地址不变
因为非对象的数据类型 每次都是生成一个新的内存地址 所以不可以  

但是对于对象类型的值可以改变的  

注意const限制的是不能给变量重新赋值，而变量的值本身是可以改变的,下面的操作是可以的   

```javascript
const names = ['ql'];
names.push('killsos');
console.log(names);

```

### 2.3 不同的块级作用域可以多次定义

```javascript
const A = "0";
{
    const A = "A";
    console.log(A)
}
{
    const A = "B";
    console.log(A)
}
console.log(A)

```

## 3. 解构  

解构 数组按位置  对象按属性名 
  
### 3.1 解析数组

解构意思就是分解一个东西的结构,可以用一种类似数组的方式定义N个变量，可以将一个数组中的值按照规则赋值过去

```javascript

var [x,y] = ['ql',18];
console.log(x,y);

var [name,age] = {name:'killsos',age:18};
console.log(name,age);

```

### 3.2 嵌套赋值

```javascript

let [x, [y], z] = [1, [2.1, 2.2]];
console.log(x, y, z);

let [x, [y,z]] = [1, [2.1, 2.2]];
console.log(x,y,z);

let [json,arr,num] = [{name:'zfpx'},[1,2],3];
console.log(json,arr,num);
	
```

### 3.3 省略赋值
```javascript
let [, , x] = [1, 2, 3];
console.log(x);
```

### 3.4 解构对象
```javascript
var obj = {name:'ql',age:18};
//对象里的name属性的值会交给name这个变量，age的值会交给age这个变量

var {name,age} = obj;

//对象里的name属性的值会交给myname这个变量，age的值会交给myage这个变量

let {name: myname, age: myage} = obj;

console.log(name,age,myname,myage);
```

### 3.5 默认值

在赋值和传参的时候可以使用默认值

```javascript
let [a = "a", b = "b", c =new Error('C必须指定')] = [1, , 3];
console.log(a, b, c);

function ajax (options) {
    var method = options.method || "get";
    var data = options.data || {};
    //.....
}


function ajax ({method = "get", data}) {
    console.log(arguments);
}


ajax({
    method: "post",
    data: {"name": "ql"}
});

// { '0': { method: 'post', data: { name: 'ql' } } }

```

## 4. 字符串

### 4.1 模板字符串
模板字符串用反引号(数字1左边的那个键)包含，其中的变量用${}括起来  

```javascript
其中的变量会用变量的值替换掉
var name = 'killsos',age = 8;
let desc = `${name} is ${age} old!`;
console.log(desc);

//所有模板字符串的空格和换行，都是被保留的
var str = `<ul>
<li>a</li>
<li>b</li>
</ul>`;
console.log(str);

```

```javascript
function replace(desc){
  return desc.replace(/\$\{([^}]+)\}/g,function(matched,key){
    return eval(key);
  });
}

```

### 4.2 带标签的模板字符串
可以在模板字符串的前面添加一个标签，这个标签可以去处理模板字符串 标签其实就是一个函数,函数可以接收两个参数,一个是strings,就是模板字符串里的每个部分的字符 还有一个参数可以使用rest的形式values,这个参数里面是模板字符串里的值

```javascript
var name = 'killsos',age = 8;
function desc(strings,...values){
    console.log(strings,values);
}
desc`${name} is ${age} old!`;

// strings [ '', ' is ', ' old!' ]

```

### 4.3 字符串新方法

- includes()：返回布尔值，表示是否找到了参数字符串

- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部

- sendsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部

```javascript

var s = 'killoss';
s.startsWith('k') // true
s.endsWith('s') // true
s.includes('l') // true

```

第二个参数，表示开始搜索的位置

```javascript

var s = 'killsos';
console.log(s.startsWith('k',2)); // true
console.log(s.endsWith('s',2)); // true
console.log(s.includes('l',2)); // false

```

> endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束


### 4.4 repeat 

repeat方法返回一个新字符串，表示将原字符串重复n次

```javascript
'x'.repeat(3);  // xxx
'x'.repeat(0);

```