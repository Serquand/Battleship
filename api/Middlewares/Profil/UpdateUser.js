import Players from "../../Models/Players.js";



const updateUser = async (req, res) => {
    console.log(req.body)
    let message = ''
    if(Object.keys(req.body).length == 1 && req.params.user === req.body.pseudo) return res.status(200).json({ information: "No change" })

    console.log(req.params.user !== req.body.pseudo)
    if(req.params.user !== req.body.pseudo) {
        const numberPseudo = await Players.count({ where: { Pseudo: req.body.pseudo } })
        console.log(numberPseudo)
    } 
}

export default updateUser;