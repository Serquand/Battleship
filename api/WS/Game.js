import Players from "../Models/Players.js"

export default class Game {
    constructor() {
        this.firstGrid = new Array(100)
        this.firstTry = new Array(100)
        this.secondGrid = new Array(100)
        this.secondTry = new Array(100)
        this.oneFinish = false
        this.status = "L"
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
     * @param {String} user - The user who have played
     * WIll check if the player has won the game, and, if he has, will set status to end and will launch finishGame method
     */
    checkVictory(user) {
        const grid = user == 's' ? this.firstGrid : this.secondGrid
        const tryArray = user == 's' ? this.firstTry : this.secondTry
        
        for(let i = 0; i < 100; i++ ) {
            if(grid != undefined && tryArray == undefined) return
        }

        this.status = 'E'
        this.finishGame(user)
    }


    transformArrayToMatrix(grid) {
        let count = 0
        let matrix = new Array(0)
        for(let i = 0; i < 10; i++) {
            matrix.push(new Array(10))
            for(let j = 0; j < 10; j++) {
                matrix[i][j] = grid[count]
                count++
            }
        }
        return matrix
    }

    transformMatrixToArray(matrix) {
        let array = new Array(0), count = 0
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                array[count] = matrix[i][j]
                count++
            }    
        }
        return array
    }

    /**
     * Add a ship to the grid
     * @param {Number} numberCase - The number of case took by the ship 
     * @param {Number} place - Where to plac the ship
     * @param {Number} direction - A number between 1 and 4 to indicate the direction the ship must have from the place param
     * @param {Array} grid - The temporary grid  
     * @return {boolean} - If the placement is allowed
     */
    addShip(numberCase, place, direction, grid, ship) {
        //Initialization
        grid = this.transformArrayToMatrix(grid)
        const placeX = parseInt(place / 10)
        const placeY = place % 10
        const incrementX = (direction == 0 || direction == 1) ? 0 : (direction == 2) ? -1 : 1 
        const incrementY = (direction == 3 || direction == 2) ? 0 : (direction == 0) ? -1 : 1 
        
        //Check if the position is allowed
        for(let i = 0; i < numberCase; i++) {
            const newX = (placeX + i * incrementX), newY = (placeY + i * incrementY) 
            if(newX >= 10 || newX < 0 || newY >= 10 || newY < 0 || grid[newX][newY] != null) return false
        }
        
        //Put the ship
        for(let i = 0; i < numberCase; i++) {
            const newX = (placeX + i * incrementX), newY = (placeY + i * incrementY) 
            grid[newX][newY] = ship
        }
    
        return this.transformMatrixToArray(grid)
    }


    /**
     * Shuffle a grid for the player give in parameters
     * @param {Number} user - THe user to shuffle the grid
     * @returns {Array} - The shuffled array
     */
    shuffleGrid(user) {
        let grid = new Array(100), place, direction, temp 

        //Aircraft carrier
        //We place the first ship at a random position in the map
        temp = grid
        do {
            place = Math.floor(Math.random() * 100)
            direction = Math.floor(Math.random() * 4)
            temp = this.addShip(5, place, direction, grid, 'A') 
        } while(!temp);
        grid = temp

        //Cruiser
        //Do try to place a ship until place the ship is allowed
        temp = grid
        do {
            place = Math.floor(Math.random() * 100)
            direction = Math.floor(Math.random() * 4)
            temp = this.addShip(4, place, direction, grid, 'C') 
        } while(!temp);
        grid = temp
        
        //Destroyer 1
        temp = grid
        do {
            place = Math.floor(Math.random() * 100)
            direction = Math.floor(Math.random() * 4)
            temp = this.addShip(3, place, direction, grid, 'D1') 
        } while(!temp);
        grid = temp

        //Destroyer 1
        temp = grid
        do {
            place = Math.floor(Math.random() * 100)
            direction = Math.floor(Math.random() * 4)
            temp = this.addShip(3, place, direction, grid, 'D2') 
        } while(!temp);
        grid = temp

        //Torpedo
        temp = grid
        do {
            place = Math.floor(Math.random() * 100)
            direction = Math.floor(Math.random() * 4)
            temp = this.addShip(2, place, direction, grid, 'T') 
        } while(!temp);
        grid = temp

        //Paste the random generated array in the class array
        if(user == this.firstPlayer.Pseudo) this.firstGrid = grid
        else this.secondGrid = grid
        
        return grid
    }

    /**
     * Will made a shot on the grid for the {user} on case {shotLocation} 
     * @param {String} user - The user who play
     * @param {Number} shotLocation - The location of the shot 
     */
    madeAShot(user, shotLocation) {

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

