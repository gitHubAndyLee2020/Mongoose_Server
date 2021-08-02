import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import PostRoutes from './routes/post.js'

import PostTwoRoutes from './routes/post_two.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({
    origin: /http:\/\/localhost:3000/i,
    credentials: true
}))

app.get('/', (req,res) => {
    res.send('Hello to Mongoose Practice API') 
})

app.get('/hello', (req,res) => {
    const id = mongoose.Types.ObjectId('6105d1c74201683ac4abe119')
    res.send(`Hello there: ${id} + ${typeof id}`) 
})

app.use('/posts', PostRoutes)
app.use('/postsTwo', PostTwoRoutes)

const port = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server running at port: ${port}`)))
    .catch(error => console.log(error.message))

mongoose.set('useFindAndModify', false)