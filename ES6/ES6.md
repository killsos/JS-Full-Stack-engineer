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
    let name = 'killsos';
}
console.log(name);// ReferenceError: name is not defined

```

#### 1.2.2 不会污染全局对象

```javascript

if(true){
    let name = '';
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

let [json,arr,num] = [{name:''},[1,2],3];
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
console.log(s.endsWith('i',2)); // true
console.log(s.includes('l',2)); // false

```

> endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束


### 4.4 repeat 

repeat方法返回一个新字符串，表示将原字符串重复n次

```javascript
'x'.repeat(3);  // xxx
'x'.repeat(0);

```

## 5. 函数

### 5.1 默认参数

可以给定义的函数接收的参数设置默认的值 在执行这个函数的时候，如果不指定函数的参数的值，就会使用参数的这些默认的值
 

```javascript

function ajax(url,method='GET',dataType="json"){
  console.log(url);
  console.log(method);
  console.log(dataType);
}

```

### 5.2 展开操作符

把...放在数组前面可以把一个数组进行展开,可以把一个数组直接传入一个函数而不需要使用**apply**

```javascript

//传入参数
let print = function(a,b,c){
    console.log(a,b,c);
}
print([1,2,3]);
print(...[1,2,3]);

// 可以替代apply
var m1 = Math.max.apply(null, [8, 9, 4, 1]);
var m2 = Math.max(...[8, 9, 4, 1]);

// 可以替代concat
var arr1 = [1, 3];
var arr2 = [3, 5];
var arr3 = arr1.concat(arr2);

var arr4 = [...arr1, ...arr2];
console.log(arr3,arr4);

//类数组的转数组
function max(a,b,c) {
    console.log(Math.max(...arguments));
}
max(1, 3, 4);

```


### 5.3 剩余操作符

剩余操作符可以把其余的参数的值都放到一个叫rest的数组里面

```javascript
let rest = function(a,...rest){
    console.log(a,rest);
}

rest(1,2,3);  // [ 2, 3 ]

```

### 5.4 解构参数

```javascript
let destruct = function({name,age}){
    console.log(name,age);
}
destruct({name:'killsos',age:6});

```
### 5.5 函数的名字

ECMAScript 6 给函数添加了一个name属性

```javascript
var desc = function descname(){}
console.log(desc.name);  // descname

```

### 5.6 箭头函数

箭头函数简化了函数的的定义方式，一般以 "=>" 操作符左边为输入的参数，而右边则是进行的操作以及返回的值inputs=>output

```javascript
[1,2,3].forEach(val => console.log(val)););

```

> 输入参数如果多于一个要用()包起来，函数体如果有多条语句需要用{}包起来


**箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。 正是因为它没有this，从而避免了this指向的问题。**

```javascript
var person = {
    name: 'killsos',
    getName: function() {
        setTimeout(function() { console.log(this); }, 1000);
        //在浏览器执行的话this指向window

        // ES5解决办法 使用bind
        setTimeout(function() { console.log(this); }.bind(this), 1000);

        setTimeout(() => console.log(this), 1000);
        //在浏览器执行的话this指向person
    }
}
person.getName();

```

## 6. 数组的新方法

### 6.1 from

将一个数组或者类数组变成数组,会复制一份  **浅复制**

```javascript
let oldArr = [1, [2, 3]];
let newArr = Array.from(oldArr);

console.log('====================================');
console.log(newArr === oldArr); // false
console.log('====================================');

console.log(newArr[1] === oldArr[1]); // true

