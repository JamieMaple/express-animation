// get the url id
const id = window.location.pathname.split('/')[2]

function jsonp(appData){
  appData.summary = appData.summary.split('©')[0]
  console.log(appData)

  // dom title change
  document.getElementsByTagName('title')[0].innerHTML = appData.title + ' | スタジオジブリ'
  document.getElementsByClassName('this-page')[0].innerHTML = appData.title

  // image change
  var imageChange = function(){
    let image = document.getElementsByClassName('animate-poster')[0]
    image.src = appData.images.large
  }()
  // title change
  var changeTitle = function() {
    let titles = document.getElementsByClassName('title-group')[0]
    let main_title = titles.getElementsByClassName('title')[0]
    let origin = titles.getElementsByClassName('origin-title')[0]
    let others = titles.getElementsByClassName('other-titles')[0]

    // main title
    main_title.innerHTML = appData.title
    // origin title
    origin.getElementsByClassName('text')[0]
    .innerHTML = appData.original_title
    // other names
    others.getElementsByClassName('text')[0]
    .innerHTML = appData.aka
  }()
  // rating change
  var ratingChange = function() {
    document.getElementsByClassName('rating')[0].innerHTML = appData.rating.average
  }()
  // genres change
  var genresChange = function() {
    let genres = document.getElementsByClassName('genres')[0]
    let s = ''
    for (let i = 0, length = appData.genres.length; i < length; i++) {
      let li = document.createElement('li')
      li.classList.add("genres-item")
      li.innerHTML = appData.genres[i]
      genres.appendChild(li)
    }
  }()
  // summary change
  var summaryChange = function() {
    let summaryContent = document.getElementsByClassName('summary-content')[0]
    summaryContent.innerHTML = appData.summary
  }()
  // url change
  var urlChange = function() {
    document.getElementsByClassName('share-url')[0].href = appData.share_url
  }()
  // celebrity change
  var celebrityChange = function() {
    // change directors
    changeItem('directors', appData.directors)
    // change casts
    changeItem('casts', appData.casts)

    function changeItem(dom, data) {
      let mainObj = document.getElementsByClassName(dom)[0].getElementsByClassName('items-container')[0]
      let length = data.length

      if (length === 0) {
        let li = document.createElement('li')

        li.classList.add('item-empty')
        li.innerHTML = '暂无信息'

        mainObj.appendChild(li)
        return
      }

      for (let i = 0; i < length; i++) {
        let li = document.createElement('li')
        li.classList.add('item')
        let img_src
        let name = data[i].name || '未知影人'
        if (!data[i].avatars || data[i].avatars === null) {
          img_src = 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
        } else {
          img_src = data[i].avatars.medium
        }

        li.innerHTML = `<img src=${img_src} class="item-img"><h2 class="name">${name}</h2>`
        mainObj.appendChild(li)
      }
    }
  }()
}

getJSON({
  url: 'https://api.douban.com/v2/movie/subject/'+id,
  callback: 'jsonp'
})
