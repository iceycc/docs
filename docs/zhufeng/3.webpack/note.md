# 一、webpack 是啥呢

## 基本概念

---

- 模块打包机，分析目录结构，找到 JavaScript 模块以及一些浏览器不能直接运行大拓展语言（scss，typescript 等），将其打包成合适等格式工浏览器使用。
- 前端构建就是讲源代码转换成发布的线上可执行等 JavaScript、css、html 代码，包括如下内容：
  1. 代码转化：
  2. 文件优化
  3. 模块合并
  4. 自动刷新
  5. 代码校验
  6. 自动发布
- 构建就是自动化、工程化思想在前端开发中等体现，把一系列流程用代码去实现，让代码自动执行这一些列复杂的流程。

## webpack 能干啥

---

1. 解析行内样式
2. 解析抽离样式
3. 图片处理：html js css 三种引入方式
4. 解析 ts
5. 压缩 js+css
6. 转义 es6 es7 react decorators
7. watch
8. 拷贝
9. babel-runtime bable-polyfill
   1. https://www.jianshu.com/p/7bc7b0fadfc2
10. 引入第三方库的三种方式
    1. cdn
    2. export
11. 代理的应用
    1. 跨域
    2. 模拟数据
12. resolve 解析
    - extensions
    - alias 别名
    - modules 限制第三方查找都路径
    - mainFields 入口字段
    - mainFiles 配置默认文件

## 拓展

---

- code splitting

# 二、快速上手

## 1. 初始化项目

---

```
npm init -y
```

## 2. 配置 webpack

---

```
npm install webpack webpack-cli -D
```

注意安装在项目中，安装在全局容易造成 webpack 版本不统一。

打包命令：全局安装 webpack 和 webpack-cli 可以用以下方式。

```
#开发模式打包，输出非压缩./dist/main.js
webpack --mode=development
#产品模式打包，输入压缩./dist/main.js
webpack --mode=production
```

命令简写：在 package.json 的 script 增加：

```json
"dev":"webpack --mode=development",
"pro":"webpack --mode=production"
```

## 3. webpack 核心概念

---

- `entry` 入口 webpack 执行构建到第一步，可抽象为输入
- `output` 输出
- `module` 模块 在 webpack 中一切皆模块，一个模块对应着一个文件。webpack 会从配置到 entry 开始递归找出所有依赖到模块
- `plugin` 拓展插件 在 webpack 构建了流程中到特定时机注入拓展逻辑来改变构建结构或者做你想做到事情
  - 在 webpack 的构建流程中，plugin 用于处理更多其他的一些构建任务
  - 模块代码转换的工作由 loader 来处理
  - 除此之外的其他任何工作都可以交由 plugin 来完成
- `chunk` 代码块 一个 chunk 由多个模块组成，用于代码到合并和分割
- `loader` 模块转换器 将模块内容安装需求转化成新的内容

## 4. 基本配置

---

1. 创建 src 目录,并且默认配置入口为 src 下到 index.js

```
mkdir src
cd src
touch index.js
```

2. 基本配置文件，新建一个 wenpack.config.js

```javascript
const path = require("path");
module.exports = {
  entry: "./src/index.js", // 配置入口文件的地址,多入口用数组
  output: {
    // 配置出口文件的地址
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {}, // 配置模块,主要用来配置不同文件的加载器
  plugins: [], // 配置插件
  devServer: {} // 配置开发服务器
};
```

3. 创建 dist 目录(后期配置自动生成）

```
mikdir dist
```

4. 在 dist 目录下创建 index.html （后期配置回将 src 下到 index.html 打包成这个）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="root"></div>
<script src="bundle.js"></script>
</body>
</html>
```

# 三、webpack 配置超长总结

## 1. 配置开发服务器

---

安装
`npm i webpack-dev-server –D`
配置：

```javascript
devServer:{
    contentBase:path.resolve(__dirname,'dist'), //配置开发服务运行时的文件根目录
    host:'localhost', // 开发服务器监听到主机地址
    compress:true, // 开发服务器是否启动gzip等压缩
    port:8080 // 开发服务器监听到端口
}
```

然后配置 package.josn 的 script 的 dev

```json
"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --open --mode development "
 }
