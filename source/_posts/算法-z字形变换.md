---
title: 算法-z字形变换
hide_excerpt: true
date: 2021-07-13 15:15:08
tags: 算法
subtitle: algorithm-covertz
cover:
---

肝算法第一天

<!-- more -->

## 题目

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行  Z 字形排列。

比如输入字符串为 "PAYPALISHIRING"  行数为 3 时，排列如下：

```js
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

```js
convert(s, numRows);
```

示例：

```js
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```

[原题传送门](https://leetcode-cn.com/problems/zigzag-conversion/)

## 思路

### 按照 z 形顺序查找

z 形图的行数 row 已知，我们可以创建 row 个数组来存放查到的元素 `[[], [], []]`

然后该怎么查询元素呢

根据例子我们可以看到，如果按照 左上 -> 左下 -> 下列上 -> 下列下 的顺序去读的话，和源字符串是一样的。

```js
P   A   H   N
A P L S I I G
Y   I   R
```

又可以看到，这里每 4 个数是一个周期，之后的形态和顺序也都是一致的。

还是不好总结规律？那么再多看一个不同行数的例子 (4 行)

```js
H     O
E   W R
L O   L !
L     D
```

这里的小周期是 6 个数

```js
row = 3;
cycle = 4;

row = 4;
cycle = 6;
```

可以得到规律 `cycle = row + row - 2`, 即 `cycle = 2 * row - 2`

---

看到这里应该有个模糊的思路，这个解法和周期有关，但是循环 左上 -> 左下 之后该怎么处理，才能把后面 **数的索引** 与 **对应行数** 关联呢

这里就有两种解法

1. 取余

可以将循环 s 字符串的索引 i，与 cycle 周期取余 `remiander = i % cycle`，这个余数就是每个小周期内元素的位置

remainder(余数) 若小于 row， 则 s[i] 可以插入 res[i] 中；

大于或等于的条件，正是处于 左下 -> 下列上 的路线里，而 `cycle - remainder` 就等于其对应的 res 的索引

代码如下

```js
function convert(s, row) {
	// 所有行数组
	const res = Array.from(Array(row), () => Array(s.length));
	const cycle = 2 * row - 2;

	for (let i = 0, len = s.length; i < len; i++) {
		const remainder = i % cycle;

		if (remainder < cycle) {
			res[remainder].push(s[i]);
		} else {
			res[cycle - remainder].push(s[i]);
		}
	}

	return res.reduce((str, arr) => `${str}${arr.join("")}`, "");
}
```

2. flag 定义拐点

这个解法也是很奇妙，逻辑死板的我是没想到，利用 flag 定义查找的方向和差值

主要是拐点判断的方式不同换汤不换药

```js
function convert(s, row) {
	const res = Array.from(Array(row), () => Array(s.length));
	const cycle = 2 * row - 2;

	let flag = -1;
	let rowIdx = 0;

	for (let i = 0, len = s.length; i < len; i++) {
		res[rowIdx].push(s[i]);

		// 周期结束后 flag 取反， 左上 -> 左下 flag 为 1； 左下 -> 下列上 flag 为 -1
		if (rowIdx === 0 || rowIdx === row - 1) {
			flag = -flag;
		}

		// rowIdx 在左下 -> 下列上的路线中，会再变为 0
		rowIdx = rowIdx + flag;
	}

	return res.reduce((str, arr) => `${str}${arr.join("")}`, "");
}
```

### 按照结果顺序，逐行查找

这种解法是我刚开始的思路，**获取每行的每列间的规律**, 但是脑子里只有一个大概的想法，不能精简提炼出来。

```js
这              服
个          的  所
解      真      以
法  是          要  到
我              嫖
```

第一行和最后一行，每个元素间 index 的差值为 2 \* row - 2

第 i 行，index 分别是

```
1 7 9
2 6 10
3 5 11 13
```

间距差值为

```
6 2
4 4
2 6 2
```

这与每行索引 i(1 | 2 | 3) 、 周期 cycle(8) 的联系是什么呢

```
cycle - 2 * i   2 * i
cycle - 2 * i   2 * i
cycle - 2 * i   2 * i   cycle - 2 * i
```

综上可以的规律：

- 第一行与最后一行间距固定，为 2 \* row - 2
- 第 i 行间距是两个值交替，2 _ row - 2 - 2 _ i || 2 \* i
- 每行元素下标，不会超过 s 长度

```js
function convert(s, row) {
	const cycle = 2 * row - 2; //  周期
	let nextIdx = 0; //  每行下个元素的下标
	let offset = 0; //  交替变化的元素间距
	let res = "";

	for (let i = 0; i < row; i++) {
		// 下一行的起始 i
		nextIdx = i;
		offset = 2 * i;

		while (nextIdx < s.length) {
			res += s[nextIdx];
			// 这是最精巧的一步，offset会交替变为 2 * i 或 cycle - 2 * i
			offset = cycle - offset;
			// 当前行是第一行或最后一行
			nextIdx += i === 0 || i === row - 1 ? step : offset;
		}
	}

	return res;
}
```

最后一种解法很高效，无论空间和时间都远超上面解法，不过找规律这块真的把我搞住了，之后直接选择了第一种解法。

> 希望面试别遇到
