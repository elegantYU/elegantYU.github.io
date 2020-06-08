---
title: 一分钟搭建webpack+react的chrome-extensions项目
hide_excerpt: true
date: 2020-06-07 15:00:38
tags: 一分钟教程
subtitle: webpack+react
cover: https://i.loli.net/2020/06/08/CMoiJtfgpNY1jDG.png
---

客厅吹来的徐徐清风，一缕缕带走房间里沉闷的空气，窗外杨树摇摆着夏日繁茂的枝丫，趴在刚换完床单的床上，耳边“梭梭”声若隐若现，大自然的呢喃远比合成的白噪音悦耳。

周日，又一个阳光且慵懒的下午。

这是发布个人第二款浏览器插件**Color Picker**的第二天。

温吞吞的节奏中，慢慢学习使用react去打造插件应用，最终完成提交的那一刹那，心情却如尘埃落定，没有想象中的兴奋之感。
我果然还是更重视事件的初衷与过程而非结果，确定了方向后，不断的冲刺，无论道路的狭窄崎岖，只管记住目的，去学习，去克服，一次次的冲锋，一次次的受挫，一次次的进步。
这，才是最快乐时候。当到达高潮顶峰之后，只觉得本应如此。

------

闲言碎语不多讲，来看看基础的项目如何构建。

# webpack

众所周知，一个webpack的配置主要由**mode(模式)**、**entry(入口)**、**output(出口)**、**loader(转换器)**、**plugin(插件)**构成，下面开始手把手搭建一个项目。

## init

```bash
# 进入某个专门学习的文件夹
mkdir react-app && cd react-app # 创建项目文件夹并进入
npm init -y # 快速创建package.json，跳过所有可选项

```
此时一个package.json文件已创建好，里面的可选配置后续再说。

在项目根目录下，再创建文件夹`config`作为webpack配置文件的存放，新建文件`webpack.config.js`，我们要开始配置啦。

```bash
# 下载模块
yarn add webpack webpack-cli
# 个人喜欢使用yarn，也可用npm
```

## mode

mode一项配置很简单也很重要，作为开发环境的判断，可选择为`development`或`production`，并根据不同的环境参数，配置不同的webpack优化。

```js
// webpack.config.js
module.exports = {
  mode: 'production'
}
```
webpack中若无mode配置，也可在package.json的scripts中配置mode参数
```json
// pakeage.json
{
  "scripts": {
    "build": "webpack --config=config/webpack.config.js --mode=production"
  }
}
```
到package.json这里就有人看不懂了
”哎？这里还能配置吗？我怎么看不懂啊？这是什么意思啊？“
~~好看的妹子请加微信求助私人辅导~~
咳咳，这里我将`npm init -y`创建的项目默认脚本命令删除了(test: echo什么的)。
创建了新的命令 名为`build`，其后的命令为`[启动的服务] --[参数名]=[参数值]`

我们使用webpack的服务，配置其脚本地址(以package.json文件为根路径)，及mode环境。
之后再终端键入`npm run build`或`yarn build`即可启动打包命令

这里统一设置为生产环境。

## entry

打包文件的入口，使用`path.resolve(__dirname, [path])`将文件相对路径转为绝对路径，基本配置如下：

```js
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './index.js')
}
```

由于开发插件的特殊性，需要配置成多入口：

```js
module.exports = {
  entry: {
    // 入口文件自定义name: 路径
    popup: path.resolve(__dirname, './popup.js'),
    background: path.resolve(__dirname, './background.js'),
    contentScript: path.resolve(__dirname, './contentScript.js'),
  }
}
```

## output

入口文件打包后的输出地址
```js
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    //  【name】使用entry配置的自定义name作为文件名，这里将输出到/dist/static/js/文件夹下
    filename: 'static/js/[name].js',
    // 根据上条filename的配置，决定了其chunkFilename的名称
    // bundle即是打包过程中所使用的模块合并后的产物
    chunkFilename: 'static/js/[name].bundle.js',
  }
}
```

## module

module？不是loader吗，我这么大一个loader去哪了？
module便是用来配置不同类型的loader。
我们能配置什么呢？

### js/jsx

使用react，必不可少的就是jsx语法和es678...等等可能会用到的高级语法，所以需要用到babel模块将其转换为es5。

```bash
yarn add babel-loader @babel/core @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react
```
- `@babel/preset-env` 指定babel可以转化最新的js语法，而无需微观管理目标环境所需语法
- `@babel/preset-react` 使用jsx语法必不可少的模块
- `@babel/plugin-proposal-class-properties`  顾名思义是用于js class语法的转换
- `@babel/plugin-transform-runtime` 为自己的代码创造一个沙盒环境，因为`core-js`会对全局范围的内置对象进行编译，如：定义与规范不一致的 Promise 对象，core-js可能会覆盖自己定义的对象，@babel/plugin-transform-runtime模块就是将内置对象使用模块引入的方式，避免对全局作用域的污染

