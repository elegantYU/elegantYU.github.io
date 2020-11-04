---
title: LeetCode-两数相加
hide_excerpt: true
date: 2020-11-04 18:14:39
tags: leetcode
subtitle: add-two-numbers
cover: https://i.loli.net/2020/11/04/SIXhpZtHs1jEeBQ.jpg
---

# 两数相加 - 2

[原题链接](https://leetcode-cn.com/problems/add-two-numbers/)

给出两个 **非空** 的链表用来表示两个**非负**的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

## 示例
```code
输入: (2 -> 4 -> 3) + (5 -> 6 -> 4)
输出: 7 -> 0 -> 8
原因: 342 + 465 = 807
```

## 我的解法
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let result = temp = new ListNode()
  let exceed = 0

  while (l1 || l2 || exceed) {
    const sum = (l1 && l1.val || 0) + (l2 && l2.val || 0) + exceed
    const [e, n] = sum.toString().padStart(2, '0')

    l1 = l1 && l1.next
    l2 = l2 && l2.next

    exceed = Number(e)

    temp = temp.next = new ListNode(sum)
  }

  return result.next
}
```

## 心路历程
### 理解题意

看到题目，迅速扫过一眼...

什...什么?! 我竟然没有看懂!

逐字逐句再看一遍...

哦~原来是这样 (完全没懂啊！淦！我不信！)

......

题目需求：一个函数，入参两个逆序的链表，输出两个链表对位相加且可进位的链表 4 + 6 => 0 (进1，下一位求和 + 1)。

理解需求后，再看示例
```js
// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
```
`ListNode` 就是题目链表结构数据的构造函数。

eg: 2 -> 4 -> 6

val => 返回当前位置的数据 (eg: 2)

next => 返回一个剩下数据的 ListNode 链表 (eg: 4 -> 6)

数据结构清晰之后，就开始完成题目吧~

### 继续思考

怎么实现对位相加呢...有了！不如把入参的链表转换成数组形式，reverse后再转成字符串，l1 + l2 隐式转换的结果再转成字符串，再转数组，再转链表...

u1s1，可以，但没必要，会显得自己很蠢

-----

再回想一下 `ListNode` 的内部结构，提供 val 返回当前值，.next.val 返回下个位置值，.next.next.val 返回下下位置值...

我们是不是每个位的和利用 val 进行相加呢，然后只要每次获取后一位的值相加，就能获得每个位置的和，之后再转链表结构就OK🙆‍♂️了

嗯？仔细一想，有必要最后去转链表吗？先把它new出来，给其val赋值不就完了

那么问题来了，怎么去每次获取 l1 & l2 后一位值呢 l1.next.next.next....

看到这么多重复的 next 相比你已经知道了。没错，是递归！而，所有递归都是可以用循环表示，所以，我们使用 **whlie** 语句

怎么在while里获取两个链表的next呢，这里便是这道题的精妙之处，将链表 **A** 的 **A.next** 再获取完当前位的val之后，再赋值给 **A**!

”啊！原来是这样吗！“

”可恶，为什么我没想到！“

”斗宗强者恐怖😱如斯？“

”大佬大佬，我悟了！666！“

基操，勿6，皆坐，静观

同理可得，我们需要返回的链表 **result** 是不是也可以将求和的结果放在 **next** 里面，如
```js
// 伪代码
const result = new ListNode()

const sum = l1.val + l2.val

result.next = new ListNode(sum)

// 但是！只有这样是不够的！因为下次next赋值，会覆盖掉这次的值，所以 ⬇️
result = result.next
// 啊 这！你这样做的话那result将会是一个只有一个值的链表，而不是我们需要返回的一串数据！
// heh，还是，被看穿了吗，那么，这样如何！

// 将第一步 result = new ListNode() 换成
let result = temp = new ListNode()

temp = temp.next = new ListNode(sum)
// 学吧，学无止境，太深了
```

接着，是求和进位的问题，每次需要把进位加到下一次里面，我们可以在循环外定义这个进位的变量 `exceed`

```js
let exceed = 0

while () {
  const sum = l1.val + l2.val + exceed
  // 转成字符串后使用padStart方法使字符串保持两位，若是一位数则首位填充 0
  // 解构出来的变量e即为进位
  // 你也可以直接数字模10 取余数
  const [e, n] = sum.toString().padStart(2, '0')

  exceed = Number(e)
}
```

最后，只剩一个 ~~调教~~ 条件 了，循环的跳出条件

在入参链表获取到最后一位的时候跳出，但是题目没有说明两个参数的长度是否一致，所以，需要两个参数都判断。怎么判断呢？上面，我们在循环内部做了 `l1 = l1.next` 剩余链表结构赋值给其本身，根据已知条件，`this.next = (next===undefined ? null : next)`，可得在 l1 || l2 为true时需要继续执行。哎！是不是漏了什么，exceed呢？我这么大个进位呢？要是俩入参读完之后要进位咋办嘛。

最后最后，可得条件 `l1 || l2 || exceed` 时继续执行循环

推断结束，开撸开撸！

### 撸代码

```js
// 目前的思路
var addTwoNumbers = function (l1, l2) {
  let result = temp = new ListNode()
  let exceed = 0

  while (l1 || l2 || exceed) {
    // 万一 l1 || l2 谁跑完了...又是一个小细节
    const sum = (l1 && l1.val || 0) + (l2 && l2.val || 0) + exceed
    const [e, n] = sum.toString().padStart(2, '0')

    l1 = l1 && l1.next
    l2 = l2 && l2.next

    exceed = Number(e)

    temp = temp.next = new ListNode(sum)
  }

  // 因为new的时候首位是0，后面用的又都是next
  return result.next
}
```
简单却不失内涵，~~每天一件潮流穿搭...~~

慢慢悟吧
