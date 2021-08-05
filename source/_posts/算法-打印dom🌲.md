---
title: "算法-打印dom🌲"
hide_excerpt: true
date: 2021-08-04 11:17:14
tags: 算法
subtitle: algorithm-printDomTree
cover:
---

DFS && BFS

<!-- more -->

## 题目

页面有如下 dom 标签，如何按照结构输出以下排列的标签名

```js
dom: 

<header>
  <logo />
  <nav>
    <ul>
      <li />
      <li />
      <li />
    </ul>
  </nav>
</header>
<aside />
<section>
  <article>
    <div></div>
  </article>
</section>

输出: 
header
logo
nav
ul
li
li
li
aside
section
article
div
```

## 思考

根据 dom 结构和打印顺序，可以看到是深度优先遍历 DFS (deep first search)

获取标签名后输出，代码如下

```js
function DFStree (root = document.body) {
  const children = Array.from(root.children)

  if (children.length) {
    for(let i = 0; i < children.length; i++) {
      const el = children[i]
      console.log(el.tagName)
      DFStree(el)
    }
  }

  return
}
```

> easy

如果输出顺序改一下呢

```js
header
aside
section
logo
nav
article
ul
div
li
```

即 BFS 广度优先遍历，how？

利用队列思想，将同层 dom 打印时，判断其是否有 children，若有则加入队列，等待下次打印

```js
function BFStree(root = document.body) {
  const list = []
  const children = Array.from(root.children)

  children.map(v => list.push(v))

  let idx = 0
  while(idx < list.length) {
    const el = list[idx]
    const { tagName, className } = el
    console.log(`${tagName} --- ${className}`)

    if (el.children.length) {
      list.push(...Array.from(el.children))
    }

    idx++
  }
}
```