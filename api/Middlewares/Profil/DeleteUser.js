import Players from "../../Models/Players.js"
import Games from "../../Models/Game.js"

export default async (req, res) => {
    try {
        const userId = (await Players.findOne({
            attributes: ['id'], 
            where: {
                Pseudo: req.params.user
            }
        })).dataValues.id
    
        await Games.update( 
            { player1: null }, 
            { where: { player1: userId } }
        )
    
        await Games.update(
            { player2: null }, 
            { where: { player2: userId } } 
        )
        
        await Players.destroy({
            where: { id: userId }
        })

        res.status(200).json({ information: 'Profil deleted successfully !' })
    } catch {
        res.status(400).json({ error: 'An error occured !' })
    }
}   