```

## 2. 支持加载 css 文件

---

`npm install css-loader style-loader -D`

### 什么是 loader

通过使用不同的 Loader，Webpack 可以要把不同的文件都转成 JS 文件,比如 CSS、ES6/7、JSX 等

- test：匹配处理文件的扩展名的正则表达式
- use：loader 名称，就是你要使用模块的名称
- include/exclude:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- query：为 loaders 提供额外的设置选项

### loader 的三种写法

1.  loader  
    加载 CSS 文件，CSS 文件有可能在 node_modules 里，比如 bootstrap 和 antd

        ````javascript
        module: {
                rules: [
                    {
                        test: /\.css/,
                        loader:['style-loader?a=1','css-loader']
                    }
                ]
            }
        ````

2.  use

    ```javascript
    module: {
      rules: [
        {
          test: ".less$",
          use: [
            {
              loader: MinCssExtractPlugin.loader,
              options: {
                // 此配置方式和下面的字符串穿参一样
                a: 1
              }
            },
            "css-loader?a=1" // 穿参数同上
          ]
        }
      ];
    }
    ```

3.  use+loader

    ```javascript
    module: {
      rules: [
        {
          test: /\.css/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader",
              options: {
                insertAt: "top"
              }
            },
            "css-loader"
          ]
        }
      ];
    }
    ```

## 3. 自动产出 html （插件）

---

### 安装插件

`npm install html-webpack-plugin -D`

### 配置：

```javascript
plugins: [
  new HtmlWebpackPlugin({
    minify: {
      // minify 是对html文件进行压缩
      removeAttributeQuotes: true // removeAttrubuteQuotes是去掉属性的双引号
    },
    hash: true, // hash 引入产出资源的时候加上查询参数，值为哈希避免缓存
    template: "./src/index.html", // template 模版路径
    filename: "index.html"
  })
];
```

## 4. 支持图片

---

### 手动添加图片

`npm install file-loader url-loader -D`

- [file-loader](http://npmjs.com/package/file-loader) 解决 CSS 等文件中的引入图片路径问题
- [url-loader](https://www.npmjs.com/package/url-loader) 当图片小于 limit 的时候会把图片 BASE64 编码，大于 limit 参数的时候还是使用 file-loader 进行拷贝

### 在 html 中使用图片

`npm i html-withimg-loader -D`
index.html

```html
<img scr="./images/logo.png">
```

webpack.config.js

```javascript
{
    test: /\.(html|htm)$/,
    use: 'html-withimg-loader'
}
}
```

### js 中引入图片

js

```javascript
let logo = require("./images/logo.png");
let img = new Image();
img.src = logo;
document.body.appendChild(img);
```

webpack.config.js

```javascript
module: {
  rules: [
    {
      test: /\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 4096
          }
        }
      ]
    }
  ];
}
```

### 在 css 中引入图片

css

```css
.logo {
  width: 200px;
  height: 200px;
  background-image: url("./images/logo.png");
  background-size: cover;
}
```

html

```html
<div class='logo'></div>
```

## 5. 分离 css / 抽离 css

---

因为 CSS 的下载和 JS 可以并行,当一个 HTML 文件很大的时候，我们可以把 CSS 单独提取出来加载

- mini-css-extract-plugin
- filename 打包入口文件
- chunkFilename 用来打包`import('module')`方法中引入的模块
- `extract-text-webpack-plugin`该插件的主要是为了抽离 css 样式,防止将样式打包在 js 中引起页面样式加载错乱的现象; webpack4 已经弃用。webpack4 得使用 mini-css-extract-plugin 这个插件来单独打包 css。

### 安装依赖模块

`npm install --save-dev mini-css-extract-plugin`

### 配置 webpack.config.js

```javascript
plugins: [
  //参数类似于webpackOptions.output
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
];

