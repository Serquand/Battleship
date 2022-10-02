import Players from "../Models/Players.js"

class Game {
    constructor(firstPlayer) {
        this.firstPlayer =  this.getInfoPlayer(firstPlayer)
        this.firstGrid = new Array(100)
        this.firstTry = new Array(100)
        this.secondGrid = new Array(100)
        this.secondTry = new Array(100)
    }

    addSecondPlayer(secondPlayer) {
        this.secondPlayer = this.getInfoPlayer(secondPlayer)
    }

    async getInfoPlayer(user) {
        let infoPlayer = await Players.findOne({
            attributes: ['id', 'Elo', 'Pseudo'], 
            where: { Pseudo: user }
        })
    }
}