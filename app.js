const express = require('express')

const app = express()

const morgan = require('morgan')

const dotenv =  require('dotenv')


dotenv.config({path:'.env'})

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/',require('./routes/index'))

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server running on port ${port}`);