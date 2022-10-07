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
        console.log("submitPreparation")
        if(!session.game.gridIsValid(preparation)) return 

        console.log("The grid is valid !")
        if(!session.game.oneFinish) {
            session.game.oneFinish = true
            return  
        } 
        io.to("players - " + idSession).emit("startTheGame")
        session.game.status = "R"
    }

    shuffleGrid(session, socket, user) {
        const shuffledArray = session.game.shuffleGrid(user)
        socket.emit("returnShuffled", shuffledArray);
    }
};
