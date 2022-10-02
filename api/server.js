require("dotenv").config()

const express = require("express")
const cors = require("cors") 
const Server = require('socket.io').Server
const uuid = require("uuid")
const http = require("http")
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origins: [process.env.URL_WEBSITE] } })

app.use(cors(process.env.URL_WEBSITE))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.listen(PORT, () => {
    console.clear()
    console.log("Server is listening on PORT :", PORT)
})

io.on("connection", socket => {
    
})