---
title: LeetCode-最长回文子串
hide_excerpt: true
date: 2020-11-09 15:55:26
tags: leetcode
subtitle: longest-palindromic-substring
cover: https://i.loli.net/2020/11/10/dbqljihTU6VuLQc.jpg
---

# 最长回文子串 - 5

[原题链接](https://leetcode-cn.com/problems/longest-palindromic-substring/)

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

## 示例
```code
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
--------
输入: "cbbd"
输出: "bb"
```

## 分析题意

题目意思很好理解，回文：即正过来反过去都是同一个字符串。

> 看到这里很多人一定想知道怎么获取最长回文子串，小编也想知道怎么获取最长回文子串，今天小编就带大家看一下什么是最长回文子串以及怎么获取最长回文子串。好了以上就是获取最长回文子串的方法，希望小编精心整理的这篇内容能够解决你的困惑。

工作人员操作失误，竟被百家号小编抢走写了一段...好了，废话不多说，继续看题

首先，我们知道了什么是回文后，就可以得到如何判断字符串是否是回文
```js
const s = 'abcba'
const r = s.split('').reverse().join('')

if (s === r) return s
```
稍微枚举下所有可能的字符串，便知道，我们可以使用两个循环遍历出所有的选择
```bash
a
ab
abc
abcb
abcba 
------
b
bc
bcb
bcba
----
....
```
再看下边界条件，长度为0 或 1 的字符串可以作为回文字符串返回，长度 2 以上需要做判断。

综合以上条件，可以用暴力解法得到

### 暴力解题
```js
const longestPalinDromeForce = s => {
  const len = s.length
  const cache = []  //  存放所有回文子串
  
  if (len < 2) return s

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const curr = s.slice(i, j + 1)
      const res = curr.split('').reverse().join('')
      curr === res && cache.push(curr)
    }
  }

  // 所有子串长度递减排序 拿最长的
  const max = cache.sort((a, b) => b.length - a.length)[0]

  return max
}

longestPalinDromeForce('abbac')  //  输出： abba
```

wocao!太简单了吧，虽然很暴力，“又不是不能用”。

我们在内部加上`console.time('暴力解法')` 和 `console.timeEnd('暴力解法')`看下运行用时，换上这个例子
```js
longestPalinDromeForce('jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx')

// 输出  暴力解法: 1192.661ms
```
面试官集体失声，哭着对你说：咱优化下吧。

### 再次分析
究竟是什么导致执行时间这么长呢，我们从头思考下，回文的特性

- **回文两端必相等**
- **一个回文首尾加上相同的字符，必是回文**

例如：
```js
const str = 'ababc'
// a √
// ab 两端不相等 ×
// aba 两端相等，中间 b 是回文 √
// abab 两端不等 ×
// ...
// b √
// ba 两端不等 ×
// bab 两端相等，中间 a 是回文 √
// ...
```
由此，我们可以得到回文判断方程 

`是否是回文 = (s[i] === s[j] && s[i + 1] === s[j - 1] && s[i + 2] === s[j - 2]...)`

如上述回文特性第二条所说，两端相等且中间是回文的，必是回文，再次简化

`回文 = s[i] === s[j] && 中间是回文`

判断公式有了，下一步就是获取 (i ... j) 区间内字符是否是回文的判断了，这时候有人说了

“我知道我知道，里面再加个递归嘛，这题我会”

面试官悠长得吐了口烟：“回去等通知吧”

......

按照暴力解法里面的遍历顺序，我们没有办法去提前得知 `a...a` 中间是否是回文，但是 i++ 下次循环就可以得到下一层的首尾判断，所以我们逆向循环试试
```js
const s = 'abbav'
const len = s.length

// 从尾部开始
for (let i = len - 1; i >= 0; i--) {
  // 内部循环需从当前 i 位置，开始遍历保证截取字符串的顺序
  for (let j = i; j < len; j++) {
    // 内部枚举如下
    // 4 4 v
    // 3 3 a
    // 3 4 av
    // 2 2 b
    // 2 3 ba
    // 2 4 bav
    // 1 1 b
    // 1 2 bb
    // 1 3 bba
    // 1 4 bbav
    // 0 0 a
    // 0 1 ab
    // 0 2 abb
    // 0 3 abba
    // 0 4 abbav
  }
}
```

又因为 (i ... j) 区间内部的回文，我们不需要知道具体内容，只需要一个判断的结果，在循环外加上一个二维数组存入i、j坐标，及其判断结果，下次循环直接利用存入的判断，减少重复判断

至此，我们再写一下
```js
const len = s.length
let cache = []  //  坐标数组

for(let i = len - 1; i >= 0; i--) {
  cache[i] = [] //  初始化 i 位置
  for (let j = i; j < len; j++) {
    if (j - i === 0) {  //  单个字符
      cache[i][j] = true
    } else if (j - i === 1 && s[i] === s[j]) {  //  两个字符
      cache[i][j] = true
    } else if (s[i] === s[j] && cache[i + 1][j - 1]) {  //  多个字符
      cache[i][j] = true
    }
  
    if (cache[i][j]) {
      console.log('这个区间的字符 就是回文字符')
    }
  }
}
```

### 最终整合版
```js
const longestPalindrome = (s) => {
	console.time("最终整合版");
	const len = s.length;
	if (len < 2) return s;

	let cache = [];
	let max = "";

	for (let i = len - 1; i >= 0; i--) {
    cache[i] = []
		for (let j = i; j < len; j++) {
			if (j - i === 0) {
				cache[i][j] = true;
			} else if (j - i === 1 && s[i] === s[j]) {
				cache[i][j] = true;
			} else if (s[i] === s[j] && cache[i+1][j-1]) {
				cache[i][j] = true;
			}

      // 判断长度 替换max
			if (cache[i][j] && j - i + 1 > max.length) {
				max = s.slice(i, j + 1);
			}
		}
	}

	console.timeEnd("最终整合版");
	return max;
};

longestPalindrome("jrjnbctoqgzimtoklkxcknwmhiztomaofwwzjnhrijwkgmwwuazcowskjhitejnvtblqyepxispasrgvgzqlvrmvhxusiqqzzibcyhpnruhrgbzsmlsuacwptmzxuewnjzmwxbdzqyvsjzxiecsnkdibudtvthzlizralpaowsbakzconeuwwpsqynaxqmgngzpovauxsqgypinywwtmekzhhlzaeatbzryreuttgwfqmmpeywtvpssznkwhzuqewuqtfuflttjcxrhwexvtxjihunpywerkktbvlsyomkxuwrqqmbmzjbfytdddnkasmdyukawrzrnhdmaefzltddipcrhuchvdcoegamlfifzistnplqabtazunlelslicrkuuhosoyduhootlwsbtxautewkvnvlbtixkmxhngidxecehslqjpcdrtlqswmyghmwlttjecvbueswsixoxmymcepbmuwtzanmvujmalyghzkvtoxynyusbpzpolaplsgrunpfgdbbtvtkahqmmlbxzcfznvhxsiytlsxmmtqiudyjlnbkzvtbqdsknsrknsykqzucevgmmcoanilsyyklpbxqosoquolvytefhvozwtwcrmbnyijbammlzrgalrymyfpysbqpjwzirsfknnyseiujadovngogvptphuyzkrwgjqwdhtvgxnmxuheofplizpxijfytfabx")

//  输出 最终整合版: 19.145ms！！！！
```

面试官：“我们来谈谈薪资吧”


## 小结

对于这种内部子循环可以复用，且有一个`条件|状态`判断方程的，我们都可以使用这种解法思想去实现，此之谓“动态规划”。

- 确定题目结果的特性
- 根据推导过程抽象得到一个判断方程(正推，逆推都需要，获得最优解)
- 思考如何省略可复用结果
- 获取初始值 和 边界情况的判断
- 结果输出的判断

当然，条条大路通罗马，解法是没有定数的，一定还有更优的解法，但毕竟本人也不是专门肝算法的，能够用一个不错的算法思想去解决问题，Enough~








