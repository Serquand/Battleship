import * as dotenv  from 'dotenv'
dotenv.config()
import Players from '../../Models/Players.js';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import { hash, compare } from 'bcrypt';

export default function login(req, res) {
    if(req.body.mode.charAt(0) === 'C') return signIn(req, res)
    if(req.body.mode.charAt(0) === 'I') return signUp(req, res)
    return res.status(400).json({ error: 'Invalid request !' })
}

const emailValid = (email) => {
    var emailReg = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$", "g");
    return emailReg.test(email) ? true : false
}

const signIn = async (req, res, next) => {
    const user = { pseudo: req.body.username, password: req.body.pwd }
    const { rows } = await Players.findAndCountAll({ where: { Pseudo: user.pseudo} }) 
    if(rows.length == 0 || (!(await compare(user.password, rows[0].dataValues.Password))))
        return res.status(401).send({ error: "Wrong pseudo or password" })

    return res.status(200).json({ 
            userId: user.pseudo, 
            token: sign({ userId: user.pseudo }, process.env.SALT_JWT, { expiresIn: '24h' }), 
            information: "Succesfullly connected !"  
        })
}

const signUp = async (req, res, next) => {
    let email = req.body.email, username = req.body.username, password = req.body.pwd
    if(!emailValid(email)) return res.status(401).send({ message: "Unvalid email." })

    const numberEmail = await Players.count({ where: { Email: email } })
    const numberPseudo = await Players.count({ where: { Pseudo: username } })

    if(numberEmail && numberPseudo) return res.status(401).json({ error: "Pseudo et email already used." })
    if(numberEmail) return res.status(401).json({ error: "Email already used." })
    if(numberPseudo) return res.status(401).json({ error: "Pseudo already used." })

    const myHashPwd = await hash(password, 10)
    await Players.create({ Pseudo: username, Email: email, Password: myHashPwd })
    return res.status(201).json({ 
        userId: username, 
        token: sign({ userId: username }, process.env.SALT_JWT), 
        information: "Successfully signed up !"  
    })
}