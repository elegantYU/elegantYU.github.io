---
title: 'Map不挺好用的,你还...'
hide_excerpt: true
date: 2020-04-06 15:12:45
tags: 都是皮毛
subtitle: es6-map
cover: 
---

闲来无事水一篇。

## Map?

记得那是es6，它带来了很多，很多改变。其中一个变化就是Map数据结构。

它和对象类似也是键值对的集合，但是“键”的范围不局限于字符串，各种类型的值都可以当做键。

概念源自[阮一峰es6](https://es6.ruanyifeng.com/#docs/set-map#Map)

```js
const map = new Map()

map.set('dog', '一种动物')  //  增
map.get('dog')            //  '一种动物' 查

map.has('tian dog')       //  false 断言
map.delete('dog')         //  true 删除
```

以上就是map实例的四种方法，那么就有读者问了：就这？我以为多厉害呢，就这？

## Map！

问的好！

这种东西就像是牙签，远看很不起眼，可是你近看，它还是就那样...不过！当你使用它把塞住牙缝中的肉丝儿整条挑出的时候，那种美妙舒爽的感觉会让你沉迷其中。

#### 举个栗子

现有确定的5种类型对应5个不同的值，怎么根据类型匹配返回对应的值呢？
“if else不香吗”
“还if else呢，switch case知道么”
“我不管！我就要硬写！学习？学个屁”

推了下眼镜，我要开始操作了
```js
const typeMap = new Map([
  [ '花', '某乐坛代表' ],
  [ '日', '指太阳' ],
  [ '草', '不只是植物' ],
  [ '狗', '一种常见的宠物' ],
  [ '舔狗', '指本人' ],
])

const typeHandler = type => {
  return typeMap.get(type)
}

typeHandler('狗')   //.. 输出 '一种常见的宠物'

```

天哪，也太好用了8

当然，现在看起来可能还不是很直观，下面写一个项目中遇到的需求。
根据不同的网址正则匹配，获取平台code并调用对应方法

```js
const getSomething = url => {
  const wxFunc = () => {}
  const bdFunc = () => {}
  const ggFunc = () => {}

  const platMap = [
    [/weixin/, 'wx'],
    [/baidu/, 'bd'],
    [/google/, 'gg'],
  ]

  const platHandler = new Map([
    ['wx', () => wxFunc],
    ['bd', () => bdFunc],
    ['gg', () => ggFunc],
  ])
  
  const plat = platMap.filter(v => v[0].test(url))[0][1]

  return platHandler.get(plat)()
}

getSomething('www.google.com')

// 写的暴力了点 意思到位就行 你懂我意思吧
```

如此写法，优点显而易见，便是条件和结果的对应关系十分明朗，代码易读性极佳，降低了后续增改的维护工作，只需要加入条件和方法即可。

## if ？ switch ？

map固然十分好用，能够有效的降低团队合作成本，并且看上去优雅。但这也不是完全抛弃传统条件判断的理由。

简单的逻辑使用if或swtich还是香的，我就是这么干的👍（露出洁白的牙齿，自信的微笑）


> 水一水，十年少

