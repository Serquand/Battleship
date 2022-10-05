import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 6251

import express from 'express'
import * as http from "http"
import { Server } from "socket.io"
import cors from 'cors'

import setup from './Models/Setup.js'
import routerProfil from './Routes/Profil.js'
import _ from './WS/WSHandlers.js';

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origins: [process.env.URL_WEBSITE] } })

app.use(cors(process.env.URL_WEBSITE))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/profil", routerProfil)

io.on("connection", socket => {
    console.log("A new user is now connected !")  
})

httpServer.listen(PORT, () => {
    console.clear()
    console.log("Server is listening on PORT :", PORT)
    setup()
})