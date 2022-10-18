import Players from "../../Models/Players.js";
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const emailValid = (email) => {
    var emailReg = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$", "g");
    return emailReg.test(email) ? true : false
}

const updateUser = async (req, res) => {
    let message = ''

    const user = (await Players.findOne({ 
        where: { Pseudo: req.params.user }, 
        attributes: ["Email"]
    })).dataValues
    
    if(user.Email != req.body.email && !emailValid(req.body.email)) return res.status(401).json({ information: "Unvalid email ! Nothing was changed !" })

    if(req.params.user !== req.body.pseudo) {
        if(await Players.count({ where: { Pseudo: req.body.pseudo } })) message  += "Username already taken. "
    } 

    if(user.Email != req.body.email) {
        if(await Players.count({ where: { Email: req.body.email } })) message  += "Email already taken. "
    }

    if(message !== '') return res.status(400).json({ information: message + "Nothing was changed" });

    const update = { Email: req.body.email, Pseudo: req.body.pseudo }
    if(req.body.password != "") update.Password = await hash(req.body.password, 10)
    await Players.update(update, {  where: { Pseudo: req.params.user } })

    return res.status(200).json({ 
        email: req.body.email, 
        user: req.body.pseudo, 
        token: sign({ userId: req.body.pseudo }, process.env.SALT_JWT), 
        information: "The information has been successfully updated !" 
    });
}

export default updateUser;