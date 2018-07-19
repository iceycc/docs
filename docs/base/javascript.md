# javascript {docsify-ignore}

工作中太多的使用优秀的高效的框架，原生JavaScript还是不能够忘记，自己总结下JavaScript的一些基础知识。
<!-- more -->

## 一、为什么要学习JavaScript？
---
1、配合HTML+CSS完成网页的动态效果！
2、解决问题：
* 哪个方向的问题
    * （1）网站开发：客户端开发吗，服务端开发[nodeJS](http://nodejs.cn/)
    * （2）桌面应用开发：Desktop APP
        - [Electron](https://electronjs.org/)使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用
        - [NW.js(node-webkit)](https://nwjs.org.cn/)NW.js，跨平台，体积更小，功能更强大
    * （3）手机应用开发
        - M站
        - Hybrid APP 混合式应用开发
        - [React Native](https://reactnative.cn/)， [Weex](http://weex.apache.org/cn/guide/)等
        - 微信开发：公众号，[小程序](https://developers.weixin.qq.com/miniprogram/dev/api/file.html)
* 如何解决这些问题呢？
    * fontend:browser
        * html: sructure
        * css: style
        * js: interactive
    * backend: nodeJS

3、兴趣使然，为了理想（挣钱，挣更多的钱）

## 二、JavaScript的特点
1、弱语言：变量可以存储任意数据结构的数据
2、动态语言：变量存储的数据类型可以更改的
3、脚本语言: 执行代码时，没遇到一行代码，先解析，再执行
4、单线程：假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？[JavaScript 运行机制详解](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
## 三、JavaScript组成部分
ECMAScript
> JavaScript的核心，描述了语言的基本语法(var、for、if、array等)和数据类型(数字、字符串、布尔、函数、对象(obj、[]、{}、null)、未定义)，ECMAScript是一套标准，定义了一种语言（比如JS）是什么样子。

DOM
> DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）。DOM 将把整个页面规划成由节点层级构成的文档。HTML 或 XML 页面的每个部分都是一个节点的衍生物。
> DOM 通过创建树来表示文档，从而使开发者对文档的内容和结构具有空前的控制力。用 DOM API 可以轻松地删除、添加和替换节点（getElementById、childNodes、appendChild、 innerHTML）。

BOM
> 浏览器对象模型（BOM）对浏览器窗口进行访问和操作。例如弹出新的浏览器窗口，移动、改变和关闭浏览器窗口，提供详细的网络浏览器信息（navigator object），详细的页面信息（location object），详细的用户屏幕分辨率的信息（screen object），对cookies的支持等等。BOM作为JavaScript的一部分并没有相关标准的支持，每一个浏览器都有自己的实现，虽然有一些非事实的标准，但还是给开发者带来一定的麻烦。

## 四、JavaScript基础语法

### 1、JavaScript的书写
注释：单行注释和多行注释
````javascript
// 这是单行注释
/*
 这是
 多行
 注释
*/
````
##### 书写位置
> 内联式:script标签通常可以写在任意位置，一般习惯写在head底部
> 外链式:使用script标签，通关src属性设置js文件的地址。实际开发
> 行内式:onclick属性；写法不被推荐，不利于代码的分离，书写也不方便

### 2、语句
````javascript
var a = 2 + 1;// 这是语句，其中2+1是表达式
;;; // 这是三个空语句
1 + 3;// 表达式加分号，Javascript引擎将其解释为语句，但是毫无意义
'abc';
````
> JavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。
> 语句和表达式的区别在于，前者主要为了进行某种操作，一般情况下不需要返回值；后者则是为了得到返回值，一定会返回一个值。
 
### 3、变量
* 作用：用于存储数据(重复使用)
* 变量的声明
    * 变量的声明 var (variable)表示使用var声明的变量中保存的数据的类型是可以更改的
    * 变量的命名规则
        >1-开头可以使用$ _ 英文字母
        2- 开头不能用数字,其他地方随便
        3- 不能使用关键字 和 保留字
        4- 严格区分大小写
        5- 推荐使用有意义的命名
        6- 推荐驼峰命名法
        7- 不推荐使用中文
    * 同时声明多个变量.使用简化的声明方式：注意使用逗号分割。
*  赋值操作具有返回值
*  变量的存储方式
    *  基本数据类型：保存值
    *  复杂数据类型：保存指针

### 4、数据类型
基本数据类型
* number
    * 整数
    * 小数
    * 特殊值
        > NaN
        Infinity无限大
        -Infinity无限小
* string
    * js中的字符串需要使用英文半角的单引号或双引号进行标识
* boolean
* undefined
    > undefined出现的场景
    变量声明未赋值 var a;  
    获取对象不存在的属性
    无返回值的函数执行结果  没有return
    函数参数未传入
    void(expression)  
* unll
    * null是空对象指针，而[ ]是空数组，{ }是空对象，三者不相同
    * 

复杂数据类型
* object
    * Object.key(obj)
    * var person = { name: '老张' };
    *  key in obj
    *  delete obj.a  // 返回布尔值
    *  Object.defineProperty({},’a’,{value:123,configutable:false})
    * for in
    ````javascript
        for (var key in person) {
            if (person.hasOwnProperty(key)) {
                console.log(key);
            }
        }
    ````
    * with(obj){语句}  避免使用，因为如果obj没有你要操作的属性，会在全局注册该属性；也就是在运行时才会判断是挂在全局还是obj本身，拖慢运行速度；并且有可能在全局注册不必要的全局变量
* function
数据类型的检测方式
* typeof--基本数据类型的检测方法
```javascript
  var a;
  typeof a; // undefined 这个值未定义；
  typeof "abc"; // string
  typeof(200);  // number
  typeof null; // object 
  typeof {}; // object
  typeof {a:1}; // object
  console.log(typeof null === 'object') // true
  // 返回值为object可能是null或者对象
````
* [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
````javascript
// 待测值 instanceof 类型


````

数据类型的的转换
* js是动态语言，是允许数据类型转换的
* 基本数据类型进行转换只能通过功能获取转换后的结果，但是原值不会发生改变
* 转换方式
    * 转换为字符串
        > 1、 强制转换:
        > val.toString(): undefind和null不具备
        > String(v1111\al)
        > 2、隐式转换: val + ''

    * 转换为数值类型
        > 1、强制转换Number()、parseInt()、parseFloat() 
        2、隐式转换： +val , val - 0 , val + 0, val /1

### 5、流程控制
#### 循环
* for
* while
* do while
* label 标签 
    * JavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。
    * 标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句。标签通常与break语句和continue语句配合使用，跳出特定的循环。
    ````javascript
    label:
        语句
    // eg:
    top:
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) break top;
            console.log('i=' + i + ', j=' + j);
            }
        }
        // i=0, j=0
        // i=0, j=1
        // i=0, j=2
        // i=1, j=0
    ````
    * 可以配合break或者continue跳出多层循环
    ````javascript
    top1:
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) break top1;
            console.log('i=' + i + ', j=' + j);
            }
        }
        // i=0, j=0
        // i=0, j=1
        // i=0, j=2
        // i=1, j=0
    ````
    上面代码为一个双重循环区块，break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

    ````javascript
    top2:
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) continue top2;
            console.log('i=' + i + ', j=' + j);
            }
        }
        // i=0, j=0
        // i=0, j=1
        // i=0, j=2
        // i=1, j=0
        // i=2, j=0
        // i=2, j=1
        // i=2, j=2
    ````
    
    上面代码为一个双重循环区块，break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环。如果break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。

* break 和 continue仔循环中的使用

#### 分支语句
* if
* switch
* 三元运算符

### 6、数组
### 7、函数
#### 函数的声明
* （1） function命令 
````javascript
function print(s){
    console.log(s);
}
````
* （2）函数表达式
````javascript
var print = function(s) {
  console.log(s);
};
var print2 = function x(s) {
  console.log(s);
  console.log(typeof x);
   // 匿名函数加入了函数名x。这个x只在函数体内部可用，指代函数表达式本身，其他地方都不可用。
   // 用途：1、函数内部调用自身；2、方便排除错误
};
print() // s
print2() // s  function
````
* （3）Function构造函数
````javascript
var add = new Function(
  'x',
  'y',
  'return x + y'
);
// 你可以传递任意数量的参数给Function构造函数，只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。
//Function构造函数可以不使用new命令，返回结果完全一样.

// 等同于
function add(x, y) {
  return x + y;
}
// 几乎无人使用。

````

#### 函数的重复声明  
> 如果同一个函数被多次声明，后面的声明就会覆盖前面的声明。  
> 后一次的函数声明覆盖了前面一次。而且，由于函数名的提升（参见下文），前一次声明在任何时候都是无效的，这一点要特别注意。

#### 圆括号运算符，return 语句和递归
* 调用函数时使用圆括号，`fn(a,b)`，圆括号可以加入参数
* return ，直接返回后面的表达式的值，也就是函数的返回值；如果没有return就返回undefined
* 递归：函数可以调用自身，这就是递归（recursion）
````javascript
    // 通过递归，计算斐波那契数列的代码。
    function fib(num) {
    if (num === 0) return 0;
    if (num === 1) return 1;
    return fib(num - 2) + fib(num - 1);
    }

    fib(6) // 8
````
#### 第一等公民

### 8、对象
* 待续..

## 五、API
什么是Api?
> api(Application Programming Interface)
> 应用程序编程接口：编程引用程序需要的接口
> 开发工作：明确需求，找接口，配合语言本身，实现功能
> API可以完成输入到转换

WebAPI
> DOM
> BOM

## 六、Javascript高级
高阶函数
面向对象
原型链

## 七、正则表达式
## 八、Jquery
