
const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {mergeFiles} = require('./merged')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.use('/static', express.static('public'))

app.post('/merge', upload.array('pdfFiles', 2), async function (req, res, next) {
     await mergeFiles(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
     res.redirect("http://localhost:3000/static/merged.pdf")
  })

app.listen(port, () => {
  console.log(`Example app listening on port on http://localhost:${port}`)
})