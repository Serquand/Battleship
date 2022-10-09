import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
export default class WSHandlers {
    auth (userInformation) {
        if(!userInformation) return false
        try {
            const logged = !!(userInformation?.user == verify(userInformation.token, process.env.SALT_JWT).userId)
            return logged
        } catch { return false }
    }

    assignPrepToPlayer(socket, idSession, game, preparation) {
        if(socket.rooms.has("firstPlayer - " + idSession)) game.firstGrid = preparation
        else game.secondGrid = preparation
    }

    submitPreparation(io, socket, session, idSession, preparation) {
        if(!session.game.gridIsValid(preparation)) return 
        this.assignPrepToPlayer(socket, idSession, session.game, preparation)
        if(!session.game.oneFinish) {
            session.game.oneFinish = true
            return  
        } 
        io.to("players - " + idSession).emit("startTheGame")
        io.to("firstPlayer - " + idSession).emit("yourTurn", session.game.firstTry)
        session.game.status = "R"
    }

    choiceThePlayerTurn(player, io, idSession, game) {
        if(player != 1) return io.to("firstPlayer - " + idSession).emit("yourTurn", game.firstTry)
        return io.to("secondPlayer - " + idSession).emit("yourTurn", game.secondTry)
    }

    choiceTheUserVictory(player, io, idSession, game) {
        console.log(player)
        game.finishGame()
    }

    madeAShot(io, session, socket, idSession, indexShot) {
        const player = this.computeTurn(session)
        if(!this.checkTheSocketTurn(socket, idSession, player)) return
        if(!session.game.madeAShot(indexShot)) return this.choiceThePlayerTurn(player, io, idSession, session.game)
        session.game.numberTurn ++
        io.to("firstPlayer - " + idSession).emit("resultShot", session.game.firstGrid, session.game.firstTry, session.game.secondTry)
        io.to("secondPlayer - " + idSession).emit("resultShot", session.game.secondGrid, session.game.secondTry, session.game.firstTry)

        if(session.game.checkVictory(player)) return choiceTheUserVictory(player)
        else this.choiceThePlayerTurn(player + 1, io, idSession, session.game)
    }

    shuffleGrid(session, socket) {
        const shuffledArray = session.game.shuffleGrid()
        socket.emit("returnShuffled", shuffledArray);
    }

    computeTurn(session) {
        return session.game.numberTurn % 2
    }

    checkTheSocketTurn(socket, idSession, turn) {
        if(turn == 0) return socket.rooms.has("firstPlayer - " + idSession)
        return socket.rooms.has("secondPlayer - " + idSession)
    }
};
