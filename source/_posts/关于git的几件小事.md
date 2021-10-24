---
title: 关于git的几件小事
hide_excerpt: true
date: 2021-10-24 09:57:10
tags: git
subtitle: team-git
cover:
---

# 认识工作流

git工作流，即 git 仓库单人/多人操作时所遵守的一种流程模式。

常见的工作流分支

分支 | 功能
:----- | :-------------
master | 主干分支，一般用于集合所有发布版本
develop/dev | 开发分支，用户集合所有在开发中的版本
release | 待发布版本分支，集合当前版本所有需求
feature | 每个需求需要在自己的 featrure 分支中开发
hotfix | 来自发布后出现的 bug 需要从 master 拉取 hotfix 分支进行修复，修复完毕合并回 master 与 develop 分支

## 公司现有的工作流分析

1. 小程序项目
   
   小程序项目现有的工作流程较为明确

   - [master] 分支负责集合发布 release 分支，堡垒环境测试通过后可直接上线
   - [release + 发布日期] 分支作为每个版本的需求集合分支，堡垒及之前的测试环境都可使用
   - [featrue] 分支暂时没有统一分支格式，单个需求开发，开发完毕后合并到 release 分支
   - [hotfix] 分支暂时没有统一分支格式

2. h5 项目
   
   h5 页面项目工作流理解简单，只有 master 和 feature 的分支配合

3. 更简单的个人负责的项目
   
   一条 master 分支搞定一切

# 多人合作中应注意到的事情

多人项目做多了，会暴露很多问题，有些人可能注意到但工作完就忘记，有些是埋头开发不管其他

## branch 命名

  这里主要提及的就是 feature 和 hotfix 的分支命名，由于缺少命名规范，大家对命名都有自己的理解，eg: 弱引导需求

  ```
    1. feat-weakGuide
    2. feature-weakGuide
    3. feat/weakGuide
    4. feat_weakGuide 
    5. weak-guide
  ```
  
  个人目前使用 1 的格式，前前东家内的格式为`[分支类型]-[发布版本]-[功能名]`进行约束，查看 branch list 会直观查询到自己寻找的分支

  ```
    feat-0930-xxxx
    feat-1028-weakGuide
    feat-1030-yyyy
  ```

  当然，搭配成团队适合，大家都能接受的规范才是好规范

## commit 规范

  建议直接看阮一峰的 [commit message 与 change log](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)，这里简单介绍下 commit message 的 header 部分

  header 就是我们常用的 commitlog，`git commit -m '这里是 header'`

  header 规范由三个部分组成 `[type]([scope]): [subject]` ，例如

  ```bash
  git commit -m 'feat(robShare): 新增任意行活动入口;样式优化;bug修复'
  ```

  - type 类型

    一般为以下几种类型

    名称 | 描述
    :--- | :---
    feat | 新功能/需求(feature)
    fix | 修复了 bug
    style | 样式调整，不影响代码逻辑
    pref | 优化，可能是代码格式化，或代码优化
    docs | 文档
    ... | ...

  - scope 范围

    这是个可选项，用于方便代码审查时直观了解到这个 commit 的作用范围

    比如，这次需求主要在 robShare 页面里的修改，但只看 subject 不能直接了解到是哪个文件夹/页面，这时， scope 就是很有必要的

    ```
    fix(common/util): xxx工具函数调整
    ```

  - subject

    这就没什么具体的规范了，已直观、概括为主，可用分号隔离不同的描述

## commit message 的客户端工具

  网上有很多对于提交信息的约束工具，我的个人项目一般都是用 `husky + commitlint`

  - [husky](https://github.com/typicode/husky) 是一个 githook工具，在 package.json 中配置 git hooks 用于处理各个阶段的问题
  - [commitlint](https://github.com/conventional-changelog/commitlint) 用于 commit message 的格式校验


  简单配置如下：
  
  package.json
  ```json
  "husky": {
		"hooks": {
			"commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
		}
	}
  ```
  commitlintrc.js
  ```js
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        ['build', 'ci', 'chore', 'feat', 'docs', 'fix', 'perf', 'refactor', 'style', 'notes', 'wip', 'version'],
      ],
    },
  };
  ```

# git操作 常见/可能 会遇到的问题

1. git add 后想撤销
   
    编辑器的 git 控制台可以操作撤回，或者使用 `git reset HEAD`命令

2. git commit 后想撤回

  - 找到想撤回的 commitid，获取其前一版本的 commitid
  - `git reset --hard <commitid>`

3. git commmit 后发现开发的分支错了

  - 获取这次修改提交的 commitid
  - 切换到需要正确的分支
  - `git cherry-pick <commitid>`
  - 可以转移多个提交 `git cherry-pick <commitid A> <commitid B>`

4. 压缩本地开发的 commit
   
   本地开发可能由于各种情况，会出现一个分支有多个无用的 commit

   ```bash
    hash a
      wip: 没写完
    hash b
      wip: 还没写完
    hash c
      wip: 就快写完了
   ```

   如果当前分支直接合并在 release 上，会使得分支树 log 很多，并且代码审核时很费劲，尽量保证每次合并分支，只有一次有效 commit。

   所以我们需要对本地的 commmit 进行压缩

   ```bash
    git rebase -i <commitid c>

    ----- 会出现以下场景

    pick [hash a] wip: 没写完
    pick [hash b] wip: 还没写完
    pick [hash c] wip: 就快写完了
    
    ----- 除了顶部第一个 commit 不修改之外，剩下的 pick 改为 squash | s

    pick [hash a] wip: 没写完
    s [hash b] wip: 还没写完
    s [hash c] wip: 就快写完了

    ----- 保存退出后，需要填写压缩后的 commit message，修改后保存退出
   ```

   如此就合并了许多无特殊意义的 commit
  
5. 压缩后后悔了，怎么撤销

    这里要了解下 `git reflog` 可以查看 git 的所有操作记录，其内所有的 commitid 都是可以进行回滚的

6. 分支重命名

    在需要改名的分支下 `git branch -m <newname>`

7. 修改 commit message

    `git commit --amend`

...


以上都是为了方便团队协同和提升个人开发规范性，各种命令若是有 GUI 可以替代的话，可以选择自己更方便的操作。