require('module-alias/register')
var _ = require('lodash');
const dotenv = require('dotenv')
dotenv.config()

// Set up running server
const express = require('express')
const app = express()
const PORT = process.env.PORT || 9999
app.listen(PORT, () => {
	console.log('\nServer up and running...\n')
})

const cors = require('cors')
app.use(cors())
app.listen(80, function () {
	console.log('CORS-enabled web server listening on port 80\n')
})

app.use(express.json())

const routers = require('@routers')
app.use('/api', routers)