module: {
  rules: [
    {
      test: /\.css/,
      include: path.resolve(__dirname, "src"),
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        "css-loader"
      ]
    }
  ];
}
```

## 6. 压缩 JS

---

### 压缩 ES5

[UglifyJS2](https://github.com/mishoo/UglifyJS2)它会分析 JavaScript 代码语法树，理解代码含义，从而能做到诸如去掉无效代码、去掉日志输出代码、缩短变量名等优化  
常用选项

- sourceMap：是否为压缩后的代码生成对应的 Source Map，默认为不生成，开启后耗时会大大增加。一般不会把压缩后的代码的 Source Map 发送给网站用户的浏览器，而是用于内部开发人员调试线上代码时使用。
- beautify： 是否输出可读性较强的代码，即会保留空格和制表符，默认为是，为了达到更好的压缩效果，可以设置为 false。
- comments：是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为 false。
  compress.warnings：是否在 UglifyJs 删除没有用到的代码时输出警告信息，默认为输出，可以设置为 false 以关闭这些作用不大的警告。
- drop_console：是否剔除代码中所有的 console 语句，默认为不剔除。开启后不仅可以提升代码压缩效果，也可以兼容不支持 console 语句 IE 浏览器。
- collapse_vars：是否内嵌定义了但是只用到一次的变量，例如把 var a = 1; b = a 转换成 b = 1，默认为不转换。为了达到更好的压缩效果，可以设置为 true。
- reduce_vars： 是否提取出出现多次但是没有定义成变量去引用的静态值，例如把 a = 'zfpx'; b = 'zfpx' 转换成 var c = 'zfpx'; a = c; b = c，默认为不转换。为了达到更好的压缩效果，可以设置为 true。
  ```javascript
  const UglifyJSPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
  module.exports = {
    plugins: [
      // 压缩输出的 JS 代码
      new UglifyJSPlugin({
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        },
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false
        }
      })
    ]
  };
  ```

### 压缩 ES6

所以在运行环境允许的情况下，我们要尽可能的使用原生的 ES6 代码去运行

- 一样的逻辑用 ES6 实现的代码量比 ES5 更少
- JavaScript 引擎对 ES6 中的语法做了性能优化，例如针对 const 申明的变量有更快的读取速度
- UglifyJS 只认识 ES5 语法的代码
- 需要去掉 babel 配置文件中的 babel-preset-env
- uglifyjs-webpack-plugin

安装：
`npm install uglifyjs-webpack-plugin -D`

```javascript
const UglifyESPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  plugins: [
    new UglifyESPlugin({
      // 多嵌套了一层
      uglifyOptions: {
        compress: {
          // 编译配置
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        },
        output: {
          beautify: false, // 最紧凑的输出
          comments: false // 删除所有的注释
        }
      }
    })
  ]
};
```

## 7. 压缩 css

---

### cssnano

CSS 代码也可以像 JavaScript 那样被压缩，以达到提升加载速度和代码混淆的作用
目前比较成熟可靠的 CSS 压缩工具是[cssnano](https://cssnano.co/)，基于 PostCSS
`use: ['css-loader?minimize']`

### optimize-css-assets-webpack-plugin

`npm install optimize-css-assets-webpack-plugin -D`

```javascript
new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.optimize\.css$/g,
  cssProcessor: require("cssnano"),
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
});
```

## 8. CSS 和 image 存放单独目录

---

- outputPath 输出路径
- publicPath 指定的是构建后在 html 里的路径

```javascript
output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath:'/'
    },
module:{
    rules:[
       {
            test:/\.(jpg|jpeg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
            use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 4096,
                            outputPath: 'images',
                            publicPath:'/images'
                        }
                    }
                ]
        }
    ]
},

plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename:'css/[id].css'
        }),
]
```

## 9. 编译 less 和 sass

---

### 安装 less 和 sass

```
npm install less less-loader -D
npm install node-sass sass-loader -D
```

### 编写样式已经配置文件

index.html

```html
<div class="less-container"></div>
<div class="sass-container"></div>
```

less.less

```less
@color: orange;
.less-container {
  background: @color;
}
```

sass.scss

```scss
$color: green;
.sass-container {
  background: $color;
}
```

index.js

```javascript
import "./sass.scss";
import "./less.lesss";
```

webpack.config.js

```javascript
module:{
    rules:[
        {
            test:/\.less/,
            include:path.resolve(__dirname,'src'),
            exclude:/node_modules/,
            use:[
                {
                    loader:MiniCssExtractPlugin.loader,
                }
                'css-loader',
                'less-loader'
            ]
        },
        {
            test:/\.scss/,
            include:path.resolve(__dirname,'src'),
            exclude:/node_modules/,
            use:[
                {
                    loader:MinCssExtractPlugin.loader,
                },
                'css-loader',
                'less-loader'
            ]
        }
    ]
}
```

## 10. 处理 css3 属性前缀

---

为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz 这些前缀

> Trident 内核：主要代表为 IE 浏览器, 前缀为-ms
> Gecko 内核：主要代表为 Firefox, 前缀为-moz
> Presto 内核：主要代表为 Opera, 前缀为-o
> Webkit 内核：产要代表为 Chrome 和 Safari, 前缀为-webkit

### 安装 postcss-loader

`npm install postcss-loader autoprefixer -D`

- PostCSS 本身是一个功能比较单一的工具。它提供了一种方式用 JavaScript 代码来处理 CSS。
- [postcss 是什么](https://www.ibm.com/developerworks/cn/web/1604-postcss-css/)
- Autoprefixer 是一个流行的 PostCSS 插件，其作用是为 CSS 中的属性添加浏览器特定的前缀。

### 上代码

index.css

```css
::placehoder {
  color: red;
}
```

postcss.config.js

```javascript
module.exports = {
  plugins: [require("autoprefixer")]
};
```

webpack.config.js

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      include: path.join(__dirname, "./src"),
      exclude: /node_modules/
    }
  ];
}
```

## 11. 转义 ES6/ES7/JSX

---

Babel 其实是一个编译 JavaScript 的平台,可以把 ES6/ES7,React 的 JSX 转义为 ES5

### 安装依赖包

`npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react babel-plugin-transform-decorators-legacy -D`

### 栗子 、

decorator

```javascript
ffunction readonly(target,key,discriptor) {
    discriptor.writable=false;
}
class Person{
    @readonly PI=3.14;
}
let p1=new Person();
p1.PI=3.15;
console.log(p1)
```

jsconfig.js

```javascript
{
    "compilerOptions":{
        "experimentalDecorators":true
    }
}
```

webpack.config.js

```javascript
{
    test:/\.jx?$/,
    use:{
        loader:'babel-loader',
        options:{
            presets:['env','stage-0','react'],
            plugins:["transform-decorators-legacy"]
        }
    },
    include:path.join(__dirname,'src'),
    exclude:/node_modules/
}
```

### babel 优化

- cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。
- cacheIdentifier：默认是一个 babel-core 版本号
- forceEnv：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV

### babel-runtime

- babel 在每个文件都插入了辅助代码，使代码体积过大
- babel 对一些公共方法使用了非常小的辅助代码，比如 \_extend
- 默认情况下会被添加到每一个需要它的文件中。你可以引入 babel runtime 作为一个独立模块，来避免重复引入

