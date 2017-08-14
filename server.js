'use strict'

const express = require('express')
const app = express()

app.use(express.static('www'))

app.get('/', function(req, res) {
  res.sendfile('./www/index.html')
})
app.get('/animate/:id', function(req, res) {
  res.sendfile('./www/animate.html')
})


const APP_PORT = 3000

app.listen(APP_PORT, (req, res) => {
  console.log('Listening at '+APP_PORT)
})
