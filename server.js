const express = require('express')
const app = express()
const path = require('path')

app.listen(8080, function() {
    console.log('listening on 8080')
})

app.use(express.static(path.join(__dirname, 'AdvWebProgramming/build')))

app.get('/', function(requirement, respond){
    respond.sendFile(path.join(__dirname,'AdvWebProgramming/build/index.html'))
})