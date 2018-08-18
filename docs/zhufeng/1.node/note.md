

# nodeJS超长总结
## 🐱 🐶 🐭 🐘 🐳 ✈️ 🚄 🚗 ⚽️ 💆 🥚 🧒 🌹 🐯 ➡️ 🐱 🐶 🐭 🐘 🐳 ✈️ 🚄 🚗 ⚽️ 💆 🥚 🧒 🌹 🐯 ➡️
持续更新。。。。很多还没写呢

---

# 搭建node开发环境
---
## 1、先安装一个 nvm
> `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.2/install.sh | bash`

## 2、安装node
## 3、npm介绍
安装
- 本地安装
- 全局安装 (在命令行使用)
```
npm install http-server -g 生成静态目录 
npm install nrm -g 切换源
npm install yarn -g 除了npm 还有安包的方式 yarn
npm uninstall yarn -g
```

实现全局包
- 添加bin
- 添加#! /usr/bin/env node
- npm link  

发包  
- 切换到官方源
- npm addUser
- 填上用户名邮箱 密码
- npm publish

# node常见概念
---
## 进程和线程
## 异步和同步
## 阻塞和非阻塞
## 队列和栈 （堆）
## 宏任务微任务
macrotask 和 microtask 表示异步任务的两种分类。在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，首先在 macrotask 的队列（这个队列也被叫做 task queue）中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。

两个类别的具体分类如下：

macro-task: script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering
micro-task: process.nextTick, Promises（这里指浏览器实现的原生 Promise）,Object.observe, MutationObserver

# node的模块
---
## 1、全局模块
不需要引入 拿来即用 `console.log(global)`得到核心对象
### console
> node中console.log(this) 指向的是 module.exports, node将`this != global this=module.exports`
> node中的全局对象是console.log(global) 

````javascript
console.log(this); // node为了实现模块化 外边有一个闭包
// 函数外边把this更改掉了 this != global this=module.exports

console.log(global); // 可以通过直接取值的方式拿到结果 不需要声明

// console 输出
console.log('log');
console.info('info'); // 标准输出 1
process.stdout.write('hello')

console.error('错误');
console.warn('警告'); // 错误输出 2 
process.stderr.write('error');

// 监听用户的输入
process.stdin.on('data',function(data){ // 0 
    console.log(data)
});

// 代号都是文件描述符
// console.assert(1===1===1,'出错了'); // node中有一个现成的模块 assert
console.time('start');
Promise.resolve().then(()=>{
    console.timeEnd('start');
})
// console.dir(global,{showHidden:true}); // 显示隐藏的信息

````
### process 进程
  `console.log(process)`得到整个process对象
  
```` javascript
console.log(global)
console.log(process);
console.log(process.platform === 'win32');
console.log(process.argv); //运行的参数 前两个不用管
let argvs = process.argv.slice(2);
//  把argvs变成对象 {color:red,port:3000}
// [--color,'red','--port',3000];
let obj = {}
argvs.forEach((element, index) => {
    if (element.includes('--')) {
        obj[element.slice(2)] = argvs[index + 1]
    }
});
console.log(obj); // 解析用户传递的参数


console.log(process.env.DEBUG); // 环境 变量
if (process.env.NODE_ENV === 'development') {
    console.log('当前是开发环境 ')
} else {
    console.log('上线环境 ')
}
// console.log(process.pid);  
// 在哪里运行的
console.log(process.chdir('1.node')); //改变工作目录
console.log(process.cwd()); // 当前工作目录 读取文件默认从跟文件夹下读取 (注意的点)
//  console.log(process.nextTick());
// nextTick > then

// process.kill(20352); // 杀死进程
// process.exit(2); // 退出进程，退出自己

// process进程
//   argv 执行参数
//   env 环境变量
//   pid 当前进程id
//   chdir/cwd chdir可以改变执行的工作目录 cwd代表的时当前目录
//   nextTick 下一队列
//   stdout
//   stderr
//   stdin
//   kill
//   exit 

Promise.resolve().then(() => {
    console.log('then')
})
// 
process.nextTick(() => {
    console.log('nextTick')
});

// nextTick 等所有同步任务执行玩立刻执行的
class A {
    constructor() {
        this.arr = [];
        console.log(this.arr); // []
        process.nextTick(()=>{ 
            console.log(this.arr); // ['123','456']
        })
    }
    add(val) {
        this.arr.push(val);
    }
}
let a = new A();
a.add('123');
a.add('456');

// node的事件环

// Buffer 缓存区 二进制 /  16进制
// clearImmediate / setImmediate node实现的

