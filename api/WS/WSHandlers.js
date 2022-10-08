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
        io.to("firstPlayer - " + msg).emit("yourTurn", () => session.game.firstTry)
        session.game.status = "R"
    }

    madeAShot(indexShot) {
        console.log(indexShot)
        session.game.madeAShot(indexShot)
    }

    shuffleGrid(session, socket, user) {
        const shuffledArray = session.game.shuffleGrid(user)
        socket.emit("returnShuffled", shuffledArray);
    }

    computeTurn() {
        
    }

    checkTheSocketTurn() {

    }
};
