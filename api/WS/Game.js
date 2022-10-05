import Players from "../Models/Players.js"

export default class Game {
    constructor(firstPlayer) {
        this.firstPlayer =  this.getInfoPlayer(firstPlayer)
        this.firstGrid = new Array(100)
        this.firstTry = new Array(100)
        this.secondGrid = new Array(100)
        this.secondTry = new Array(100)
        this.oneFinish = false
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


    /**
     * Shuffle a grid for the player give in parameters
     * @param {Number} user - THe user to shuffle the grid
     */
    shuffleGrid(user) {

    }

    /**
     * Check if a grid is valid or not
     * @param {Array} grid - The grid submitted by the player and that we have to check 
     * @returns {boolean} - A boolean according to the check
     */
    gridIsValid(grid) {
        //TODO 
    }
}