````
### _filenane 和 _dirname
不是global上的属性
_filenane当前执行文件的绝对路径  
_dirname当前文件所在文件夹的绝对路径
## 2、核心模块
不需要安装，引入即用
### path
专门用来处理路径 后缀名 路径的信息
1、path.join([...paths])
````javascript  
let path = require('path');
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
console.log(path.dirname(__dirname)); // 父路径
console.log(__dirname);
````
2、path.resolve()
path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
````javascript  
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录为 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
````
3、path.basename()
path.basename() 方法返回一个 path 的最后一部分，类似于 Unix 中的 basename 命令。 没有尾部文件分隔符
````javascript  
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
````
4、path.extname()
path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
````javascript
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''
````
4、path.dirname()
path.dirname() 方法返回一个 path 的目录名，类似于 Unix 中的 dirname 命令
````javascript
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
console.log(__dirname);
````
### vm 核心模块
vm 模块提供了一系列 API 用于在 V8 虚拟机环境中编译和运行代码。
JavaScript 代码可以被编译并立即运行，或编译、保存然后再运行.

让字符串执行的方法:
````javascript
// 1)让字符串执行
let a = 100; // 不干净的执行
eval('console.log(a)'); // 沙箱

// 2)让字符串执行
let str = 'console.log(a)'
let fn = new Function('a',str); // 模板引擎
fn(1);

// 3) node执行字符串
let vm = require('vm');
let str = 'console.log(a)';
vm.runInThisContext(str);

// runInThisContext fs.readFileSync fs.existsSync path.join resolve extname basename
````
### fs
### http
### querystring
### events
````javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发了一个事件！');
});
myEmitter.emit('event');
````
### util 
`const util = require('util');`

