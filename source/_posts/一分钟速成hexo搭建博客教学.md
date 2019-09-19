---
title: 一分钟速成hexo搭建博客教学
subtitle: learn_hexo
date: 2019-04-18 22:12:46
tags: [教程, 一分钟系列]
index_img: https://w.wallhaven.cc/full/nm/wallhaven-nm77x9.jpg
---

> 此篇博客乃在下历时月许，拖沓至今才准备出的hexo+github搭建博客教学。
> 从头至尾皆是本人的亲生体会，希望对大家有所借鉴和帮助

<!-- more -->
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=475073576&auto=1&height=66"></iframe>

## 博客环境

1. <u>[Node.js](https://nodejs.org/zh-cn/)</u>你要有吧，版本当然是越新越好，越稳定越好;

2. <u>[Git](https://git-scm.com/downloads)</u> 你要有吧，不用多说

3. 安装Hexo-cli，命令行全局下载

    > npm install -g hexo-cli

4. 找一个你喜欢的位置，初始化hexo文件作为你的博客本地仓库

    ```bash
    $ hexo init <你的仓库名>
    $ cd <你的仓库名>
    $ npm install
    ```
5. 本地启动hexo博客

    ```bash
    $ hexo s
    ```

6. 本地博客在`http://localhost:4000`启动了！



## github仓库

1. 在github上创建名为 `<你的Github帐号>.github.io` 的仓库

2. 使用命令，将本地hexo博客的仓库推送到github仓库(加入的命令越多，构建越慢)

    - 安装 `hexo-deployer-git` 插件
    ```bash
    $ npm install hexo-deployer-git
    ```

    - 修改本地仓库根目录下的_config.yml文件中的
    ```yml
    # Deployment
    ## Docs: https://hexo.io/docs/deployment.html
    deploy:
        type: git
        repo: git@github.com:<你的git账户名>/<你的git账户名>.github.io
        branch: master
    ```

    - 使用hexo的推送命令
    ```bash
    $ hexo g
    $ hexo d
    ```
3. 上个厕所，喝杯茶，等一会~在浏览器访问 `https://<你的git账户名>.github.io` 即可看到你的博客

## 添加主题

1. hexo的默认主题是landscape，虽然是很丑，但是确实不好看，这里列举几个我觉得UI或功能性好的主题
    - <u>[Next](https://github.com/theme-next/hexo-theme-next)</u> 大佬都在推
    - <u>[Material-T](https://github.com/0x2E/Material-T)</u> 我在用的
    - <u>[One](https://github.com/EYHN/hexo-theme-one)</u> 二次元大佬
    - <u>[Archer](https://github.com/fi3ework/hexo-theme-archer)</u> 功能全面
    - <u>[Cxo](https://github.com/Longlongyu/hexo-theme-Cxo)</u> 一开始的选择

    更多主题<u>[点这里](https://github.com/search?q=hexo-theme)</u>或<u>[这里](https://hexo.io/themes/index.html)</u>

2. 下载主题
    - 将下载的主题文件夹，粘贴到根目录的thems目录下(有些是直接下载到该目录下)
    - 修改_config.yml的theme配置
    ```yml
    # Extensions
    ## Plugins: https://hexo.io/plugins/
    ## Themes: https://hexo.io/themes/
    theme: <你的主题名>
    ```
3. 主题优化
    一般主题的文档中都会有相应的主题自定义优化空间，不然就自己添加配置

## 自动构建

1. 什么是自动构建？
    
    指将源码转换为可以实际运行的代码，配置各种资源(css、js、img等)

2. hexo为什么要自动构建？

    > 大家可以看下自己github的博客仓库，细心的你会惊讶的发现，怎么目录和本地仓库的不一样？
    > 这是因为hexo在deploy的时候会把生成的代码上传到git仓库里，而开发环境的源码都不会上传，这样的话对于有多个终端的用户来说就很蛋疼。总不能说换个电脑就要从头来一遍博客的搭建吧...
    > 于是，我们就需要在git仓库里也要上传一份源码，便于以后可以在不同的终端环境下也能方便的编辑博客。

    这里我使用的构建工具是<u>[Travis-CI](https://travis-ci.org/)</u>

3. travis-ci配置

    - Travis-CI是开源持续集成构建项目，用来构建托管在github上的代码，提供了多种语言的支持。

    当我们每次进行`git push`等动作时，Travis CI 会自动检测提交，然后根据`.travis.yml`配置文件自动生成一份线上代码。

    - 使用你的git账户登录<u>[Travis-CI](https://travis-ci.org/)</u>，进入<u>[travis-ci.org/account/repositories](https://travis-ci.org/account/repositories)</u>页面，如下图

        ![travis配置](https://i.loli.net/2019/04/21/5cbc1252a36f5.png 'travis ci 个人仓库')

    - 点击`<你的git名>.github.io`仓库后的settings，进入设置页

        ![travis配置](https://i.loli.net/2019/04/21/5cbc1252a303e.png 'travis ci 仓库配置')

    - 在这里需要配置你的环境变量(Environment Variables)，起一个你觉得好听的名字(我这里叫`ACCESS_TOKEN`)，然后去github获取token

        ![travis配置](https://i.loli.net/2019/04/21/5cbc1462546f3.png '环境变量')

    - 进入[github.com/settings/developers](https://github.com/settings/developers)页面，点击`Personal access tokens`，选择生成一个新token(Generate new token)

    - 选择repo所有权限

        ![Generate new token](https://i.loli.net/2019/04/21/5cbc1252ba0e6.png '生成access_token')

    - 将生成的token复制，粘贴到travis ci页面的value里(此token以后在github中不会再次显示，若是忘记可再次生成一个)，添加进去

    - 下面就是配置.travis.yml文件

        - 在本地博客根目录下新建.travis.yml文件

        - 配置如下(简易版)

        ```yml
        # 指定语言环境
        language: node_js
        # 指定nodejs版本
        node_js: 10.15.3
        # 指定缓存模块，可加快编译速度(可选)
        cache:
            directories:
                - node_modules
        # 指定源码所在分支
        branches:
            only:
                - dev
        # 构建前执行的命令
        before_script:
            - git config user.name "<你的git账户名>"
            - git config user.email "<你的邮箱>"
            # 这里的 ${ACCES_TOKEN} 对应之前在travis中设置的环境变量名
            - sed -i'' "s~https://github.com/<你的git账户名>/<你的git账户名>.github.io.git~https://${ACCESS_TOKEN}@github.com/<你的git账户名>/<你的git账户名>.github.io.git~" _config.yml
        # 构建所执行命令
        script:
            - hexo clean
            - hexo g
            - hexo d
        ```

        - 修改根目录下的_config.yml
        ```yml
        deploy:
        type: git
        # 使用https的url
        repo: https://github.com/<你的git账户名>/<你的git账户名>.github.io.git
        branch: master
        ```
    
    - 至此基本配置完毕，现在来提交下看是否开始自动构建

        - 在本地输入
        ```bash
        $ git init
        $ git remote add origin <git仓库的ssh链接>
        $ git checkout -b dev
        $ git add
        ```

        - 这时候可能会报错`You've added another git repository inside your current repository.`, 这是因为主题文件和本地文件隶属两个不同的仓库，那么这时候就需要

        ``` bash
        $ git rm --cache <报错主题的路径eg: theme/Material-T>
        $ git add <报错主题路径后加斜杠eg: theme/Material-T/>
        ```
        git add的时候在路径后加斜杠，表示将这个文件夹加入，而不是将这个文件作为一个子模块

        - 再次
        ```bash
        $ git add .
        $ git commit -m 'first commit'
        $ git push
        ```

    - 喝杯水回来，再上travis上看下，出现该仓库的提交信息时。
    恭喜你！只用了一分钟就配置好了一个完美的github+hexo博客！

> 重要功能已经具备，以后就是各种hexo插件的安装和配置，将会不断(慢)的更新。

## 写博客

```bash
$ hexo new post '你的博客名称' // 新建的md会在/source/_post/文件夹中
$ hexo clean                  // 删除和清理之前生成的不需要的文件
$ hexo g                      // 生成文件
$ hexo d                      // 上传git
$ hexo s                      // 本地预览
// 配置完CI后 hexo g 和 hexo d无需使用
$ git add .
$ git commit
$ git push
```

## hexo扩展插件

#### 留言系统(gitment)

留言系统基本有Valine,Livere,Gitment,Disqus几种，这里选择的是Gitment(大家都是有gitment帐号的人了)，所有的评论会已提交issue的形式保存在配置的仓库中。
下面，开始干货输出。

- 注册gitment,在<u>[New OAuth App](https://github.com/settings/applications/new)</u>为博客创建一个密钥

    ![get info](http://ww1.sinaimg.cn/large/006665PZgy1g2e2uilm1cj30m00fr74y.jpg '生成密钥')

    ```yml
    Application name: '给你放置评论的仓库起名'
    Homepage URL: '可以直接填你的博客链接'
    Application deccription: '描述...'
    Authorization callback URL: '这个必须填博客地址'
    # 注意 Homepage 和 callback 的url后都要加 / (这里也是一个坑)
    # 例 https://elegantyu.github.io/
    ```

- 在你博客主题里找到或添加

    ```yml
    gitment:
    enable: true
    mint: true # RECOMMEND, A mint on Gitment, to support count, language and proxy_gateway
    count: true # Show comments count in post meta area
    lazy: false # Comments lazy loading with a button
    cleanly: false # Hide 'Powered by ...' on footer, and more
    language: # Force language, or auto switch by theme
    github_user: 你的github ID
    github_repo: 刚才填的仓库名(注意，只要名字，不要链接)
    client_id: 刚才申请的ClientID
    client_secret: 刚才申请的Client Secret
    proxy_gateway: # Address of api proxy, See: https://github.com/aimingoo/intersect
    redirect_protocol: # Protocol of redirect_uri with force_redirect_pro
    ```

- 添加gitment.ejs

    有的主题有，我的是自行创建的。
    ```html
    <!-- 放gitment的div -->
    <div id="gitment"></div>
    <!-- 下面两个链接时助你越过一个大坑 -->
    <script src="https://cdn.jsdelivr.net/gh/theme-next/theme-next-gitment@1/gitment.browser.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/theme-next/theme-next-gitment@1/default.css"/>
    <!-- 初始化gitment实例 -->
    <script>
        let gitment = new Gitment({
            // 关于id这一点要重点说下，这里又是一个大坑，在下面细说
            id: '<%= page.subtitle %>',
            // 这里要注意映入yml里面的配置 要加上theme,不然默认引入最外层的config.yml
            owner: '<%= theme.gitment.github_user %>',
            repo: '<%= theme.gitment.github_repo %>',
            oauth: {
            client_id: '<%= theme.gitment.client_id %>',
            client_secret: '<%= theme.gitment.client_secret %>',
            },
        })
        gitment.render('gitment')
    </script>
    ```

- 初始化gitment

    啥都整差不多了，只需`add commit push`三步走。部署完成后，在文章页面找到你的留言区域，使用你的Git帐号登录授权，然后点击出现的蓝色按钮，初始化！

    初始化完成后还不留言测试下？

    'comment'！这时候可以去你的博客留言仓库看下，会发现`issue`板块多了你的文章标题，并且其中还有你的测试信息。那么恭喜你，gitment搭建完毕，剩下的就是根据你的喜好改变样式了。

- gitment的坑

    - gitment原始的js、css外链因为作者已经不维护，其内部有个请求的url已不存在，会导致gitment的主人初始化一直转圈圈。就用我这个吧，这是被大佬们down下来加了cdn的，稳。

    - 初始化实例的id。此id默认是获取文章的title作为id，这就意味着你的文章标题不能够恣意洒脱的长短由心。吾辈中人岂能受这气？尤其是像我这样标题喜欢浪的。苦苦寻觅之下，终得一良方，便是在文章的Front Matter(md文章最上边的变量区域)里加入一个变量`subtitle`，并将其赋值给id。

        ```markdown
        ---
        title: 一分钟速成hexo搭建博客教学
        subtitle: learn hexo
        date: 2019-04-18 22:12:46
        tags: 教程
        ---
        ```

        如此这般，即可解决此大坑。

        另外，为了方便以后的使用，可以在`/scaffolds/post.md`中，加入此变量。

        ```md
        ---
        title: {{ title }}
        subtitle:
        date: {{ date }}
        tags:
        ---
        ```

#### 网易云音乐

- 进入<u>[网易云音乐](https://music.163.com/)</u>，选择你喜欢的歌，点击`生成外链播放器`，就可得到一个html的iframe标签

- 插进去

#### 代码高亮的mac panel样式
  > 这里不得不说下写博客的其中一条初衷，那就是让更多人从`百度`这种**搜索引擎的重复答案中，能找到几篇文章是不浑水摸鱼、CV大师的。
  - 在搜寻更好看，简约的高亮主题中，我被这款迷住了双眼。果然，设计领域中只有mac设计和仿mac设计。话不多说，下面是这种风格效果的实现

  - 首先，我们要知道 `mac panel` 这种效果并不是一种代码高亮的主题，其只是在代码区域外层做的一个样式包裹。所以，我们的主要问题和解决途径就是如何修改代码的外围区域

  - 我们在博客的根目录下创建一个`scripts`文件夹，其中放置一些我们需要的全局脚本文件

  - 新建`codeblock.js`文件，在其中我们使用hexo的api`after_post_render`，用于在文章页渲染时做代码区域的处理

  - 主要代码构成如下（这里无需引入什么模块，hexo执行相关命令的时候会自动访问）

	```javascript
	const attributes = [    // 用于panel外层div的属性
		'autocomplete="off"',
		'autocorrect="off"',
		'autocapitalize="off"',
		'spellcheck="false"',
		'contenteditable="true"'
	]
	const attributesStr = attributes.join(' ')
	// 此方法可以获取所有文章的全部内容，具体可以打印 data
	hexo.extend.filter.register('after_post_render', data => {
		// 这里是使用while持续获取匹配到的代码区域的dom标签
		// 这里可能就有人问'为什么别人的文章都是/<figure ***>/你的是/<pre>***/'
		// 你说为啥不一样，我们用的不是一个主题呗，这里的正则是根据你当前主题内文章渲染后代码区域的dom标签来定
		// 查看dom都会吧
		while (/<pre>(([\s\S])*?)<\/pre>/.test(data.content)) {
			// 之后的操作就是将匹配到的标签，在其外层拼接一个div，然后返回所有文章
			data.content = data.content.replace(/<pre>(([\s\S])*?)<\/pre>/, () => {
				let lastMatch = RegExp.lastMatch
				let language = RegExp.$1.match(/(?<= )class=".*?"/)[0].split('=')[1] || 'plain'
				lastMatch = lastMatch.replace(/<pre>/, '<pre class="iseeu">')
				return `<div class="highlight-wrap"${attributesStr} data-rel=${language.toUpperCase()}>${lastMatch}</div>`
			})
		}
		return data
	})
	```
- `highlight-wrap`的css样式，写在你的主题目录下的全局css/less/scss/...文件中
	
	```scss
	/* mac panel */
	.highlight-wrap[data-rel] {
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		box-shadow: 0 10px 30px 0px rgba(0,0,0,0.4);
		margin: 35px 0;
	}
	.highlight-wrap[data-rel] ::-webkit-scrollbar {
		height: 10px;
	}
	.highlight-wrap[data-rel] ::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
		border-radius: 10px;
	}
	.highlight-wrap[data-rel] ::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
	}
	.highlight-wrap[data-rel] ::before {
		color: white;
		content: attr(data-rel);
		height: 38px;
		line-height: 38px;
		background: #21252b;
		color: #fff;
		font-size: 16px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		font-family: 'Source Sans Pro', sans-serif;
		font-weight: bold;
		padding: 0px 80px;
		text-indent: 15px;
		float: left;
	}
	.highlight-wrap[data-rel] ::after {
		content: " ";
		position: absolute;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		background: #fc625d;
		width: 12px;
		height: 12px;
		top: 0;
		left: 20px;
		margin-top: 13px;
		-webkit-box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
		box-shadow: 20px 0px #fdbc40, 40px 0px #35cd4b;
		z-index: 3;
	}
	.highlight-wrap[data-rel] pre {
		margin: 0;
		padding: 40px 0 10px;
	}
	```
    
- 全部配置完毕，运行`hexo s`，查看运行效果，基本上就已经完成了(css细节自行调节)

#### live2d动画

加入右下角可爱的动画人物

- 安装步骤 [看这里](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)

- 各种[看板娘演示demo](https://huaji8.top/post/live2d-plugin-2.0/)

#### 不蒜子统计

使用不蒜子统计博客的uv,pv.

- 在主题下`/layout/_partial/footer.js`中引入不蒜子脚本
	```js
	<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
	```
- pv && uv的显示

	```html
	<!-- 站点总访问量(总pv) -->
	<span id="busuanzi_container_site_pv">
		总访问量<span id="busuanzi_value_site_pv"></span>
	</span>
	<!-- 当前页面访问量(单页pv) -->
	<span id="busuanzi_container_page_pv">
  	当前页面访问量<span id="busuanzi_value_page_pv"></span>
	</span>
	<!-- 站点所有进入用户数(总uv) -->
	<span id="busuanzi_container_site_uv">
  	本站访客数<span id="busuanzi_value_site_uv"></span>
	</span>
	```
