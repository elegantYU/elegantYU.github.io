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
    const typingWords = typingBox.innerText
    typingBox.innerText = ''
    const typing = setInterval(() => {
      typingBox.innerHTML += typingWords[i++]
      i >= typingWords.length && clearInterval(typing)
    }, 200)
  }

  const init = () => {
    navbarIcon()
    typeMachine()
  }

  init()
});