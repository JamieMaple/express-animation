'use strict'

const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('www'))

// 利用superagent的proxy转发豆瓣api请求, 这属于后端处理跨域技术
app.get('/api', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'www/index.html'))
})
app.get('/animate/:id', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'www/animate.html'))
})


const APP_PORT = 3000

app.listen(APP_PORT, (req, res) => {
  console.log('Listening at '+APP_PORT)
})
