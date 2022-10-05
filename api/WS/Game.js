import Players from "../Models/Players.js"

export default class Game {
    constructor() {
        this.firstGrid = new Array(100)
        this.firstTry = new Array(100)
        this.secondGrid = new Array(100)
        this.secondTry = new Array(100)
        this.oneFinish = false
    }

    async addSecondPlayer(secondPlayer) {
        this.secondPlayer = await this.getInfoPlayer(secondPlayer)
    }

    async addFirstPlayer(firstPlayer) {
        this.firstPlayer = await this.getInfoPlayer(firstPlayer)
    }

    async getInfoPlayer(user) {
        return (await Players.findOne({
            attributes: ['id', 'Elo', 'Pseudo'], 
            where: { Pseudo: user }
        })).dataValues;
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

