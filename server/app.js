const express = require('express')
const path = require('path')
const app = express()

const PORT = 9000

app.use(express.static(path.resolve('./static')))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log('express is now listening on ' + PORT + '...')
})
