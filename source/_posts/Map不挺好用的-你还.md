---
title: 'Map不挺好用的,你还...'
hide_excerpt: true
date: 2020-04-06 15:12:45
tags: 都是皮毛
subtitle: es6-map
cover: https://i.loli.net/2020/04/06/rA86NDZxPkJHfc3.jpg
---

闲来无事水一篇。

## Map?

记得那是es6，它带来了很多，很多改变。其中一个变化就是Map数据结构。

它和对象类似也是键值对的集合，但是“键”的范围不局限于字符串，各种类型的值都可以当做键。

概念源自[阮一峰es6](https://es6.ruanyifeng.com/#docs/set-map#Map)

```js
const map = new Map()

// 操作方法

map.set('dog', '一种动物')  //  增
map.get('dog')  //  '一种动物' 查

map.has('tian dog') //  false 断言
map.delete('dog') //  true 删除

// 遍历方法
map.keys()  //  返回键名遍历器
map.values()  //  返回键值遍历器
map.entries() //  返回所有成员的遍历器
map.forEach() //  遍历所有map成员
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

“可是，用对象一样可以做啊”

## Object || Map

如一开始所说，Map对象有内置的迭代器，Object没有迭代器

```js
console.log(typeof Object[Symbol.iterator])  //  undefined
console.log(typeof Map[Symbol.iterator])  //  function  Map[Symbol.iterator] == Map.entries()
```

#### 异同

- 一个Object的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值，包括函数、对象、基本类型。
- Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。
- Object对象若想遍历，需先获取其键数组，再进行迭代

#### 取舍

若所有的键都是字符串、整数或Symbol类型且都是已知的，你需要一个简单的数据结构去存储，那么使用Object是一个不错的选择。毕使用key值获取元素比使用构造函数(get())获取元素的性能好。

如果考虑元素迭代或顺序，或是有大量的增删操作，则Map性能更优。

## if ？ switch ？

Map数据结构的条件判断写法，优点显而易见的便是条件和结果的对应关系十分明朗，代码易读性极佳，降低了后续增改的维护工作，只需要加入条件和方法即可。

Map固然十分好用，能够有效的降低团队合作成本，并且看上去优雅。但这也不是完全抛弃传统条件判断的理由。

简单的逻辑使用if或swtich还是香的，我就是这么干的👍（露出洁白的牙齿，自信的微笑）

> 水一水，十年少

