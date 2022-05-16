const express = require("express")
const app = express()
require("dotenv").config()

//route
const tasks = require("./routes/tasks")
//Db
const connectDb = require("./db/connect")

//Middleware import
const errorHandlerMiddleware = require('./middlewares/errorHandler')
const notFoundMiddleware = require('./middlewares/notFoundHandler')



//Middlewares
app.use(express.json())
app.use(express.static('./public'));


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)
// Routes
app.use('/api/v1/task',tasks)


const port = process.env.PORT | 5555
const start = async () => {
    try {
        //Connect to database
        await connectDb(process.env.DATABASE_URL)
        console.log("Database connected")
        app.listen(port,() => {
            console.log(`Listening on port: ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()