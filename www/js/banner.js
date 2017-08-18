var img_data = [
  './images/banner/1.jpg',
  './images/banner/2.jpg',
  './images/banner/3.jpg',
  './images/banner/4.jpg',
  './images/banner/5.jpg',
  './images/banner/6.jpg',
]
var banner = document.getElementsByClassName('banner')[0]
var length = img_data.length
var num = 0
var time = 3

// init page
!function() {
  // add banner-item
  for (var i = 0; i < length; i++) {
    var item = document.createElement('li')
    item.className = 'banner-item'
    item.innerHTML = '<img src="' + img_data[i] + '" />'
    banner.appendChild(item)
  }
  // init first banner item
  banner.getElementsByClassName('banner-item')[0].classList.add('active')
}()
// params: num for images, string class
function play(num, Active) {
  num = num || 0
  Active = Active || 'active'
  var items = banner.getElementsByClassName('banner-item')
  for (var i = 0; i < length; i++) {
    items[i].classList.remove(Active)
  }
  items[num].classList.add(Active)
}
setInterval(function() {
  num++
  if (num >= length) {
    num = 0
  }
  play(num)
}, time * 1000)
