import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index.js'

const app = express()
app.use('/api', routes)

const PORT = 3005

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server Running on port http://localhost:${PORT}`)
})