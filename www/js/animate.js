// get the url id
const id = window.location.pathname.split('/')[2]

function jsonp(appData){
  appData.summary = appData.summary.split('©')[0]
  console.log(appData)

  // dom title change
  document.getElementsByTagName('title')[0].innerHTML = appData.title + ' | スタジオジブリ'

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
    origin.getElementsByTagName('span')[0]
    .innerHTML = appData.original_title
    // other names
    others.getElementsByTagName('span')[0]
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
}

getJSON({
  url: 'https://api.douban.com/v2/movie/subject/'+id,
  callback: 'jsonp'
})
