import Players from './Players.js'

export default async () => {
    await Players.sync()
}