## 3、第三方模块
需要安装引入
* express
* koa
* [mime](https://www.npmjs.com/package/mime) 模块是一个基于mime-db的MIME类型解析及处理程序。
  

# EventLoop
---

````javascript
setTimeout(() => {
    console.log('timeout1');
    process.nextTick(()=>{ //在当前执行
        console.log('nextTick1');
    })
}, 1000);
// 虽然都写1000毫秒 是有误差
process.nextTick(function(){ // nextTick执行的时候用了0.8ms
    setTimeout(() => {
        console.log('timeout2'); 
    }, 1000); // 1000.02ms
    console.log('nextTick2');
})
// nextTick2 timeout1 timeout2 nextTick1
````


````javascript
setTimeout(function(){
    console.log('setTimeout1')
    Promise.resolve().then(()=>{ // 微
        console.log('then1')
    })
},1000)

// 微任务
Promise.resolve().then(function(){
    console.log('then2')
    setTimeout(function(){ // 宏
        console.log('setTimeout2')
    },1000)
})
// node中：then2 setTimeout1 setTimeout2 then1
// 浏览器中：then2 setTimeout1 then1 setTimeout2 
// setTimeout时间设为0会出现两种情况 由于设备性能引起的差距
````
不确定的：
````javascript
setImmediate(function(){
    console.log('setImmediate')
});
setTimeout(function(){
    console.log('setTimeout')
},0); // ->4
````
确定的： io操作后先执行check
````javascript 
//  
let fs = require('fs');
fs.readFile('./gitignore',function(){ // io的下一个事件队列是check阶段
    setImmediate(function(){
        console.log('setImmediate')
    });
    setTimeout(function(){
        console.log('setTimeout')
    },0); // ->4
})
// 
let fs = require('fs');
setTimeout(function(){
    Promise.resolve().then(()=>{
        console.log('then2');
    })
},0);
Promise.resolve().then(()=>{
    console.log('then1');
});
fs.readFile('./gitigore',function(){
    process.nextTick(function(){
        console.log('nextTick')
    })
    setImmediate(()=>{
        console.log('setImmediate')
    });
});
````

# 模块
---
## 介绍
- 方便维护 方便管理 代码统一
- 前端模块 (网络的问题)
- 模块加载是同步的
- cmd seajs amd requirejs umd 统一模块规范
- 自己实现模块化 let obj = {} 单例
- 闭包 let fn = (function(){return {}});
- esModule es6的模块化 
- commonjs规范 node (原理 闭包的形式)
    - 把文件读出来,套一个函数，安装规范来写，把需要导出的结果放到指定的地方
    - 别人可以拿到这个函数执行，拿到你导出的东西而已
    - 引用的过程是同步的

- node模块分类 核心模块/内置模块 、 第三方模块 bluebird 、文件模块、自己写的模块  (fs,path);

## 实现common规范
- 如何导入模块 require  
- 导出模块  module.exports =  this
- 如何定义模块1个文件就是一个模块
```javascript

* 模块的加载顺序
  
````javascript   
console.log(module.paths);
// 当前目录下找 node_modules，然后逐级网上找，直到找到根目录 node_modules
````
* `exports` 和 `module.exports`

````javascript
// a.js 导出
let a = 1
let b = 2
exports.a = 1 //单个导出
// module.exports = {a,b} //多个导出

// b.js 导入
let s = requiue('./a')
console.log(s)
````
node中通过require实现模块加载
> 同步的
> 1、找到这个文件
> 2、读取此文件内容
> 3、把他封装在一个函数內执行`(function (exports,require,module,filename,dirname){ // 执行代码 })`
>  exports: 当前模块的导出对象
>  require: requiue方法
>  module: 当前模块
>  filename: 当前模块文件的绝对路径
>  dirname:当前模块文件夹的绝对路径
> 4、执行后把模块的module.exports赋值给requie的变量


`console.log(module)` 打印当前模块信息：

````
Module {
  id: '.', // 模块id永远为当前模块 入口模块
  exports: {}, // 导出对象 默认{}
  parent: null,  // 父模块 此模块是有哪个模块加载的
  filename: // 当前模块的觉得路径
   '/Users/bingyang/Documents/zhufeng/201805coding/tempCodeRunnerFile.js',
  loaded: false, // 是否加载完成
  children: [], //此模块加载了那些模块
  paths: // 模块加载查找路径
   [ '/Users/bingyang/Documents/zhufeng/201805coding/node_modules',
     '/Users/bingyang/Documents/zhufeng/node_modules',
     '/Users/bingyang/Documents/node_modules',
     '/Users/bingyang/node_modules',
     '/Users/node_modules',
     '/node_modules' ] 
}
````
多次加载模块只会执行一次 有缓存

````javascript
// a.js
let a = 1
console.log('加载模块a') 
module.exports = a
// b.js
var a = requiue('./a');
var a = requiue('./a'); // 导入两次只会执行一次
````

自己实现一个requiue加载函数

````javascript
let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module(filename) {
  this.loaded = false;
  this.filename = filename; // 文件的绝对路径
  this.exports = {} // 模块对应的导出结果
}
Module._extensions = ['.js','.json'];

Module._resolveFilename = function (p) {
  p = path.join(__dirname,p); // c://xx/a
  if(!/\.\w+$/.test(p)){
    // 尝试添加扩展名
    for(let i = 0;i<Module._extensions.length;i++){
      let filePath = p + Module._extensions[i];// 拼出一个路径
      // 判断文件是否存在
      try{
        fs.accessSync(filePath);
        return filePath;
      }catch(e){
        if (i >= Module._extensions.length){
          throw new Error('module not Found')
        }
      }
    }
  }else{
    return p
  }
}
Module._cache = {};
Module._extensions['.json'] = function (module) {
  let content = fs.readFileSync(module.filename,'utf8');
  module.exports = JSON.parse(content)
}

Module.wrapper = ['(function (exports,require,module){','\r\n})'];
Module.wrap = function (content) {
  return Module.wrapper[0] + content + Module.wrapper[1];
}
Module._extensions['.js'] = function (module) {
  let content = fs.readFileSync(module.filename, 'utf8');
  let script = Module.wrap(content);
  let fn = vm.runInThisContext(script);
  // module.exports = exports = {}
  // exports.a = 'hello world'
  fn.call(module.exports, module.exports, req, module);
}
Module.prototype.load = function () {
  // 加载模块本身 js按照js加载 json按照json加载
  let extname = path.extname(this.filename);
  Module._extensions[extname](this);
}
function req(path) { // 自己实现的require方法 可以加载模块
  // 先要根据路径 变出一个绝对路径
  let filename = Module._resolveFilename(path);
  // 文件路径 (绝对路径) 唯一
  if (Module._cache[filename]){
    // 如果加载过直接把加载的结果返回即可
    // 有缓存把exports属性导出即可
    return Module._cache[filename].exports;
  }
  // 通过这个文件名创建一个模块
  let module = new Module(filename);
  module.load(); // 让这个模块进行加载 根据不同的后缀加载不同的内容
  Module._cache[filename] = module; // 进行模块的缓存
  // 返回最后的结果
  return module.exports;
}
// module.exports exports 有什么关系
let str = req('./b.js');
str = req('./b.js');
console.log(str);

// 多次require只会执行一次 cache

//1.写一个自己的require方法
//2.Moudle是一个类
//3.要实现一个Module._load方法实现模块的加载
//4.Module._resolveFilename 解析路径的
//5.Module._cache加载的缓存
//6.创建一个模块
//7.放到缓存中
//8.Module._extensions
````
---

# npm发包
## 实现全局包
1、添加bin 
在package.json文件下添加 指令
````
  "bin": {
    "icey": "bin/www"
  },
````

2、创建一个 `wwww`文件，无后缀名，添加 `#! /usr/bin/env node`
````
#! /usr/bin/env node
console.log('我很帅1');
console.log(process.argv.slice(2));
````

3、`sudo npm link`

## 发包
- 切换到官方源
- npm addUser
- 填上用户名邮箱 密码 邮箱注意要验证
- npm publish
---

# 发布订阅模式
## EventEmitter模块实现
````javascript
// 发布订阅  on 订阅 emit 发布
let EventEmitter = require('events');
// let util = require('util'); 
// function Girl(){
// }
// util.inherits(Girl,EventEmitter);
// 注意，不建议使用 util.inherits()。 请使用 ES6 的 class 和 extends 关键词获得语言层面的继承支持
class Girl extends EventEmitter {} // class 继承
let girl = new Girl;
function cry(){
    console.log('cry')
}
function eat(){
    console.log('eat')
}
function shopping(){
    console.log('shopping')
}
girl.on('失恋了',cry);
girl.on('失恋了',cry);
girl.on('失恋了',eat);
girl.on('失恋了',shopping);

girl.emit('失恋了');

````
## 其他用法 on  once  prependListener
````javascript
let EventEmitter = require('./events');

let e = new EventEmitter();

let eat = function(){
    console.log('吃')
}
let cry = function(){
    console.log('哭')
}
let haha = function(){
    console.log('笑')
}
// 可以监听用户新邦定的事件
// e.on('newListener',function(type){
//     process.nextTick(()=>{
//         e.emit(type)
//     })
// }); 
e.once('失恋',haha); // once this.on('失恋',one)
e.on('失恋',cry); // once this.on('失恋',one)
e.prependListener('失恋',eat); // 添加到之前
// e.removeListener('失恋',cry);
e.emit('失恋'); // 触发完成后就将数组的once绑定的函数移除掉
e.emit('失恋'); // 触发完成后就将数组的once绑定的函数移除掉
// console.log(EventEmitter.defaultMaxListeners)
````

## 自己实现
### 简单版本
````javascript
function EventEmitter() {
    this._events = {};
}
// {失恋:[fn,fn]}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = Object.create(null);
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    } else {
        this._events[eventName] = [callback];
    }
}
EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn();
        });
    }
}