下载完babel模块后，配置规则
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      }
    ]
  }
}
```

### css预处理

根据个人口味选择loader，这里是scss

```bash
yarn add style-loader css-loader postcss-loader sass-loader node-sass
```
> node-sass 可是太tm慢了

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sc|c)ss?$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("postcss-import")({ root: loader.resourcePath }),
              ],
            },
          },
          "sass-loader",
        ],
      },
    ]
  }
}
```

### img图片

安装`url-loader`&`file-loader`，对代码中引用限制大小后的图片，做转base64处理，减少请求

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpeg|jpg|svg)(\?t=\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              outputPath: "static/images/",
              limit: 10 * 1024,
            },
          },
        ],
      }
    ]
  }
}
```

## plugins

### html-webpack-plugin
此插件可根据入口文件生成一个html并引入js，或将js引入到自己配置的模板html中。

```js
// 根据多页面的场景，将生成页面单独提出来，这样好看
// moreTemplate.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chunkNames = [
  { chunk: 'popup', name: '前置弹窗页' },
  { chunk: 'background', name: '后置背景页' },
];

module.exports = chunkNames.map(
  ({ chunk, name }) =>
    new HtmlWebpackPlugin({
      title: name,
      filename: `${chunk}.html`,
      template: `public/index.html`,
      chunks: ["vendor", chunk],
      chunksSortMode: "manual",
    })
);

// webpack.config.js
const templateList = require("./moreTemplate");

module.exports = {
  plugins: [
    ...templateList,
  ]
}
```

### uglifyjs-webpack-plugin
压缩代码的插件，这没啥说的

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

new UglifyJsPlugin({
  test: /\.(js|jsx)/,
  exclude: /node_modules/,
  parallel: true,
  sourceMap: true,
}),
```

### merge-jsons-webpack-plugin
由于插件需要做国际化，在各模块中分别加入了其对应的message.json，使用此插件用于打包合并国际化的json

```js
// 别问为什么抽出来，好看
// mergeLocale.js
const locales = ["en","zh_CN","zh_TW"]
/**
 * pattern: 以项目根路径的相对路径，获取json文件拼接
 * fileName: 填入output.publicPath的相对路径
 */
module.exports = locales.map((lang) => ({
	pattern: `{./src/_locales/${lang}/messages.json,./src/**/_locales/${lang}/messages.json}`,
	fileName: `./_locales/${lang}/messages.json`,
}));

// webpack.config.js
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
const MergeLocale = require("./mergeLocale");
new MergeJsonWebpackPlugin({
  debug: true,
  output: {
    groupBy: [...MergeLocale],
  },
}),
```

## optimization

webpack中自带可配置的打包可重用模块代码分离优化功能

```js
module.exports = {
  optimization: {
    usedExports: true, //  tree shaking 只支持import引入
    splitChunks: {
      minChunks: 1, //  需要拆分模块的最小引入次数
      chunks: "all",  //  选择分离的区域
      cacheGroups: {  //  缓存组设置
        vendor: {
          name: "vendor", //  分离出名为vendor的js，即chunkFilename中的name
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
}
```

## prod & watch
根据业务需求，又新建两个文件，watch开发用，prod打包用

```js
// webpack.watch.js
const merge = require("webpack-merge");
const config = require("./webpack.base");

module.exports = merge(config, {
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000, // milliseconds
    poll: 1000,
    ignored: ["node_modules"],
  },
});
```

```js
// webpack.prod.js
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VersionList = require("./syncVersion");
const config = require("./webpack.base");

module.exports = merge(config, {
	plugins: [
		...VersionList,
		new CleanWebpackPlugin(),
	],
});
```
哎注意细节，这里我又加入一个versionList，这干嘛的呢？
没有错，是用来同步插件版本号

```js
const version = require("../src/config.json").version; 
const WriteJsonWebpackPlugin = require("write-json-webpack-plugin");
let package = require("../package.json");
let manifest = require("../public/manifest.json");

package.version = manifest.version = version;

const list = [
	{ origin: "../", filename: "package.json", json: package },
	{ origin: "../public", filename: "manifest.json", json: manifest },
	{ origin: "../dist", filename: "manifest.json", json: manifest },
];

module.exports = list.map(
	({ origin, filename, json }) =>
		new WriteJsonWebpackPlugin({
			pretty: true,
			object: json,
			path: origin,
			filename,
		})
);
```

这里抽离了版本号和国际化的所需国际语言数组`config`方便个人配置。

``` json
// package.json
{
  "scripts": {
    "watch": "webpack --config=config/webpack.watch.js",
    "build": "webpack --config=config/webpack.prod.js",
  },
}
```

到这里一个不使用devServer的chrome插件项目的配置就已经完成了，具体的代码文件，请移步到[这里](https://github.com/elegantYU/color-picker)欣赏(本身不想开源的，毕竟是个完整的产品，不过为了学习交流还是open了)
感觉不错的请不要怜惜我，狠狠地star吧！

> 下章说下插件的开发流程，及我的插件架构思路，嘤嘤