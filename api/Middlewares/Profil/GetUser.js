import Players from "../../Models/Players.js"
import Game from '../../Models/Game.js'
import { Op } from "sequelize"

const getPseudoFromId = async (id) => {
    return ((await Players.findOne({
        where: { id }, attributes: ["Pseudo"]
    })).dataValues.Pseudo)
}

const createDate = date => {
    const sDate = date.toString()
    const months = {
        Jan: '01', 
        Feb: '02', 
        Mar: '03',
        Apr: '04', 
        May: '05', 
        Jun: '06', 
        Jul: '07', 
        Aug: '08', 
        Sep: '09', 
        Oct: '10', 
        Nov: '11', 
        Dec: '12'
    }
    return sDate.split(" ")[2] + "/" + months[sDate.split(" ")[1]] + "/" + sDate.split(" ")[3]
}

const getUser = async (req, res) => {
    let userInformation = { allGames: new Array(0) };
    const userDb = (await Players.findOne({
        where: {
            Pseudo: req.params.user, 
        }, 
        attributes: ['Pseudo', "Email", "Elo", "MaxElo", "id"]
    })).dataValues

    const idUser = userDb.id;
    delete userDb.id
    userInformation.user = userDb

    const allGamesTemp = await Game.findAll({ 
        where: {
            [Op.or]: [
                { player1: idUser }, 
                { player2: idUser }
            ]
        }
    })

    for(let i = 0; i < allGamesTemp.length; i++) {
        const game = allGamesTemp[i].dataValues
        game.date = createDate(game.createdAt)

        delete game.createdAt
        delete game.updatedAt
        delete game.id

        game.result = game.result == idUser ? "W" : 'L'
        game.player1 = game.player1 == null ? 'Deleted user' : await getPseudoFromId(game.player1)
        game.player2 = game.player2 == null ? 'Deleted user' : await getPseudoFromId(game.player2) 
        userInformation.allGames.push(game)
    }  

    return res.status(200).json(userInformation)
}

export default getUser;