module.exports = EventEmitter;
````
### 终极版本
````javascript
function EventEmitter() {
    this._events = {};
    this.count = 0;
}
// {失恋:[fn,fn]}
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
}
EventEmitter.prototype.listeners = function (eventName) {
    return this._events[eventName]
}
EventEmitter.prototype.on = function (eventName, callback, flag) {
    if (!this._events) this._events = Object.create(null);
    if (eventName !== 'newListener') {
        (this._events['newListener'] || []).forEach(fn => fn(eventName))
    }
    if (this._events[eventName] === this.count) {
        console.log('MaxListenersExceededWarning');
    }
    if (this._events[eventName]) {
        if (flag) {
            this._events[eventName].unshift(callback);
        } else {
            this._events[eventName].push(callback);
        }
    } else {
        this._events[eventName] = [callback];
    }
}
EventEmitter.prototype.once = function (eventName, callback,flag) {
    function one() {
        callback();
        this.removeListener(eventName, one);
    }
    one.g = callback;
    // {失恋:[one]}
    this.on(eventName, one,flag);
}
EventEmitter.prototype.removeListener = function (eventName, listener) {
    this._events[eventName] = this._events[eventName].filter((fn) => {
        return fn != listener && fn.g !== listener;
    })
}
EventEmitter.prototype.prependListener = function (eventName, callback) {
    this.on(eventName, callback, true);
}
EventEmitter.prototype.prependOnceListener = function(eventName, listener){
    this.once(eventName,call,true);
}
EventEmitter.defaultMaxListeners = 10;
EventEmitter.prototype.getMaxListeners = function () {
    return this.count && EventEmitter.defaultMaxListeners;
}
EventEmitter.prototype.setMaxListeners = function (n) {
    return this.count = n;
}
EventEmitter.prototype.emit = function (eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => {
            fn.call(this);
        });
    }
}
module.exports = EventEmitter;
````

# 编码
---
## 编码基础知识
1、字节
* 计算机内部，所有信息最终都是一个二进制
* 每个二进制 位 `bit` 有 0 和 1 两种状态，
* 8个二进制位就可以组合出256种状态，这被成为一个字节 `byte`

2、单位
* 8位（bit） = 1 字节 （byte）
* 1024字节 = 1K
* 1024K = 1M
* 1024M = 1G
* 1024G = 1T
* 1个字节,最大255,一个汉字三个字节

## JavaScript中的进制
1、进制表示
````javascript
let a = 0b10100;//二进制
let b = 0o24;//八进制
let c = 20;//十进制
let d = 0x14;//十六进制
console.log(a == b);
console.log(b == c);
console.log(c == d);
````
2、进制转换

* 十进制转任意进制 `.toString(目标进制)`
````
console.log(c.toString(2));
````

* 任意进制转十进制 `parseInt('任意进制字符串', 原始进制)`
````
console.log(parseInt('10100', 2));
````

## ASCII
最开始计算机只在美国用，八位的字节可以组合出256种不同状态。0-32 种状态规定了特殊用途,一旦终端、打印机遇上约定好的这些字节被传过来时，就要做一些约定的动作如：
* 遇上 0×10, 终端就换行
* 遇上 0×07, 终端就向人们嘟嘟叫

又把所有的空格、标点符号、数字、大小写字母分别用连续的字节状态表示，一直编到了第 127 号，这样计算机就可以用不同字节来存储英语的文字了.
这128个符号（包括32个不能打印出来的控制符号），只占用了一个字节的后面7位，最前面的一位统一规定为0  
> American Standard Code for Information Interchange：美国信息互换标准代码

##  GB2312
后来西欧一些国家用的不是英文，它们的字母在 ASCII 里没有为了可以保存他们的文字，他们使用127号这后的空位来保存新的字母，一直编到了最后一位 255。比如法语中的é的编码为 130。当然了不同国家表示的符号也不一样，比如，130 在法语编码中代表了 `é`,在希伯来语编码中却代表了字母 `Gimel (ג)`。
> 从128 到 255 这一页的字符集被称为扩展字符集。

