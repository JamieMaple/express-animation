// params: String,
function getJSON(dataObj) {
  let url = dataObj.url
  let query = dataObj.query || ''
  let callback = dataObj.callback || 'callback'

  if (!url) {
    console.log('no url')
    return
  }

  let script = document.createElement('script')
  let head = document.getElementsByTagName('head')[0]
  script.src = url + queryToString() + 'callback=' + callback

  head.appendChild(script)
  head.removeChild(script)

  function queryToString() {
    if (!query) {
      return '?'
    }

    let queryArr = []
    for (key in query) {
        queryArr.push(`${key}=${query[key]}`)
    }
    let queryString = '?' + queryArr.join('&') + '&'
    return queryString
  }
}
