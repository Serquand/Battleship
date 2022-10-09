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

    submitPreparation(io, session, idSession, preparation) {
        if(!session.game.gridIsValid(preparation)) return 

        if(!session.game.oneFinish) {
            session.game.oneFinish = true
            return  
        } 
        io.to("players - " + idSession).emit("startTheGame")
        io.to("firstPlayer - " + idSession).emit("yourTurn", session.game.firstTry)
        session.game.status = "R"
    }

    madeAShot(session, socket, idSession, indexShot) {
        if(!this.checkTheSocketTurn(socket, idSession, this.computeTurn(session))) return
        if(!session.game.madeAShot(indexShot)) return 
        session.game.numberTurn ++
        io.emit("resultShot")
    }

    shuffleGrid(session, socket, user) {
        const shuffledArray = session.game.shuffleGrid(user)
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
