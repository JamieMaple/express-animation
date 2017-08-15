'use strict'

const COUNT_NUM = 12
// 豆瓣api请求数据有问题，越往后越有问题, 故设置上限
const TOTAL_NUM = 46

function jsonp(appData) {
  let addItems = function() {
    let itemsContainer = document.getElementsByClassName('items-container')[0]

    // if larger than TOTAL_NUM
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
    // add more DOM
    var addMore = function() {
      let more = document.createElement('div')
      more.className = 'more'
      more.innerHTML = '<span class="more-text"></span>'
      itemsContainer.parentElement.appendChild(more)
      // add more EventListener
      var moreLoading = function() {
        if(query.start < TOTAL_NUM) {
          more.getElementsByTagName('span')[0].innerHTML = '加载更多'
        }else {
          more.getElementsByTagName('span')[0].innerHTML = '没有更多了'
          more.style.border = 'none'
          more.style.background = '#F7F7F7'
          more.style.cursor = 'not-allowed'
          return
        }
        // next li_objs loading
        more.addEventListener('click', function loadMoreMovie() {
          if(query.start >= TOTAL_NUM) {
            return
          }
          getJSON({
            url: 'https://api.douban.com/v2/movie/search',
            query,
            callback: 'jsonp'
          })
          query.start += COUNT_NUM
        })
        // more loading animation
        more.addEventListener('click', function loadAnimation() {
          more.parentElement.removeChild(more)
          let loader = document.createElement('div')

          loader.className = 'body-loader'
          loader.innerHTML = '<div class="loader-hook loader--circularSquare"></div>'
          itemsContainer.parentElement.appendChild(loader)
        })
      }()
    }()
    // then hide css animation
    var hideLoader = function() {
      let loader = document.getElementsByClassName('body-loader')[0]

      loader.parentElement.removeChild(loader)

      // click moreDOM to load more function
    }()
  }()
}
let query = { tag:'吉卜力', start: 0, count: COUNT_NUM }
window.onload = function() {
  getJSON({
    url: 'https://api.douban.com/v2/movie/search',
    query,
    callback: 'jsonp'
  })
  // init start
  query.start += COUNT_NUM;
}
