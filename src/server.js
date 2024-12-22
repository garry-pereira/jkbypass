import express from 'express'
import connectDB from './db/connectdb.js'
import routes from './routes/index.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', routes)

connectDB()

app.listen(3000)
console.log('app listening')
