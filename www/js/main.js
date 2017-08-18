'use strict'

const COUNT_NUM = 12
// 豆瓣api请求数据有问题，越往后越有问题, 故设置上限
const TOTAL_NUM = 46

function jsonp(appData) {
  !function addItems() {
    let itemsContainer = document.getElementsByClassName('items-container')[0]
    let showItems = []
    const time = 0.3
    // if larger than TOTAL_NUM
    if (appData.start + COUNT_NUM > TOTAL_NUM) {
      appData.count = TOTAL_NUM - appData.start
    }

    for (let i = 0, length = appData.count; i < length; i++) {
      let item = appData.subjects[i]
      let li = document.createElement('li')

      li.classList.add('item')
      li.innerHTML = `<a href="/animate/${item.id}"><img class="item-img" src="${item.images.large}" /></a>`
      itemsContainer.appendChild(li)
      showItems.push(li)
    }
    // add more DOM
    !function addMore() {
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

          loader.className = 'body-loader-bottom'
          loader.position = 'relative'
          loader.innerHTML = '<div class="loader-hook loader--circularSquare"></div>'
          itemsContainer.parentElement.appendChild(loader)
        })
      }()
      // add to the showItems
      showItems.push(more)
    }()
    // then hide css animation
    !function hideLoader() {
      let loader = document.getElementsByClassName('body-loader')[0] || document.getElementsByClassName('body-loader-bottom')[0]
      loader.style.transition = 'opacity '+time+'s'
      loader.style.opacity = 0
      setTimeout(function() {
        loader.parentElement.removeChild(loader)
      }, time * 1000)
    }()
    // showItems function
    !function showItemsOpacityChange() {
      for (var i = 0, length = showItems.length; i < length; i++) {
        !function(i) {
          setTimeout(function() {
            showItems[i].style.opacity = 1
          }, time*1000)
        }(i)
      }
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
  // init page
  changeImgSize()
}
var main_width = window.innerWidth

window.onresize = function() {
  if (main_width !== window.innerWidth){
    changeImgSize()
  }
}

function changeImgSize() {
  var banner = document.getElementsByClassName('banner')[0]
  var items = banner.getElementsByClassName('banner-item')
  var length = items.length

  !function() {
    for (var i = 0; i < length; i++) {
      var img = items[i].getElementsByTagName('img')[0]
      img.style.height = 1.2 * window.innerHeight+'px'

      // left and top
      var height = img.offsetHeight
      var width = img.offsetWidth

      items[i].style.position = 'fixed'
      items[i].style.transition = 'all 1.5s'
      items[i].style.left = '-'+(width - window.innerWidth) / 2+'px'
      items[i].style.top  = '-'+(height - window.innerHeight) / 4+'px'
    }
  }()


}
