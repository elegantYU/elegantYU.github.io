$(document).ready(function () {
  const navbarIcon = () => {
    $('#navbar-toggler-btn').on('click', function () {
      $('.animated-icon').toggleClass('open');
      $('#navbar').toggleClass('navbar-col-show');
    });
  }
  // 打字机器_文字
  const typeMachine = () => {
    let i = 0
    const typingBox = document.getElementsByClassName('wow')[0].children[0]
    const typingWords = typingBox.innerText || '御剑乘风来，除魔天地间'
    typingBox.innerText = ''
    const typing = setInterval(() => {
      typingBox.innerHTML += typingWords[i++]
      i >= typingWords.length && clearInterval(typing)
    }, 200)
  }
  // 搜索按钮
  const searchPath = '/search.xml'
  const searchToggle = () => {
    const $input = $('#searchLocalInput')
    $(".searchIcon").click(() => {
      $input.val('')
      $('#searchBox').fadeToggle()
      searchFunc(searchPath, 'searchLocalInput', 'searchContent')
    })
    $(".searchInput span").eq(1).click(() => {
      if ($input.val().length) {
        $input.val('')
      } else {
        $('#searchBox').fadeOut()
      }
    })
  }
  const searchFunc = (path, search_id, content_id) => {
    $.ajax({
      url: path,
      dataType: "xml",
      success: xmlResponse => {
        // get the contents from search data
        let datas = $("entry", xmlResponse ).map(function() {
          return {
            title: $("title", this ).text(),
            content: $("content",this).text(),
            url: $( "url" , this).text(),
            tag: $('tags', this).find('tag')
          };
        }).get();
        const $input = document.getElementById(search_id);
        const $resultContent = document.getElementById(content_id);
        $input.addEventListener('input', function(){
          let str = '';                
          const keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
          $resultContent.innerHTML = "";
          if (this.value.trim().length <= 0) {
            return
          }
          // perform local searching
          datas.forEach(data => {
            let isMatch = true;
            let content_index = [];
            let data_title = data.title.trim().toLowerCase();
            let data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
            let data_url = data.url;
            let index_title = -1;
            let index_content = -1;
            let first_occur = -1;
            // only match artiles with not empty titles and contents
            if(data_title != '' && data_content != '') {
              keywords.forEach((keyword, i) => {
                index_title = data_title.indexOf(keyword);
                index_content = data_content.indexOf(keyword);
                if( index_title < 0 && index_content < 0 ){
                  isMatch = false;
                } else {
                  if (index_content < 0) {
                    index_content = 0;
                  }
                  if (i == 0) {
                    first_occur = index_content;
                  }
                }
              });
            }
            // show search results
            if (isMatch) {
              str += `<li><a href='${data_url}' target='_blank' class="search_result_title">${data_title}</a>`;
              const content = data.content.trim().replace(/<[^>]+>/g, "");
              if (first_occur >= 0) {
                // cut out characters
                let start = first_occur - 6;
                let end = first_occur + 6;
                if(start < 0) start = 0;
                if(start == 0) end = 10;
                if(end > content.length) end = content.length;

                let match_content = content.substr(start, end); 
                // highlight all keywords
                keywords.forEach(keyword => {
                  const regS = new RegExp(keyword, "gi");
                  match_content = match_content.replace(regS, `<em class="search-keyword">${keyword}</em>`);
                })
                str += `<p class="search_result_content">${match_content}</p></li>`
              }
            }
          })
          $resultContent.innerHTML = str;
        })
      }
    })
  }

  const init = () => {
    navbarIcon()
    typeMachine()
    searchToggle()
  }

  init()
});