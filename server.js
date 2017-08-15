'use strict'

const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('www'))

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'www/index.html'))
})
app.get('/animate/:id', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'www/animate.html'))
})


const APP_PORT = 3000

app.listen(APP_PORT, (req, res) => {
  console.log('Listening at '+APP_PORT)
})