中国为了表示汉字，把127号之后的符号取消了，规定
* 一个小于127的字符的意义与原来相同，但两个大于 127 的字符连在一起时，就表示一个汉字；  
* 前面的一个字节（他称之为高字节）从0xA1用到0xF7，后面一个字节（低字节）从 0xA1 到 0xFE；  
* 这样我们就可以组合出大约 7000 多个 ` (247-161)*(254-161)=(7998)` 简体汉字了。
* 还把数学符号、日文假名和ASCII里原来就有的数字、标点和字母都重新编成两个字长的编码。这就是全角字符，127 以下那些就叫半角字符。
* 把这种汉字方案叫做 GB2312。GB2312 是对 ASCII 的中文扩展

## GBK
后来还是不够用，于是干脆不再要求低字节一定是 127 号之后的内码，只要第一个字节是大于 127 就固定表示这是一个汉字的开始,又增加了近 20000 个新的汉字（包括繁体字）和符号。

## GB18030 / DBCS 
又加了几千个新的少数民族的字，GBK扩成了GB18030 通称他们叫做 DBCS `Double Byte Character Set：双字节字符集。`
在 DBCS 系列标准里，最大的特点是两字节长的汉字字符和一字节长的英文字符并存于同一套编码方案里.各个国家都像中国这样搞出一套自己的编码标准，结果互相之间谁也不懂谁的编码，谁也不支持别人的编码

## Unicode
ISO 的国际组织废了所有的地区性编码方案，重新搞一个包括了地球上所有文化、所有字母和符 的编码！ Unicode 当然是一个很大的集合，现在的规模可以容纳100多万个符号。
* International Organization for Standardization：国际标准化组织。
* Universal Multiple-Octet Coded Character Set，简称 UCS，俗称 Unicode

ISO 就直接规定必须用两个字节，也就是 16 位来统一表示所有的字符，对于 ASCII 里的那些 半角字符，Unicode 保持其原编码不变，只是将其长度由原来的 8 位扩展为16 位，而其他文化和语言的字符则全部重新统一编码。  
从 Unicode 开始，无论是半角的英文字母，还是全角的汉字，它们都是统一的一个字符！同时，也都是统一的 两个字节
* 字节是一个8位的物理存贮单元，
* 而字符则是一个文化相关的符号。

## UTF-8
Unicode 在很长一段时间内无法推广，直到互联网的出现，为解决 Unicode 如何在网络上传输的问题，于是面向传输的众多 UTF 标准出现了，
> Universal Character Set（UCS）Transfer Format：UTF编码

* UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式
* UTF-8 就是每次以8个位为单位传输数据
* 而 UTF-16 就是每次 16 个位
* UTF-8 最大的一个特点，就是它是一种变长的编码方式
* Unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节
* UTF-8 是 Unicode 的实现方式之一

## 编码规则
1. 对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。
2. 对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n+ 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。
````
Unicode符号范围     |        UTF-8编码方式
(十六进制)        |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
````

[Unicode编码](http://www.chi2ko.com/tool/CJK.htm)
````javascript
function transfer(num) {
  let ary = ['1110', '10', '10'];
  let binary = num.toString(2);
  ary[2] = ary[2]+binary.slice(binary.length-6);
  ary[1] = ary[1]+binary.slice(binary.length-12,binary.length-6);
  ary[0] = ary[0]+binary.slice(0,binary.length-12).padStart(4,'0');
  let result =  ary.join('');
  return parseInt(result,2).toString(16);
}
//万
let result = transfer(0x4E07);//E4B887

````

## 文本编码 
使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。我们常用的文本编码有UTF8和GBK两种，并且UTF8文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理。 
## 移除BOM头

BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：

 ````
    Bytes      Encoding
    ----------------------------
    FE FF       UTF16BE
    FF FE       UTF16LE
    EF BB BF    UTF8
 ````
因此，我们可以根据文本文件头几个字节等于啥来判断文件是否包含BOM，以及使用哪种Unicode编码。但是，BOM字符虽然起到了标记文件编码的作用，其本身却不属于文件内容的一部分，如果读取文本文件时不去掉BOM，在某些使用场景下就会有问题。例如我们把几个JS文件合并成一个文件后，如果文件中间含有BOM字符，就会导致浏览器JS语法错误。因此，使用NodeJS读取文本文件时，一般需要去掉BOM

移除BOM头：
````javascript
function readText(pathname) {
    var bin = fs.readFileSync(pathname);
    if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }
    return bin.toString('utf-8');
}
````

## GBK转UTF8 
NodeJS支持在读取文本文件时，或者在Buffer转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般我们借助iconv-lite这个三方包来转换编码。使用NPM下载该包后，我们可以按下边方式编写一个读取GBK文本文件的函数。

````javascript
var iconv = require('iconv-lite');
function readGBKText(pathname) {
    var bin = fs.readFileSync(pathname);
    return iconv.decode(bin, 'gbk');
}
````

# Buffer
---
## 什么是Buffer
* buffer是二进制 (存的是16进制) 表示的是内存
* fs读取文件 buffer类型
* buffer可以和字符串相互转化 toString()

