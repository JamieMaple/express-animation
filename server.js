'use strict'

const express = require('express')
const app = express()

app.use(express.static('www'))

app.get('/', function(req, res) {

})
app.get('/animate/:id', function(req, res) {

})
app.get('/tag/:id', function(req, res) {

})

app.get('/director/:id', function(req, res) {

})
app.get('/cast/:id', function(req, res) {

})


// 利用superagent的proxy转发豆瓣api请求, 这属于后端处理跨域技术
app.get('/api', function(req, res) {
    var superagent = require('superagent')
    var sreq = superagent.get('https://api.douban.com/v2/movie/search').query(req.query)
    sreq.pipe(res)
})


const APP_PORT = 3000

app.listen(APP_PORT, (req, res) => {
  console.log('Listening at '+APP_PORT)
})
