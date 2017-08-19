'use strict'
// every request num
var COUNT_NUM = 12
// up request limit
var TOTAL_NUM = 67
// image params format
var IMGPARAMS = { height: 441, width: 300 }
// Debug mode open
var DEBUG_MODE = true
// querySet
var query = { tag:'吉卜力', start: 0, count: COUNT_NUM }
// jsonp callback
function jsonp(appData) {
  if (DEBUG_MODE) {
    console.log('appData:')
    console.log(appData)
  }
  !function addItems() {
    let itemsContainer = document.getElementsByClassName('items-container')[0]
    let liItems = []
    let showItems = []
    const TIME = 0.3
    // if larger than TOTAL_NUM
    if (appData.start >= TOTAL_NUM) {
      appData.count = 0
      return
    } else if (appData.start + COUNT_NUM > TOTAL_NUM) {
      appData.count = TOTAL_NUM - appData.start
    } else {
      appData.count = appData.subjects.length
    }

    for (let i = 0, length = appData.count; i < length; i++) {
      let item = appData.subjects[i]
      let li = document.createElement('li')

      li.classList.add('item')
      li.innerHTML = 
      `<a href="/animate/${item.id}" target="_blank"><img class="item-img" src="${item.images.large}"></a>`
      let span = document.createElement('span')
      span.className = 'mask'
      span.innerHTML = `<span class="text">${item.title}</span>`
      li.getElementsByTagName('a')[0].appendChild(span)

      itemsContainer.appendChild(li)
      showItems.push(li)
      liItems.push(li)
    }
    // init images 
    changeItemImgsSize(IMGPARAMS, liItems)
    // add more DOM
    var addMore = function () {
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
          getJSON({
            url: 'https://api.douban.com/v2/movie/search',
            query,
            callback: 'jsonp'
          })
          query.start += COUNT_NUM
        })
        // more loading animation
        more.addEventListener('click', function loadAnimation() {
          this.parentElement.removeChild(this)
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
    var hideLoader = function() {
      let loader = document.getElementsByClassName('body-loader')[0] || document.getElementsByClassName('body-loader-bottom')[0]
      loader.style.transition = 'opacity '+TIME+'s'
      loader.style.opacity = 0
      setTimeout(function() {
        loader.parentElement.removeChild(loader)
      }, TIME * 1000)
    }()
    // showItems
    var showItemsOpacityChange = function() {
      for (var i = 0, length = showItems.length; i < length; i++) {
        !function(i) {
          setTimeout(function() {
            showItems[i].style.opacity = 1
          }, TIME*1000)
        }(i)
      }
    }()
  }()
}
// load
window.addEventListener('load', function() {
  if (DEBUG_MODE) {
    console.log('window onload!')
  }
  getJSON({
    url: 'https://api.douban.com/v2/movie/search',
    query,
    callback: 'jsonp',
    debug_mode: DEBUG_MODE
  })
  // init start
  query.start += COUNT_NUM;
  // init page
  createbanner({
    img_data: [
      './images/banner/1.jpg',
      './images/banner/2.jpg',
      './images/banner/3.jpg',
      './images/banner/4.jpg',
      './images/banner/5.jpg',
      './images/banner/6.jpg',
    ],
    duration: 3,
    change_time: 1.5
  })
  changeBannerSize()
})
// resize
var MAINWIDTH = window.innerWidth
window.addEventListener('resize', function() {
  if (MAINWIDTH !== window.innerWidth){
    if (DEBUG_MODE) {
      console.log('window width change!\n'+MAINWIDTH+' change to '+window.innerWidth+' !')
    }
    // change banner
    changeBannerSize()
    // resize images
    !function() {
      var itemsContainer = document.getElementsByClassName('items-container')[0]
      var imagesItems = itemsContainer.getElementsByClassName('item')
      changeItemImgsSize(IMGPARAMS, imagesItems)
    }()
  }
}) 
// function part
function changeBannerSize() {
  var banner = document.getElementsByClassName('banner')[0]
  var items = banner.getElementsByClassName('banner-item')
  var length = items.length

  ;(function() {
    for (var i = 0; i < length; i++) {
      var img = items[i].getElementsByTagName('img')[0]
      img.style.height = 1.2 * window.innerHeight+'px'
      img.style.minWidth = window.innerWidth+'px'
      // left and top
      var height = img.offsetHeight
      var width = img.offsetWidth

      items[i].style.position = 'fixed'
      if (items[i].style.transition) {
        items[i].style.transition += ', left .2s, right .2s'
      } else {
        items[i].style.transition = 'left .2s, right .2s'
      }
      items[i].style.left = '-'+(width - window.innerWidth) / 2+'px'
      items[i].style.top  = '-'+(height - window.innerHeight) / 4+'px'
    }
  })()
}
function changeItemImgsSize(data, liObjs) {
  // liObjs 0 and windowHeght persent
  var mainWidth = liObjs[0].offsetWidth
  var width_ratio = (mainWidth / data.width).toFixed(2)
  var mainHiegth = width_ratio * 441
  // images change
  for (var i = 0, length = liObjs.length; i < length; i++) {
    var img = liObjs[i].getElementsByTagName('img')[0]
    img.style.height = mainHiegth+'px'
    img.style.width = mainWidth+'px'
  }
}