## Buffer声明的方式
````javascript
Buffer.alloc(6) // <Buffer 00 00 00 00 00 00>
Buffer.from([1111,2,3]) // <Buffer 57 02 03>
Buffer.from('王冰洋') // <Buffer e7 8e 8b e5 86 b0 e6 b4 8b>
````
默认情况下 Buffer不支持 gbk编码;gbk -> utf8  iconv-lite可以处理乱码
````javascript
let fs = require('fs');
let r = fs.readFileSync('./1.txt');
let iconvLite = require('iconv-lite');
r = iconvLite.decode(r,'gbk'); 
console.log(r);
````

## 常用的方法
````javascript
// 1 indexof
Buffer.from('珠峰培训峰').indexOf('峰',6) // buf 中 value 首次出现的索引，如果 buf 没包含 value 则返回 -1 
// 2 截取buffer 可以使用slice方法
// 3 拷贝
let buffer = Buffer.alloc(12);// [1,1,1,]
let buf1 = Buffer.from('王');
let buf2 = Buffer.from('冰洋');
buf1.copy(buffer,0);
buf2.copy(buffer,3,3,6);
console.log(buffer.toString());
// 4 连结 contact 返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer 
let buf1 = Buffer.from('王);
let buf2 = Buffer.from('冰洋');
let newBuffer = Buffer.concat([buf1,buf2,buf1]);
console.log(newBuffer.toString());
````
自己实现一些
````javascript
// copy 拷贝
Buffer.prototype.copy = function(targetBuffer,targetStart,sourceStart,SourceEnd){
    sourceStart = sourceStart?sourceStart:0
    SourceEnd = SourceEnd? SourceEnd:this.length
    for(let i=sourceStart;i<SourceEnd;i++){
        // 把内容考到对应的buffer的身上
        targetBuffer[targetStart++] = this[i];
    }
}
// concat 连接
Buffer.concat = function(bufferArray,len){
    len =typeof len === 'undefined'?bufferArray.reduce((prev,next,current)=>prev+next.length,0)  : len;
    // 计算出一个大的buffer来
    let buffer = Buffer.alloc(len);
    let pos = 0;
    for(let i = 0;i<bufferArray.length;i++){
        // 把数组里的每一个buffer全部拷贝上去
        bufferArray[i].copy(buffer,pos);
        // 每次拷贝后累加自身的长度
        pos += bufferArray[i].length;
    }
    return buffer;
}
````

# fs
---
## fs模块
* 在 Node.js 中，使用fs模块来实现所有有关文件及目录的创建、写入及删除操作。
* 在fs模块中，所有的方法都分为同步和异步两种实现。
* 具有sync后缀的方法为同步方法，不具有sync后缀的方法为异步方法。

## 读文件 readFile + readFileSync
* 方法都是 异步没有sync / 同步 Sync
* 返回值可以获取同步的结果
* 读取文件默认的结果类型 encoding:null 默认是buffer
* 如果文件不存在则会报错
* 读取的时候会把内容整体读取到内存中 读小的文件)，大的文件流操作
* 异步 error-first

````javascript  
let fs = require('fs');
let path = require('path');
// 同步
let r = fs.readFileSync(path.join(__dirname,'note.md'),{encoding:'utf8',flag:'r'});
console.log(r);
// 异步
fs.readFile(path.join(__dirname,'note.md'),'utf8',function(err,data){ // 回调中的第一个参数 永远是错误
    console.log(data);
});
console.log(r);
````
## 写文件 writeFile + writeFileSync + appendFile
* 写入时默认文件存在就创建，有文件的话 会被清空
* 写入时 他会把内容以二进制的形式写入进去

````javascript
let fs = require('fs');
// 同步 fs.writeFileSync(file, data[, options])
fs.writeFileSync('./1.txt',Date.now()+'\n',{flag:'a'});
// 异步 fs.writeFile(file, data[, options], callback)
fs.writeFile(path.join(__dirname,'1.txt'),'{data:1}',function(err){
    console.log('成功')
});
// 追加 fs.appendFile(file, data[, options], callback)
fs.appendFile(path.join(__dirname,'1.txt'),'{data:1}',function(err){
    console.log('成功')
});
````

## 拷贝文件 
1、直接 读readFile 再写入 writeFile
````javascript
// 拷贝方法  不能读一点写一点，想指定位置读取
fs.readFile(path.join(__dirname,'1.txt'),(err,data)=>{
    fs.writeFile(path.join(__dirname,'2.txt'),data,(err)=>{
        console.log('拷贝成功')
    })
});
````

## open
`fs.open(filename,flags,[mode],callback);`
> mode:权限 r 4  w 2   x 1  chmod 777 666 0o438
> `callback:(err,fd)=>{}`  fd:file descriptor 文件描述符(数字类型) ReadStream 使用的整数型文件描述符
> `process.stdin 0 process.stdout 1 process.stderr 2`

````javascript
let fs = require('fs');
let path = require('path');
//
fs.open(path.join(__dirname,'1.txt'),'w',(err,fd)=>{
    // todo
})
````

