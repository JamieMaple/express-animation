'use strict'

const request = window.superagent
let url = '/api'

request
  .get(url)
  .set('Accept', 'application/json')
  .query({tag: '吉普力'})
  .end(function(err, res){
    const appData = {}
    if (err || !res.ok) {
      console.log(err)
      return
    } else {
      let tempData = JSON.parse(res.text)
      Object.assign(appData, tempData)
      console.log(appData)
    }
    let addItems = function(){
        let itemsContainer = document.getElementsByClassName('items-container')[0]

        let s = ''
        for (let i = 0, length = appData.count; i < length; i++) {
          let item = appData.subjects[i]
          s += `<li class="item"><img class="item-img" src="${item.images.large}"></li>`
        }
        itemsContainer.innerHTML = s
    }()
  })