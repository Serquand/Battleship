import Players from './Players.js'
import Game from './Game.js'

export default async () => {
    await Players.sync()
    await Game.sync()
}

