import Players from "../Models/Players.js"

export default class Game {
    constructor() {
        this.firstGrid = new Array(100)
        this.firstTry = new Array(100)
        this.secondGrid = new Array(100)
        this.secondTry = new Array(100)
        this.oneFinish = false
        this.status = "L"
        this.numberTurn = 0
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
     * @param {Number} user - The user who have played
     * WIll check if the player has won the game, and, if he has, will set status to end and will launch finishGame method
     */
    checkVictory(user) {
        const grid = user == 0 ? this.firstGrid : this.secondGrid
        const tryArray = user == 0 ? this.firstTry : this.secondTry
        
        for(let i = 0; i < 100; i++ ) {
            if(grid != undefined && tryArray == undefined) return
        }

        this.status = 'E'
        this.finishGame(user)
    }

    finishGame(user) {}


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
     * @returns {Array} - The shuffled array
     */
    shuffleGrid() {
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
        
        return grid
    }

    setTry(shotLocation, user) {
        if(user == 0) {
            const grid = this.transformMatrixToArray(this.secondGrid)
            const ship = grid.filter(cell => cell == grid[shotLocation])
            for (const cell of ship) {
                if(this.firstTry[cell] != 'x' && cell != shotLocation) return 'x'
            } 
            for (const cell of ship) this.firstTry[cell] = 'd'
            return 'd'
        } else {
            const grid = this.transformMatrixToArray(this.firstGrid)
            const ship = grid.filter(cell => cell == grid[shotLocation])
            for (const cell of ship) {
                if(this.secondTry[cell] != 'x' && cell != shotLocation) return 'x'
            } 
            for (const cell of ship) this.secondTry[cell] = 'd'
            return 'd'
        }
    }

    /**
     * Will made a shot on the grid for the {user} on case {shotLocation} 
     * @param {String} user - The user who play
     * @param {Number} shotLocation - The location of the shot 
     */
    madeAShot(shotLocation) {
        if(shotLocation < 0 || shotLocation > 99) return false

        if(this.numberTurn % 2 == 0) {
            if(this.firstTry[shotLocation] != null) return false
            console.log(this.secondGrid[parseInt(shotLocation / 10)][shotLocation % 10])
            this.firstTry[shotLocation] = this.secondGrid[parseInt(shotLocation / 10)][shotLocation % 10] == null ? "." : this.setTry(shotLocation, 0) 
        } else {
            if(this.secondTry[shotLocation] != null) return false
            this.secondTry[shotLocation] = this.firstGrid[shotLocation] == null ? "." : this.setTry(shotLocation, 1) 
        }
        
        return true
    }


    /**
     * Will check if the boat is corrected placed
     * @param {Array} boat The array of the case occuped by the boat
     * @returns {Boolean} If the boat is well placed
     */
    checkShip(boat) {
        const increment = boat[1] - boat[0]
        if(increment != 10 && increment != 1) return false
        for(let i = 0; i < boat.length - 1; i++) {
            if(boat[i + 1] - boat[i] != increment) return false
        } 
        return true
    } 

    /**
     * Check if a grid is valid or not
     * @param {Array} grid - The grid submitted by the player and that we have to check 
     * @returns {boolean} - A boolean according to the check
     */
    gridIsValid(grid) {
        grid = this.transformMatrixToArray(grid)
        if(grid.length != 100) return false
        let torpedo = new Array(0), cruiser = new Array(0), destroyer1 = new Array(0), destroyer2 = new Array(0), aircraft = new Array(0)
        for(let i = 0; i < 100; i++) {
            switch(grid[i]) {              
                case null: break

                case 'T':
                    torpedo.push(i)
                    break
                
                case 'D1':
                    destroyer1.push(i)
                    break

                case 'D2':
                    destroyer2.push(i)
                    break
                
                case 'C':
                    cruiser.push(i)
                    break
                
                case 'A':
                    aircraft.push(i)
                    break
                
                default: return false
            }
        }
        if(torpedo.length != 2 || cruiser.length != 4 || destroyer1.length != 3 || destroyer2.length != 3 || aircraft.length != 5) return false 

        return (this.checkShip(torpedo) && this.checkShip(cruiser) && this.checkShip(destroyer1) && this.checkShip(destroyer2) && this.checkShip(aircraft))
    }

    finishTheGame() {
        console.log("finishTheGame")
    }
}