## 写入指定内容 open + write

````javascript
fs.open(path.join(__dirname,'1.txt'),'w',(err,fd)=>{
    let buf = Buffer.from('王冰洋');
    // buf 指的是读取的buffer
    // 0 从buffer哪个位置读取 
    // 6 读取多少个buffer往里写
    // 0 从文件哪个位置写入
    // bytesWritten实际写入的个数
    fs.write(fd,buf,0,4,0,(err,bytesWritten)=>{
        console.log('写入成功')
    })
})

````

## 读取指定内容 open + read
````javascript  
fs.open(path.join(__dirname,'1.txt'),'r',(err,fd)=>{
    let buffer = Buffer.alloc(5);
    /**
     * fd文件，描述符
     * buffer 读取到那个buffer中
     * 0 从buffer哪个地方开始写入
     * 5 写入多长
     * 1 从文件的那个位置开始读取
     * bytesRead实际读取到的个数
     */
    fs.read(fd,buffer,0,4,1,(err,bytesRead)=>{
        console.log(buffer.toString());
        fs.close(fd,()=>{
            console.log('关闭')
        })
    });
});
````

## 拷贝指定位置 open + read + write

````javascript
let fs = require('fs');
let path = require('path');
// 1.txt => 2.txt
// 1.准备打开 1.txt 和 2.txt
const BUFFER_SIZE = 5;
let readPos = 0;
let writePos = 0;
// 异步的递归是如何操作的 
fs.open(path.join(__dirname, '1.txt'), 'r', (err, rfd) => {
    fs.open(path.join(__dirname, '2.txt'), 'w', (err, wfd) => {
        // 
        function next() {
            let buf = Buffer.alloc(BUFFER_SIZE); // 申请读出来的buffer的长度
            fs.read(rfd, buf, 0, BUFFER_SIZE, null, (err, byteRead) => {
                if (byteRead > 0) {
                    // 写入读取到的个数 可能想读10个 但是只有5个
                    readPos += byteRead
                    fs.write(wfd, buf, 0, byteRead, null, (err, byteWritten) => {
                        writePos += byteWritten;
                        next();
                    });
                }else{
                    fs.close(rfd,()=>{ });
                    // 读取完毕 不一定表示写入完毕 
                    fs.fsync(wfd,()=>{
                        fs.close(wfd,()=>{})
                    });
                }
            })
        }
        // 
        next();
    });
});


````

## 目录操作 

### 创建目录
> fs.mkdir(path[, mode], callback)
> 要求父目录必须存在

* 判断一个文件是否有权限访问
> fs.access(path[, mode], callback)
> 
````javascript
fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});
````
* 广度优先遍历

异步创建多级目录 async + await
````javascript
let fs = require('fs');
let util = require('util');
let access = util.promisify(fs.access); // promisify将改io操作promise化
let mkdir = util.promisify(fs.mkdir);
async function makep(p) {
    let paths = p.split('/');
    for (let i = 0; i < paths.length; i++) {
        let dirPath = paths.slice(0, i + 1).join('/');
        try{
            await access(dirPath)
        }catch(e){
            await mkdir(dirPath);
        }
    }
}
makep('a/b/c/d/e').then(data => {
    console.log('创建成果')
})
````

同步创建多级目录  
````javascript  
function makep(p) {  // 同步创建目录
    let paths = p.split('/');
    for (let i = 0; i < paths.length; i++) {
        let dirPath = paths.slice(0,i+1).join('/');
        try{
            // 如果能访问到 不干任何事 ，访问不到才创建
            fs.accessSync(dirPath);
        }catch(e){
            fs.mkdirSync(dirPath);
        }
    }
}
makep('a/b/c/d/e');
````  

递归创建多级目录 异步
````javascript
function makep(p,fn){
    let paths = p.split('/');
    let index = 0;
    function next(){
        if(index ===paths.length ) return fn();
        let realPath = paths.slice(0,++index).join('/');
        // 如果文件无法访问到 那就说明文件不存在则创建 反过来如果文件 存在就创建一下个
        fs.access(realPath,(err)=>{
            if(err){
                fs.mkdir(realPath,(err)=>{
                    next();
                });
            }else{
                next();
            }
        })
    }
    next();
}
makep('e/d/e/g/s/q',()=>{
    console.log('ok')
})
````

### 删除目录

### 删除文件
`fs.unlink(path, callback)`

### 查看文件目录信息
`fs.stat(path, callback)`
> stats.isFile()
stats.isDirectory()
atime(Access Time)上次被读取的时间。
ctime(State Change Time)：属性或内容上次被修改的时间。
mtime(Modified time)：档案的内容上次被修改的时间。

###  移动文件或目录
`fs.rename(oldPath, newPath, callback)`

### 读取目录下所有文件
`fs.readdir(path[, options], callback)`

### 截断文件
`fs.ftruncate(fd[, len], callback)`

````javascript
const fd = fs.openSync('temp.txt', 'r+');
// 截断文件至前4个字节
fs.ftruncate(fd, 4, (err) => {
  console.log(fs.readFileSync('temp.txt', 'utf8'));
});
````

