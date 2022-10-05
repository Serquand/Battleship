import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 6251

import express from 'express'
import * as http from "http"
import { Server } from "socket.io"
import cors from 'cors'
import { v4 } from 'uuid'

import setup from './Models/Setup.js'
import routerProfil from './Routes/Profil.js'
import Game from './WS/Game.js'
import { default as ws } from './WS/WSHandlers.js';
let _ = new ws()

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origins: [process.env.URL_WEBSITE] } })

app.use(cors(process.env.URL_WEBSITE))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/profil", routerProfil)

const sessions = {}
let tempIdGame = null

io.on("connection", socket => {
    console.log("A new user is now connected !")
    
    socket.on("responseUser", async (userInformation) => {
        if(!(_.auth(userInformation))) return

        let msg;
        if(tempIdGame) {
            msg = tempIdGame
            tempIdGame = null     
        } else {
           tempIdGame = v4()
           msg = tempIdGame
        }
        socket.session = msg
        const user = userInformation.user;

        if(!sessions[msg]) {
            sessions[msg] = [socket]
            sessions[msg].game = new Game(user)
            socket.join("firstPlayer - " + msg)
            socket.join("players - " + msg)
            socket.emit("init")
        } else {
            socket.join("players - " + msg)
            socket.join("secondPlayer - " + msg)
            sessions[msg].game.addSecondPlayer(user)
            io
                .to(["firstPlayer - " + msg])
                .emit("beginningGameInfo", sessions[msg].game.eloFirstPlayer, sessions[msg].game.eloSecondPlayer, sessions[msg].game.secondPlayer, "f")
                
            io
                .to(["secondPlayer - " + msg])
                .emit("beginningGameInfo", sessions[msg].game.eloSecondPlayer, sessions[msg].game.eloFirstPlayer, sessions[msg].game.firstPlayer, "s")
                
            io.to(["players - " + msg]).emit("play")
        }

    })
})

httpServer.listen(PORT, () => {
    console.clear()
    console.log("Server is listening on PORT :", PORT)
    setup()
})