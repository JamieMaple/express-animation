// params: String,
function getJSON(dataObj) {
  let url = dataObj.url
  let query = dataObj.query || ''
  let callback = dataObj.callback || 'callback'
  let debug_mode = dataObj.debug_mode || false

  if (!url || !callback) {
    if (debug_mode) {
      console.log('no params:url or callback!')
    }
    return
  }

  let script = document.createElement('script')
  let head = document.getElementsByTagName('head')[0]
  script.src = url + queryToString() + 'callback=' + callback
  if (debug_mode) {
    console.log(script.src)
  }

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
