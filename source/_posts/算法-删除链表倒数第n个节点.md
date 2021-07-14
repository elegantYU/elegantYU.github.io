---
title: 算法-删除链表倒数第n个节点
hide_excerpt: true
date: 2021-07-14 17:26:26
tags: 算法
subtitle: algorithm-reomveNodeFromEnd
cover:
---

干算法第三天

<!-- more -->

## 题目

给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

你能尝试使用一趟扫描实现吗？

示例：

```js
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

(原题传送门)[https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/]

## 思路

说实话，没有思路。

看了别人的思路，也很摸不到头脑，像是背后有答案的奥数题，看着答案抄能做出来，但是完全没有记忆点。

算了，不多 bb

### 链表结构

复习下链表结构

```ts
interface ListNode {
	value: number;
	next: ListNode | null;
}
```

```js
function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}
```

### 如何删除链表节点

例： 给出下面链表，删除 D `n = 3`

```js
A -> B -> C -> D -> E -> F
```

要先获取到 D 前面的节点 C , 方可 `C.next = C.next.next` 将 D 删除

### 双指针 + 一点点数学

- 扫描顺序从 A 开始，创建 curr 变量指向当前链表，创建 pre 变量也指向当前链表(都是初始链表)，扫描步数 `i = 1` 开始
- 开始扫描时，curr 一直走，当 curr 与 pre 的距离为 n 时(`步数大于 n`)，pre 也开始移动
- 当扫描到 curr 变量指向 End 节点时，当前的 pre 节点即为需要删除的节点的上级节点

```js
function removeNthFromEnd(list, n) {
	// 加入了起点占位节点
	let curr = list;
	let pre = list;
	let i = 1;

	while (curr.next) {
		if (i > n) {
			pre = pre.next;
		}

		curr = curr.next;
		i++;
	}

	pre.next = pre.next.next;

	return list.val;
}
```

> 一定是长期做数学方面的人才能对数字这么敏感，想出这招吧...
