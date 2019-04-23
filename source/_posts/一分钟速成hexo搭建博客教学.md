---
title: 一分钟速成hexo搭建博客教学
subtitle: learn hexo
date: 2019-04-18 22:12:46
tags: 教程
index_img: http://www.freehao123.com/wp-content/uploads/2016/08/Hexo-blog-jianzhan_1.jpg
---

> 此篇博客乃在下历时月许，拖沓至今才准备出的hexo+github搭建博客教学。
> 从头至尾皆是本人的亲生体会，希望对大家有所借鉴和帮助

<!-- more -->
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE) [![HitCount](http://hits.dwyl.io/elegantYU/elegantYUgithubio.svg)](http://hits.dwyl.io/elegantYU/elegantYUgithubio)


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

none