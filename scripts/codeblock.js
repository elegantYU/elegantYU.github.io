const attributes = [
  'autocomplete="off"',
  'autocorrect="off"',
  'autocapitalize="off"',
  'spellcheck="false"',
  'contenteditable="true"'
]

const attributesStr = attributes.join(' ')

hexo.extend.filter.register('after_post_render', data => {
  while (/<pre>(([\s\S])*?)<\/pre>/.test(data.content)) {
    data.content = data.content.replace(/<pre>(([\s\S])*?)<\/pre>/, () => {
      let lastMatch = RegExp.lastMatch
      let language = RegExp.$1.match(/(?<= )class=".*?"/)[0].split('=')[1] || 'plain'
      lastMatch = lastMatch.replace(/<pre>/, '<pre class="iseeu">')
      // console.log('什么语言',typeof RegExp.$1)
      // console.log('最后一次匹配',lastMatch)
      return `<div class="highlight-wrap"${attributesStr} data-rel=${language.toUpperCase()}>${lastMatch}</div>`
    })
  }
  // console.log('这里干了啥！！！！', data.content)
  return data
})