```
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

.babelrc

```json
{
  "presets": ["env"],
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
```

> webpack 打包的时候，会自动优化重复引入公共方法的问题

## 12 ESLint 校验代码规范

---

```
npm install eslint --save-dev
npm install eslint-loader --save-dev
npm install babel-eslint standard --save-dev
```

配置

```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
    options: {
        fix: true
    }
}
```

## 13. target ??

---

```
webpack 能够为多种环境或 target 构建编译
target 告知 webpack 为目标(target)指定一个环境
```

## 14. 如何调试打包后的代码

---

webpack 通过配置可以自动给我们 source maps 文件，map 文件是一种对应编译文件和源文件的方法

- source-map 把映射文件生成到单独的文件，最完整最慢
- cheap-module-source-map 在一个单独的文件中产生一个不带列映射的 Map
- eval-source-map 使用 eval 打包源文件模块,在同一个文件中生成完整 sourcemap
- cheap-module-eval-source-map sourcemap 和打包后的 JS 同行显示，没有映射列

> devtool:'eval-source-map'

## 15. 打包第三方类库

---

### 直接引入

```javascript
import _ from "lodash";
alert(_.join(["a", "b", "c"], "@"));
```

### 插件引入

\_ 函数会自动添加到当前模块的上下文，无需显示声明

```javascript
new webpack.ProvidePlugin({
  _: "lodash"
});
```

> 没有全局的`_`或者 `$` 函数，所以导入依赖全局变量的插件依旧会失败

### expose-loader ????

> npm install expose-loader --save-dev

不需要任何其他的插件配合，只要将下面的代码添加到所有的 loader 之前  
用法：

```javascript
require("expose-loader?libraryName!./file.js");
// 通过属性名 "libraryName" 暴露 file.js 的 exports 到全局上下文。
// 在浏览器中，就将可以使用 window.libraryName 。
```

栗子
webpack.config.js

```javascript
{
    test: require.resolve("jquery"),
    loader: "expose-loader?jQuery"
}
```

main.js 中引入

```javascript
require("expose-loader?$!jquery");
```

### externals

如果我们想引用一个库，但是又不想让 webpack 打包，并且又不影响我们在程序中以 CMD、AMD 或者 window/global 全局等方式进行使用，那就可以通过配置 externals

```javascript
const jQuery = require("jquery");
import jQuery from "jquery";
```

webpack.config.js

```javascript
externals: {
    jquery: 'jQuery'//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
},
module: {

}
```

## 16. watch

---

当代码发生修改后可以自动重新编译

```javascript
watch: true,
watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    poll:1000, //每秒询问的文件变更的次数
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
}
```

- webpack 定时获取文件的更新时间，并跟上次保存的时间进行比对，不一致就表示发生了变化,poll 就用来配置每秒问多少次
- 当检测文件不再发生变化，会先缓存起来，等待一段时间后之后再通知监听者，这个等待时间通过 aggregateTimeout 配置
- webpack 只会监听 entry 依赖的文件
- 我们需要尽可能减少需要监听的文件数量和检查频率，当然频率的降低会导致灵敏度下降

## 17. 添加商标

---

```javascript
new webpack.BannerPlugin('webpack学习'),
```

## 18. 拷贝静态文件

---

有时项目中没有引用的文件也需要打包到目标目录.将 assets 下的文件原封不动打包到 dist 目录下

> npm i copy-webpack-plugin -D

```javascript
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, "src/assets"), //静态资源目录源地址
    to: path.resolve(__dirname, "dist/assets") //目标地址，相对于output的path目录
  }
]);
```

## 19. 打包前清空输出目录

---

> npm i clean-webpack-plugin -D

```javascript
new CleanWebpackPlugin([path.resolve(__dirname, "dist")]);
```

## 20. 服务器代理

---

如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。

 几种方法：

### 不修改路径

请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。

```javascript
proxy: {
  "/api": 'http://localhost:3000'
}
```

### 修改路径

```javascript
proxy: {
    "/api": {
       target: 'http://localhost:3000',
       pathRewrite:{"^/api":""}
    }
}
```

### before after

before 在 webpack-dev-server 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 mock。

```javascript
before(app){
  app.get('/api/users', function(req, res) {
    res.json([{id:1,name:'zfpx1'}])
  })
}
```

### webpack-dev-middleware

webpack-dev-middleware 就是 express 提供的静态服务能力中间件

> npm install webpack-dev-middleware --save-dev

```javascript
const express = require("express");
const app = express();
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackOptions = require("./webpack.config");
webpackOptions.mode = "development";
const compiler = webpack(webpackOptions);
app.use(
  webpackDevMiddleware(compiler, {
    // webpack-dev-middleware 的配置选项
  })
);
app.listen(3000);
```

- `webpack-dev-server` 的好处是相对简单，直接安装依赖后执行命令即可
- 而使用`webpack-dev-middleware`的好处是可以在既有的 Express 代码基础上快速添加 `webpack-dev-server` 的功能，同时利用 Express 来根据需要添加更多的功能，如 mock 服务、代理 API 请求等

## 21. resolve 解析

---

### extensions

指定 extenstions 后不必 zai `requiure`和 `import`后添加文件拓展名，会依次尝试添加拓展名进行匹配

```javascript
resolve: {
  extensions: [".js", ".jsx", ".json", ".css"];
}
```

### alias

配置别名可以加快 webpack 查找模块的速度

- 每当引入 bootstrap 模块的时候，它会直接引入 bootstrap,而不需要从 node_modules 文件夹中按模块的查找规则查找

```javascript
const bootstrap = path.resolve(__dirname,'node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css');
resolve: {
     alias:{
         "bootstrap":bootstrap
     }
},
```

### modules

- 对于直接声明依赖名的模块（比如 react）， webpack 会类似 Node.js 一样进行路径搜索，搜索 node_modules 目录
- 这个目录就是使用 resolve 字段进行配置 默认配置

```javascript
resolve:{
  modules:['node_modules'],
}
```

如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 node_modules 中的话

```javascript
resolve: {
  modules: [path.resolve(__dirname, 'node_modules')],
}
```

### mainFields

默认情况下 package.json 文件则按照文件中 main 字段的文件名来查找文件

```javascript
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],
  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
}
```

### mainFiles

当目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 这个文件，其实这个也是可以配置的

```javascript
resolve: {
  mainFiles: ['index'], // 你可以添加其他默认使用的文件名
},
```

### resolveLoader

resolve.resolveLoader 用于配置解析 loader 时的 resolve 配置,默认的配置：

```javascript
module.exports = {
  //...
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"]
  }
};
```

## 22. noParse

---

- 配置哪些模块文件的内容不需要编译
- 不需要解析依赖（即无依赖）的第三方大型类库等，可以通过这个字段配置，可以`提高整体的构建速度`
- 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制

```javascript
module.exports = {
// ...
module: {
  noParse: /jquery|lodash/, // 正则表达式
  // 或者使用函数
  noParse(content) {
    return /jquery|lodash/.test(content)
  },
}
}..
```

## 23. DefinePlugin

---

DefinePlugin 创建一些在编译时可以配置的全局常量

```javascript
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: "1",
  EXPRESSION: "1+2",
  COPYRIGHT: {
    AUTHOR: JSON.stringify("王冰洋")
  }
});

