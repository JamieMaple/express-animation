// @@ banner component
// @@ params: Images(Array), time(Number, seconds) , class(String)
function createbanner(img_obj){
  img_data = img_obj.img_data || undefined
  duration = img_obj.duration || 3
  change_time = img_obj.change_time || 1.5
  banner = img_obj.banner || 'banner'
  banner_item = img_obj.banner_item || 'banner-item'


  var banner = document.getElementsByClassName(banner)[0]

  var length = img_data.length
  var num = 0
  
  if (! length) {
    console.log('Image:'+img_data)
    return
  }

  
  // init page
  ;(function() {
    // add banner-item
    for (var i = 0; i < length; i++) {
      var item = document.createElement('li')
      item.className = banner_item
      item.innerHTML = '<img src="' + img_data[i] + '" />'
      banner.appendChild(item)
      // item opacity
      if (item.style.transition) {
        item.style.transition += ', opacity '+change_time+'s'
      } else {
        item.style.transition = 'opacity '+change_time+'s'
      }
    }
    // init first banner item
    banner.getElementsByClassName(banner_item)[0].classList.add('active')
  })()
  // params: num for images, string class
  function play(num, Active) {
    num = num || 0
    Active = Active || 'active'
    var items = banner.getElementsByClassName(banner_item)
    for (var i = 0; i < length; i++) {
      items[i].classList.remove(Active)
    }
    var now_img = items[num]
    now_img.opacity = 1
    now_img.classList.add(Active)
  }
  setInterval(function() {
    num++
    if (num >= length) {
      num = 0
    }
    play(num)
  }, duration * 1000)
}

