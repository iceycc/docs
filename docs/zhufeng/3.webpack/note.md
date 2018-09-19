# 一、webpack 是啥呢

## 基本概念
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

# 二、快速上手

## 1. 初始化项目

```
npm init -y
```

## 2. 配置 webpack

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
                        loader:['style-loader','css-loader']
                    }
                ]
            }
        ````

2.  use

    ```javascript
    module: {
      rules: [
        {
          test: /\.css/,
          loader: ["style-loader", "css-loader"]
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

## 5. 分离 css

因为 CSS 的下载和 JS 可以并行,当一个 HTML 文件很大的时候，我们可以把 CSS 单独提取出来加载

- mini-css-extract-plugin
- filename 打包入口文件
- chunkFilename 用来打包`import('module')`方法中引入的模块

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

## 9. 编译less 和 sass
### 安装less和sass
```
npm install less less-loader -D
npm install node-sass sass-loader -D
```
### 编写样式已经配置文件
index.html
````html
<div class="less-container"></div>
<div class="sass-container"></div>
````
less.less 
````less
@color:orange;
.less-container{
    background:@color;
}
````
sass.scss
````scss
$color:green;
.sass-container{
    background:$color;
}
````
index.js
````javascript
import './sass.scss';
import './less.lesss';
````
webpack.config.js
````javascript
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
````

## 10. 处理css3属性前缀
为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀
> Trident内核：主要代表为IE浏览器, 前缀为-ms
> Gecko内核：主要代表为Firefox, 前缀为-moz
> Presto内核：主要代表为Opera, 前缀为-o
> Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit

### 安装 postcss-loader
```npm install postcss-loader autoprefixer -D```






# webpack 优化

# webpack