console.log(PRODUCTION);
console.log(VERSION);
console.log(EXPRESSION);
console.log(COPYRIGHT);
```

- 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值
- 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
- 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义
- JSON.stringify(true) 的结果是 'true'

## 24. ignorePlugin

---

IgnorePlugin 用于忽略某些特定的模块，让 webpack 不把这些指定的模块打包进去

```javascript
import moment from "moment";
console.log(moment);
```

webpack.config.js

```javascript
new webpack.IgnorePlugin(/^\.\/locale/, /moment$/);
```

- 第一个是匹配引入模块路径的正则表达式
- 第二个是匹配模块的对应上下文，即所在目录名

## 25. 区分环境变量

---

- 日常的前端开发工作中，一般都会有两套构建环境:development 和 production
- 一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印 debug 信息，包含 sourcemap 文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 debug 信息，静态文件不包括 sourcemap
- webpack 4.x 版本引入了 mode 的概念
- 当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化
- 而如果是 development mode 的话，则会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建

### 环境差异

生产环境：

- 可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
- 需要压缩 HTML/CSS/JS 代码
- 需要压缩图片
  开发环境
- 需要生成 sourcemap 文件
- 需要打印 debug 信息
- 需要 live reload 或者 hot reload 的功能...

### 获取 mode 参数 -????????

```javascript
module.exports = (env, argv) => ({
  optimization: {
    minimizer:
      argv.mode == "production"
        ? [
            new UglifyJSplugin({
              cache: true, //启用缓存
              parallel: true, // 使用多进程运行改进编译速度
              sourceMap: true //生成sourceMap映射文件
            }),
            new OptimizeCssAssetsWebpackPlugin({})
          ]
        : []
  }
});
```

### 封装 log 方法

- webpack 时传递的 mode 参数，是可以在我们的应用代码运行时，通过 process.env.NODE_ENV 这个变量获取

```javascript
export default function log(...args) {
  if (process.env.NODE_ENV == "development") {
    console.log.apply(console, args);
  }
}
```

### 拆分配置

可以把 webpack 的配置按照不同的环境拆分成多个文件，运行时直接根据环境变量加载对应的配置即可

webpack.base.js：基础部分，即多个文件中共享的配置
webpack.development.js：开发环境使用的配置
webpack.production.js：生产环境使用的配置
webpack.test.js：测试环境使用的配置...
webpack-merge

```javascript
const { smart } = require("webpack-merge");
const webpack = require("webpack");
const base = require("./webpack.base.js");
module.exports = smart(base, {
  module: {
    rules: []
  }
});
```

## 26. 多入口

---

有时候我们的页面可以不止一个 HTML 页面，会有多个页面，所以就需要多入口

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: "./src/index.html",
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      chunks: ["login"],
      template: "./src/login.html",
      filename: "login.html"
    })
  ]
};
```

