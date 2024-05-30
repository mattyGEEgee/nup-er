const express = require('express')
const app = express()
const { resolve } = require('path')
const portNumber = 5002

app.use('/', express.static(resolve(__dirname, 'pages')))
app.use(express.json())

// get azure api key
app.get('/azure-api-key', (req, res) => {
    res.json({
        "message": process.env.AZURE_API_KEY
    })
})

app.listen(portNumber, () => {
    console.log(`listening on ${portNumber}...`);
})