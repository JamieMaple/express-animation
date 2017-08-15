'use strict'

const COUNT_NUM = 12
// 豆瓣api请求数据有问题，越往后越有问题, 故设置上限
const TOTAL_NUM = 46

function jsonp(appData) {
  let addItems = function() {
    let itemsContainer = document.getElementsByClassName('items-container')[0]

    let s = ''
    // 判断是否超出范围，若是即修改count为差值
    if (appData.start + COUNT_NUM > TOTAL_NUM) {
      appData.count = TOTAL_NUM - appData.start
    }

    for (let i = 0, length = appData.count; i < length; i++) {
      let item = appData.subjects[i]
      let li = document.createElement('li')

      li.classList.add('item')
      li.innerHTML = `<a href="/animate/${item.id}"><img class="item-img" src="${item.images.large}"></a>`
      itemsContainer.appendChild(li)
    }
  }()
}
let query = { tag:'吉卜力', start: 0, count: COUNT_NUM }
getJSON({
  url: 'https://api.douban.com/v2/movie/search',
  query,
  callback: 'jsonp'
})
// init start
query.start += COUNT_NUM;
// function
(function() {
  let more = document.getElementsByClassName('more')[0]
  // next li_objs loading
  more.addEventListener('click', loadMoreMovie)
  // more-Element change
  more.addEventListener('click', function() {
    if(query.start >= TOTAL_NUM) {
      more.getElementsByTagName('span')[0].innerHTML = '没有更多了'
      more.style.border = 'none'
      more.style.background = '#F7F7F7'
      more.style.cursor = 'not-allowed'
      more.removeEventListener('click', loadMoreMovie)
    }
  })

  function loadMoreMovie() {
    if(query.start >= TOTAL_NUM) {
      return
    }
    getJSON({
      url: 'https://api.douban.com/v2/movie/search',
      query,
      callback: 'jsonp'
    })
    query.start += COUNT_NUM
  }
})()
