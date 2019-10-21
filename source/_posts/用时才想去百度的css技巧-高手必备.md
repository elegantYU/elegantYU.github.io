---
title: 用时才想去百度的css技巧(高手必备)
date: 2019-10-21 11:36:17
subtitle: cssisgood
tags: [css, 高手必备]
index_img: https://w.wallhaven.cc/full/g8/wallhaven-g8pdpe.jpg
---
多喝热水♨️
<!-- more -->

这里的css部分是根据项目总结的，还有些有的没的，来自于个人兴趣。
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

## [flex子元素单独靠右/左]

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
> 行为与auto相同，但滚动条绘制在内容之上而不是占用空间。 仅在基于WebKit（例如，Safari）和基于Blink的（例如，Chrome或Opera）浏览器中受支持。

## [图片设置等比例]

```scss
img {
  width: 300px;
  height: 100px;
  object-fit: contain;
}
```
![19112103.gif](https://i.loli.net/2019/10/21/k5KDsSOReahWqLd.gif)

> contain/cover 属性参照background-size

## [filter模糊滤镜]
```scss
img {
  filter: blur(2px);
}
```
![19112104.gif](https://i.loli.net/2019/10/21/mI9ptxfe8RVP74a.gif)

> blur函数内像素越大，模糊程度越高

## [filter图片置灰]
```scss
img {
  filter: grayscale(0.8);
}
```
![19112105.gif](https://i.loli.net/2019/10/21/2vtndUoANSj9Wpy.gif)

## [css性能优化]

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

> will-change主要作用就是“增强页面渲染性能”，比transform3D，scaleZ要更语义化。
> 在页面点击、hover、滚动等事件会触发大面积的页面重绘或重排时，浏览器往往是没有准备的，只能被动使用cpu去计算与重绘，于是掉帧、卡顿就来了。
> will-change属性就是在行为触发前，通知浏览器启动GPU渲染。
> 不过will-change需要适度使用，全局开启GPU渲染的话，你的机器也受不了，这样反而是性能灾难。最好在事件发生时，加入此属性，事件结束时，及时将will-change去掉。