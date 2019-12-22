---
title: 用时才想去百度的css技巧(高手必备)
date: 2019-10-21 11:36:17
subtitle: cssisgood
tags: [css, 高手必备]
hide_excerpt: true
banner: ../images/wallhaven5.jpg
photos:
  - ../images/wallhaven5.jpg
---

换季了，多喝热水 ♨️

<!-- more -->

这里的 css 部分是根据项目总结的，还有些有的没的，来自于个人兴趣。
瞧一瞧看一看，不要你一分钱，赔本赚吆喝。

多图预警!

## [垂直水平居中]简易版

```scss
.main {
  height: 200px;
  display: flex;
  .box {
    width: 100px;
    height: 100px;
    background-color: pink;
    margin: auto;
  }
}
```

![19112101.gif](https://i.loli.net/2019/10/21/DFGkYZjnUI9gzbH.gif)

## [flex 子元素单独靠右/左]

```scss
ul {
  display: flex;
  align-item: center;
  justify-content: space-between;
  li {
    width: 100px;
    height: 100px;
    background-color: pink;
    // margin-left: auto;
  }
}
```

![19112102.gif](https://i.loli.net/2019/10/21/KZEmDfbs3zIx6lX.gif)

## [滚动条不占位]

```html
<style>
  .main {
    height: 100px;
    overflow: overlay;
  }
</style>
<body>
  <div class="main">
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
    阿里斯顿将阿拉山口打算的，阿里斯顿将阿拉山口打算的，
  </div>
</body>
```

> 行为与 auto 相同，但滚动条绘制在内容之上而不是占用空间。 仅在基于 WebKit（例如，Safari）和基于 Blink 的（例如，Chrome 或 Opera）浏览器中受支持。

## [图片设置等比例]

```scss
img {
  width: 300px;
  height: 100px;
  object-fit: contain;
}
```

![19112103.gif](https://i.loli.net/2019/10/21/k5KDsSOReahWqLd.gif)

> contain/cover 属性参照 background-size

## [filter 模糊滤镜]

```scss
img {
  filter: blur(2px);
}
```

![19112104.gif](https://i.loli.net/2019/10/21/mI9ptxfe8RVP74a.gif)

> blur 函数内像素越大，模糊程度越高

## [filter 图片置灰]

```scss
img {
  filter: grayscale(0.8);
}
```

![19112105.gif](https://i.loli.net/2019/10/21/2vtndUoANSj9Wpy.gif)

## [css 性能优化]

```scss
.main {
  height: 200px;
  &:hover {
    .box {
      transform: translateX(0);
      will-change: transform;
    }
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: pink;
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
}
```

![19112106.gif](https://i.loli.net/2019/10/21/jZL9AQhCf8xpO7E.gif)

> will-change 主要作用就是“增强页面渲染性能”，比 transform3D，scaleZ 要更语义化。
> 在页面点击、hover、滚动等事件会触发大面积的页面重绘或重排时，浏览器往往是没有准备的，只能被动使用 cpu 去计算与重绘，于是掉帧、卡顿就来了。
> will-change 属性就是在行为触发前，通知浏览器启动 GPU 渲染。
> 不过 will-change 需要适度使用，全局开启 GPU 渲染的话，你的机器也受不了，这样反而是性能灾难。最好在事件发生时，加入此属性，事件结束时，及时将 will-change 去掉。

## [多行文字省略]

```html
<style>
  .more_list {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
<body>
  <div class="box">
    <p class="more_list">
      测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字测试多行文字
    </p>
    <span class="more_list_en"
      >howToDohowToDohowToDohowToDohowToDohowToDohowToDohowToDohowToDohowToDohowToDohowToDo</span
    >
  </div>
</body>
```

## [禁止当前盒子外的 scorll]

```css
.div {
  overscroll-behavior: none;
}
/**
  *  默认情况下，当触及页面顶部或者底部时（或者是其他可滚动区域），
  *  移动端浏览器倾向于提供一种“触底”效果，甚至进行页面刷新。
  *  当对话框中含有可滚动内容时，一旦滚动至对话框的边界，对话框下方的页面内容也开始滚动了——这被称为“滚动链”。
  *  [auto | contain | none]
  */
```

![19102801.gif](https://i.loli.net/2019/10/28/XE1Hq5i79FZeBhl.gif)

> -webkit-line-clamp 是一个不规范的属性，限制一个块元素显示的文本行数，为了实现该效果，需要其他 webkit 属性配合
> display 属性为 -webkit-box ，-webkit-box-orient 用于控制盒子内子元素的排列顺序 vertical
> 若标签内是英文，英文是不会自动换行的，需要加入 word-wrap: break-word; word-break: break-all;
