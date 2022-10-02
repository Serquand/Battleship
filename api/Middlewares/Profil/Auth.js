import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import * as dotenv from 'dotenv'
dotenv.config()

const auth = (req, res, next) => {
    const user = req.params.user
    try {
        const token = req.headers.authorization.split(" ")[1]
        const userId = verify(token, process.env.SALT_JWT).userId
        const logged = !!(user && user == userId)
        if(logged) next()
        else return res.status(401).json({ information: 'Unsuccessfully logged in !' })
    } catch {
        return res.status(400).json({ error: 'Invalid request !' })
    }
}

export default auth