import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
export default class WSHandlers {
    auth (userInformation) {
        if(!userInformation) return false
        try {
            const logged = !!(userInformation?.user == verify(userInformation.token, process.env.SALT_JWT).userId)
            return logged
        } catch { return false }
    }


};