### 删除非空目录
`rmdirSync` `rmdir` `unlink`

#### 简单实现
````javascript
// 如果删除一个文件夹 先读取出 文件夹的内容fs.readdir
// 判断当前这个路径是文件夹还是文件，文件的状态 fs.stat
// statObj.isDirectory  statObj.isFile
// fs.rmdir 删除目录    fs.unlink 删除文件
let fs  =require('fs');
let path = require('path');
fs.readdir('a',function (err,files) {
  let paths = files.map(dir => path.join('a', dir))
  console.log(paths);
  paths.forEach(p=>{
    fs.stat(p,(err,statObj)=>{
      if (statObj.isDirectory()){
        fs.rmdir(p)
      }else{
        fs.unlink(p)
      }
    });
  });
});
````

#### 先序广度遍历
````javascript  
let fs  =require('fs');
let path = require('path');
// 先序广度遍历
function rmdirSync(dir){
    let arr = [dir]; // 创建一个记录表
    let index = 0 ; // 从记录表里拿出第一项 a
    let current; // a
    while(current = arr[index++]){
        let dirsPath = fs.readdirSync(current); // [b,c]
        dirsPath = dirsPath.map(item=> path.join(current,item)); // => [a/b,a/c]
        arr = [...arr,...dirsPath] // => [a,a/b,a/c]
    };
    for(let i =arr.length-1;i>=0;i--){
        fs.rmdirSync(arr[i]);
    }
}
rmdirSync('a');
// 用传统的回调 fs.readdir  fs.rmdir 实现广度删除
````
#### Promise版
````javascript
// 1、异步primise 深度优先 删除
let {promisify} = require('util'); // async - > await
let fs = require('mz/fs');
async function removePromise(dir) {
    let statObj = await fs.stat(dir);
    if (statObj.isDirectory()) {
      let files = await fs.readdir(dir);
      files = files.map(file => removePromise(path.join(dir, file)));
      await Promise.all(files); // 删除儿子
      await fs.rmdir(dir);// 删除自己
    } else {
      await fs.unlink(dir);
    }
}
removePromise('a').then(()=>{
  console.log('删除成功');
},err=>{
  console.log(err);
})
// 2、版本2
function removePromise(dir) {
    return new Promise((resolve,reject)=>{
      fs.stat(dir,(err,statObj)=>{
        if(statObj.isDirectory()){
          fs.readdir(dir,(err,files)=>{
            files = files.map(file=>path.join(dir,file));
            // [a/b,a/c,a/1.js]
            // 等待儿子删除后 删除自己
            Promise.all(files.map(file =>removePromise(file))).then(()=>{
              fs.rmdir(dir,resolve);
            });
          })
        }else{
          // 文件删除后 成功即可
          fs.unlink(dir,resolve);
        }
      })
    });
}
removePromise('a').then(()=>{
  console.log('删除ok');
})
````

#### 并行
````javascript
function removeDir(dir, cb) {
    fs.stat(dir,(err,statObj)=>{
      if (statObj.isDirectory()){
        fs.readdir(dir,(err,files)=>{
          let paths = files.map(file=>path.join(dir,file));
          // 获取每一个路径
          if(paths.length>0){
            let i = 0;
            function done() { // Promise.all 等待异步都执行完后 再执行之后的操作 
              i++;
              if(i === paths.length){
                removeDir(dir, cb);
              }
            }
            paths.forEach(p => {
              // 删除某个后通知下 当删除的子目录个数 等于我们的子目录数，删除父级即可
              removeDir(p,done);
            })
          }else{
            fs.rmdir(dir,cb); // 当前目录下没东西直接删除即可
          }
        })
      }else{
        fs.unlink(dir,cb);
      }
    })
}

````

#### 异步深度优先 （串行 series paralle）
````javascript
function removeDir(dir,cb) { 
    fs.stat(dir,(err,statObj)=>{
      if (statObj.isDirectory()){
        fs.readdir(dir,(err,files)=>{
          let paths = files.map(file=>path.join(dir,file));
          function next(index) {
            // 第一次取出的是a/1.js
            if (index === paths.length) return fs.rmdir(dir,cb);
            let currentPath = paths[index];
            // 文件删除后继续拿出下一项 继续删除
            // 串行删除，删除完第一个，第一个删除完后调用第二个删除的方法
            removeDir(currentPath,()=>next(index+1));
          }
          next(0);
        })
      }else{
        fs.unlink(dir,cb);
      }
    })
}
removeDir('a',()=>{
  console.log('删除成功');
});
````

#### 深度 有儿子就深入进去
````javascript
function removeDirSync(dir) {
  let stateObj = fs.statSync(dir);
  if(stateObj.isDirectory()){
    // 是目录继续读取
    let dirs = fs.readdirSync(dir);
    dirs.forEach(d=>{
      let p = path.join(dir,d);
      removeDirSync(p);
    });
    // 儿子删除完成后继续删除自己
    fs.rmdirSync(dir);
  }else{
    fs.unlinkSync(dir);
  }
}
removeDirSync('a');
````

# 流
---
### todo