```
### 6.2 Array.of

of是为了将一组数值,转换为数组

	console.log(Array(3), Array(3).length);
	
	console.log(Array.of(3), Array.of(3).length);

### 6.3 copyWithin

Array.prototype.copyWithin(target, start = 0, end = this.length) 覆盖目标的下标 开始的下标 结束的后一个的下标

	[1, 2, 3, 4, 5].copyWithin(0, 1, 2);
	
	// [ 2, 2, 3, 4, 5 ]

### 6.4 find

查到满足条件第一个对应的元素

	var array1 = [5, 12, 8, 130, 44];
	
	var found = array1.find(function(element) {
	  return element > 10;
	});
	
	console.log(found);

### 6.5 findIndex

查到满足条件第一个对应的元素的索引
	
	var array1 = [5, 12, 8, 130, 44];
	
	function findFirstLargeNumber(element) {
	  return element > 13;
	}
	
	console.log(array1.findIndex(findFirstLargeNumber));


### 6.6 fill
就是填充数组的意思 会更改原数组 Array.prototype.fill(value, start, end = this.length)

    let arr = [1, 2, 3, 4, 5, 6];
	
    arr.fill('a', 1, 2);
	
    console.log(arr);
	


### 6.7 map

遍历源数组然后返回一个新数组

	var array1 = [1, 4, 9, 16];
	
	// pass a function to map
	const map1 = array1.map(x => x * 2);
	
	console.log(map1);
	// expected output: Array [2, 8, 18, 32]


### 6.8 reduce
对累加器和数组中的每个元素（从左到右）应用一个函数
这个函数的return的返回值就是下一轮的accumulator

	const array1 = [1, 2, 3, 4];
	const reducer = (accumulator, currentValue) => {
		console.log(accumulator);
	  	return accumulator + currentValue;
	}
	// 1 + 2 + 3 + 4
	console.log(array1.reduce(reducer));
	// expected output: 10
	
	// 5 + 1 + 2 + 3 + 4
	console.log(array1.reduce(reducer, 5));
	// expected output: 15

### 6.9 filter
遍历源数组满足条件的元素 然后返回一个新数组

	
	 var words= ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
	 
	const result = words.filter(word => word.length > 6);
	
	console.log(result);
	// expected output: Array ["exuberant", "destruction", "present"]

### 6.10 forEach
数组的每个元素执行一次提供的函数

	var array1 = ['a', 'b', 'c'];
	
	array1.forEach(function(element) {
	  console.log(element);
	});
	

## 7. 对象

### 7.1 对象字面量

如果你想在对象里添加跟变量名一样的属性，并且属性的值就是变量表示的值就可以直接在对象里加上这些属性

	let name = 'killsos';
	let age = 18;
	let getName = function(){
	    console.log(this.name);
	}
	
	let person = {
	    name,
	    age,
	    getName
	}
	
	
	person.getName();

### 7.2 Object.is

对比两个值是否相等  与 === 效果相同 比较的是对象的内存地址

	console.log(Object.is(NaN,NaN)); // true
	
	console.log(Object.is(null,null)); // true
	
	console.log(Object.is({name:'a'},{name:'a'})); // false
	
	let obj = {name:'a'};
	
	console.log(Object.is(obj,obj));  // true

### 7.3 Object.assign

把多个对象的属性复制到一个对象中,第一个参数是复制的对象,从第二个参数开始往后,都是复制的源对象   **浅复制**

	var nameObj = { name: 'killsos' };
	var ageObj = { age: 8, add: { sex: 1 } };
	var obj = {};
	Object.assign(obj, nameObj, ageObj);
	console.log(obj);
	console.log(obj.add === ageObj.add); // true
	//克隆对象
	function clone(obj) {
	    return Object.assign({}, obj);
	}

### 7.4 Object.setPrototypeOf
将一个指定的对象的原型设置为另一个对象或者null
	
	var obj1  = {name:'killsos1'};
	var obj2 =  {name:'killsos2'};
	var obj = {};
	Object.setPrototypeOf(obj,obj1);
	console.log(obj.name);
	console.log(Object.getPrototypeOf(obj));
	Object.setPrototypeOf(obj,obj2);
	console.log(obj.name);
	console.log(Object.getPrototypeOf(obj));


### 7.5 proto

直接在对象表达式中设置prototype ES5之前是不可以 只有火狐浏览器实现这个功能

	var obj1  = {name:'killsos'};
	var obj3 = {
	    __proto__:obj1
	}
	console.log(obj3.name);
	console.log(Object.getPrototypeOf(obj3));


## 8 类

### 8.1 class
使用class这个关键词定义一个类,基于这个类创建实例以后会自动执行constructor方法,此方法可以用来初始化

	class Person {
	    constructor(name){
	        this.name = name;
	    }
	    getName(){
	        console.log(this.name);
	    }
	}
	let person = new Person('killsos');
	person.getName();
	

### 8.2 get与set
**getter**可以用来得获取属性，**setter**可以去设置属性

	class Person {
	    constructor(){
	        this.hobbies = [];
	    }
	    set hobby(hobby){
	        this.hobbies.push(hobby);
	    }
	    get hobby(){
	        return this.hobbies;
	    }
	}
	let person = new Person();
	person.hobby = 'basketball';
	person.hobby = 'football';
	console.log(person.hobby);

### 8.3 静态方法-static
在类里面添加静态的方法可以使用**static**这个关键词，静态方法就是不需要实例化类就能使用的方法

	class Person {
	   static add(a,b){
	       return a+b;
	   }
	}
	console.log(Person.add(1,2));


### 8.4 继承extends
一个类可以去继承其它的类里的东西

	class Person {
	   constructor(name){
	     this.name = name;
	   }
	}
	class Teacher extends Person{
	    constructor(name,age){
	        super(name);
	        this.age = age;
	    }
	}
	var teacher = new Teacher('zfpx',8);
	console.log(teacher.name,teacher.age);

## 9 生成器(Generator)与迭代器(Iterator)

Generator是一个特殊的函数，执行它会返回一个Iterator对象。 通过遍历迭代器， Generator函数运行后会返回一个遍历器对象，而不是普通函数的返回值

### 9.1 Iterators模拟

迭代器有一个next方法，每次执行的时候会返回一个对象 对象里面有两个属性，一个是value表示返回的值，还有就是布尔值done,表示是否迭代完成

	function buy(books) {
	    let i = 0;
	    return {
	        next() {
	            let done = i == books.length;
	            let value = !done ? books[i++] : undefined;
	            return {
	                value,
	                done
	            }
	        }
	    }
	}
	
	let iterators = buy(['js', 'html']);
	var curr;
	do {
	    curr = iterators.next();
	    console.log(curr);
	} while (!curr.done);

### 9.2 Generators

生成器用于创建迭代器 特点是function关键字后面加*

	function* buy(books){
	    for(var i=0;i<books.length;i++){
	        yield books[i];
	    }
	}
	let buying = buy(['js','html']);
	var curr;
	do {
	    curr = buying.next();
	    console.log(curr);
	} while (!curr.done);


## 10 集合

### 10.1 Set

一个Set是一堆东西的集合,Set有点像数组,不过跟数组不一样的是，Set里面不能有重复的内容 **内容的唯一性** 用来数组去重

	var books = new Set();
	books.add('js');
	books.add('js');//添加重复元素集合的元素个数不会改变
	books.add('html');
	books.forEach(function(book){//循环集合
	    console.log(book);
	})
	console.log(books.size);//集合中元数的个数
	console.log(books.has('js'));//判断集合中是否有此元素
	books.delete('js');//从集合中删除此元素
	console.log(books.size);
	console.log(books.has('js'));
	books.clear();//清空 set
	console.log(books.size);

### 10.2 WeakMap

与Map区别:  

  - 只接受对象作为键名  
  
  - 键名所指向的对象不计入垃圾回收机制
  
  - 键名所引用对象都是弱引用
  	
**所谓弱引用**:   
   垃圾回收机制不将该引用考虑在内  
   只要所引用对象的其他引用被清除   
   垃圾回收机制就会释放该对象 所占用的内存 一旦不再需要   
   WeakMap里面的键名对象和所对应的键值对会自动消失 不用手动删除引用  

	
	
	let obj = { name: 'killsos' };
	let wm = new WeakMap();
	wm.set(obj, 'killer');
	console.log(wm.get(obj));
	obj = null;
	console.log(wm.has(obj));