## 27. 对图片进行压缩优化

---

image-webpack-loader 可以帮助我们对图片进行压缩和优化

npm install image-webpack-loader --save-dev

```javascript
{
    test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
    use: [
      'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        },
    ]
}
```

# 参考
## 常用loader列表
webpack 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。 awesome-loaders

### 文件
raw-loader 加载文件原始内容（utf-8）
val-loader 将代码作为模块执行，并将 exports 转为 JS 代码
url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL
file-loader 将文件发送到输出文件夹，并返回（相对）URL
### JSON
json-loader 加载 JSON 文件（默认包含）
json5-loader 加载和转译 JSON 5 文件
cson-loader 加载和转译 CSON 文件
### 转换编译(Transpiling)
script-loader 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
babel-loader 加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
buble-loader 使用 Bublé 加载 ES2015+ 代码，并且将代码转译为 ES5
traceur-loader 加载 ES2015+ 代码，然后使用 Traceur 转译为 ES5
ts-loader 或 awesome-typescript-loader 像 JavaScript 一样加载 TypeScript 2.0+
coffee-loader 像 JavaScript 一样加载 CoffeeScript
### 模板(Templating)
html-loader 导出 HTML 为字符串，需要引用静态资源
pug-loader 加载 Pug 模板并返回一个函数
jade-loader 加载 Jade 模板并返回一个函数
markdown-loader 将 Markdown 转译为 HTML
react-markdown-loader 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
posthtml-loader 使用 PostHTML 加载并转换 HTML 文件
handlebars-loader 将 Handlebars 转移为 HTML
markup-inline-loader 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用
### 样式
style-loader 将模块的导出作为样式添加到 DOM 中
css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
less-loader 加载和转译 LESS 文件
sass-loader 加载和转译 SASS/SCSS 文件
postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
stylus-loader 加载和转译 Stylus 文件
### 清理和测试(Linting && Testing)
mocha-loader 使用 mocha 测试（浏览器/NodeJS）
eslint-loader PreLoader，使用 ESLint 清理代码
jshint-loader PreLoader，使用 JSHint 清理代码
jscs-loader PreLoader，使用 JSCS 检查代码样式
coverjs-loader PreLoader，使用 CoverJS 确定测试覆盖率
### 框架(Frameworks) #
vue-loader 加载和转译 Vue 组件
polymer-loader 使用选择预处理器(preprocessor)处理，并且 require() 类似一等模块(first-class)的 Web 组件
angular2-template-loader 加载和转译 Angular 组件
