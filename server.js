'use strict'

const express = require('express')
const app = express()

app.use(express.static('www'))



const APP_PORT = 3000

app.listen(APP_PORT, (req, res) => {
  console.log('Listening at '+APP_PORT)
})
