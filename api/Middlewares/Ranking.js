import Players from "../Models/Players.js"

export default async (req, res) => {
    const players = await Players.findAll({
        attributes: ['Elo', 'maxElo', 'Pseudo'], 
        order: [
            ["Elo", "DESC"]
        ]
    })

    for(let i = 0; i < players.length; i++) players[i] = players[i].dataValues
    
    return res.status(200).json(players)
}